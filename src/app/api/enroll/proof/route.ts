import { NextResponse } from "next/server";
import { query, queryOne, isDbConfigured } from "@/lib/server/db";
import { verifyClaimToken } from "@/lib/server/claim";
import { storePrivateFile } from "@/lib/server/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** UPI payers upload a screenshot; the team verifies it in the admin panel. */
export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Not available." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Could not read the upload." }, { status: 400 });

  const enrollmentId = Number(form.get("enrollmentId"));
  const claimToken = String(form.get("claimToken") ?? "");
  const file = form.get("screenshot");
  const utr = String(form.get("utr") ?? "").trim();

  if (!enrollmentId || !(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Attach the payment screenshot." }, { status: 400 });
  }

  const enrollment = await queryOne<{ id: number; reference: string }>`
    SELECT id, reference FROM enrollments WHERE id = ${enrollmentId}
  `;
  if (!enrollment || !verifyClaimToken(enrollment.id, enrollment.reference, claimToken)) {
    return NextResponse.json({ error: "This upload could not be matched." }, { status: 403 });
  }

  let pathname: string;
  try {
    const stored = await storePrivateFile("payment-proof", file);
    pathname = stored.pathname;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not store the screenshot." },
      { status: 400 }
    );
  }

  await query`
    UPDATE enrollments SET
      payment_proof_path = ${pathname},
      payment_status = 'awaiting_verification',
      admin_notes = CASE WHEN ${utr || null}::text IS NULL THEN admin_notes
                         ELSE coalesce(admin_notes, '') || ' UPI reference: ' || ${utr} END
    WHERE id = ${enrollment.id}
  `;

  return NextResponse.json({ ok: true });
}
