import { NextResponse } from "next/server";
import { queryOne, isDbConfigured } from "@/lib/server/db";
import { rateLimit, clientIp } from "@/lib/server/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CertificateRow {
  certificate_number: string;
  student_name: string;
  program_name: string;
  issued_on: string;
  grade: string | null;
  status: "valid" | "revoked";
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Verification is temporarily unavailable." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { number?: string } | null;
  const number = (body?.number ?? "").trim();

  if (number.length < 4 || number.length > 60) {
    return NextResponse.json({ error: "Enter the certificate number printed on the certificate." }, { status: 400 });
  }

  // Certificate numbers are guessable, so lookups are rate limited per address.
  const limit = await rateLimit(`certverify:${clientIp(request.headers)}`, 20, 10 * 60);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many checks from this device. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const certificate = await queryOne<CertificateRow>`
    SELECT certificate_number, student_name, program_name,
           to_char(issued_on, 'YYYY-MM-DD') AS issued_on, grade, status
    FROM certificates
    WHERE upper(certificate_number) = upper(${number})
  `;

  if (!certificate) {
    return NextResponse.json({ result: "not_found" });
  }

  return NextResponse.json({
    result: certificate.status,
    certificate: {
      number: certificate.certificate_number,
      studentName: certificate.student_name,
      programName: certificate.program_name,
      issuedOn: certificate.issued_on,
      grade: certificate.grade,
    },
  });
}
