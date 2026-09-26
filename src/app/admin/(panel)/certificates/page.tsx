import { query } from "@/lib/server/db";
import { issueCertificate, setCertificateStatus } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface CertificateRow {
  id: number;
  certificate_number: string;
  student_name: string;
  program_name: string;
  issued_on: string;
  grade: string | null;
  status: "valid" | "revoked";
}

/** Dates are stored without a time, so they are formatted without timezone maths. */
function formatIssueDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}

const field =
  "w-full rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-white font-body text-sm placeholder:text-white/30 focus:border-amber-brand/50 focus:outline-none";

export default async function CertificatesPage() {
  const certificates = await query<CertificateRow>`
    SELECT id, certificate_number, student_name, program_name,
           to_char(issued_on, 'YYYY-MM-DD') AS issued_on, grade, status
    FROM certificates ORDER BY created_at DESC LIMIT 200
  `;

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <form action={issueCertificate} className="bento p-5 space-y-3">
        <h2 className="font-heading font-bold text-white text-sm">Issue a certificate</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="number" required placeholder="Certificate number, e.g. DM-2026-00184" className={field} />
          <input name="studentName" required placeholder="Student name as printed" className={field} />
          <input name="programName" required placeholder="Programme name" className={field} />
          <input name="issuedOn" type="date" required defaultValue={today} className={field} />
          <input name="grade" placeholder="Grade or score (optional)" className={field} />
        </div>
        <p className="text-white/35 font-body text-xs">
          Anyone can check this number at /verify-certificate. Only the name, programme, date and grade are shown.
        </p>
        <button type="submit" className="btn-primary w-full py-2.5 text-sm">Save certificate</button>
      </form>

      <div className="bento overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-white/[0.08] text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left p-4">Number</th>
              <th className="text-left p-4">Student</th>
              <th className="text-left p-4">Programme</th>
              <th className="text-left p-4">Issued</th>
              <th className="text-left p-4">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-white/40">No certificates yet.</td></tr>
            )}
            {certificates.map((certificate) => (
              <tr key={certificate.id} className="border-b border-white/[0.04] last:border-0">
                <td className="p-4 text-amber-brand font-heading font-semibold">{certificate.certificate_number}</td>
                <td className="p-4 text-white/80">{certificate.student_name}</td>
                <td className="p-4 text-white/55">{certificate.program_name}</td>
                <td className="p-4 text-white/55">{formatIssueDate(certificate.issued_on)}</td>
                <td className="p-4">
                  <span className={certificate.status === "valid" ? "text-emerald-300" : "text-red-300"}>
                    {certificate.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <form action={setCertificateStatus}>
                    <input type="hidden" name="id" value={certificate.id} />
                    <input type="hidden" name="status" value={certificate.status === "valid" ? "revoked" : "valid"} />
                    <button type="submit"
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-white/60 font-heading font-semibold text-xs hover:border-amber-brand/40 hover:text-amber-brand transition-colors whitespace-nowrap">
                      {certificate.status === "valid" ? "Withdraw" : "Restore"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
