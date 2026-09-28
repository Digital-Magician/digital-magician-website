import { FileText, Image as ImageIcon } from "lucide-react";
import { query } from "@/lib/server/db";
import { ENROLLMENT_FEE_INR, formatInr } from "@/lib/enrollment";
import { markPaymentReceived, setEnrollmentStatus } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface EnrollmentRow {
  id: number;
  reference: string;
  student_name: string;
  father_name: string;
  guardian_phone: string;
  contact_number: string;
  whatsapp_number: string;
  email: string | null;
  address: string;
  program_name: string;
  course_fee_paise: number;
  payment_plan: string;
  amount_due_now_paise: number;
  amount_paid_paise: number;
  discount_paise: number;
  payment_method: string | null;
  balance_method: string | null;
  payment_status: string;
  aadhaar_path: string | null;
  payment_proof_path: string | null;
  razorpay_payment_id: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const statusTone: Record<string, string> = {
  paid: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  awaiting_verification: "text-amber-brand border-amber-brand/30 bg-amber-brand/10",
  pending: "text-white/60 border-white/15 bg-white/[0.04]",
  failed: "text-red-300 border-red-400/30 bg-red-400/10",
  cash_at_institute: "text-white/60 border-white/15 bg-white/[0.04]",
};

export default async function EnrollmentsPage() {
  const rows = await query<EnrollmentRow>`
    SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 100
  `;

  return (
    <div className="space-y-5">
      <p className="text-white/50 font-body text-sm">
        Newest first. Open the Aadhaar card or payment screenshot to check it, then mark the
        enrollment verified.
      </p>

      {rows.length === 0 && (
        <div className="bento p-8 text-center text-white/45 font-body text-sm">
          No enrollments yet. Share the form link at /enroll to get started.
        </div>
      )}

      {rows.map((row) => (
        <div key={row.id} className="bento p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-amber-brand font-heading font-bold">{row.reference}</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-heading font-semibold ${statusTone[row.payment_status] ?? statusTone.pending}`}>
                  {row.payment_status.replace(/_/g, " ")}
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-heading font-semibold text-white/60">
                  {row.status}
                </span>
              </div>
              <h2 className="text-white font-heading font-bold text-lg mt-2">{row.student_name}</h2>
              <p className="text-white/45 font-body text-xs">
                {new Date(row.created_at).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="text-right">
              <div className="text-white/45 font-body text-xs">Due now</div>
              <div className="text-white font-heading font-bold">{formatInr(row.amount_due_now_paise)}</div>
              <div className="text-white/35 font-body text-xs">
                paid {formatInr(row.amount_paid_paise)} of{" "}
                {formatInr(row.course_fee_paise - Number(row.discount_paise ?? 0))}
              </div>
              {Number(row.discount_paise ?? 0) > 0 && (
                <div className="text-amber-brand/80 font-body text-xs">
                  {formatInr(row.discount_paise)} instant payment discount
                </div>
              )}
              {row.payment_plan === "enrollment_only" && (
                <div className="text-white/35 font-body text-xs">
                  {formatInr(row.course_fee_paise - ENROLLMENT_FEE_INR * 100)} due on day one
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 font-body text-sm mb-4">
            <Detail label="Father" value={row.father_name} />
            <Detail label="Course" value={row.program_name} />
            <Detail label="Plan" value={row.payment_plan === "full" ? "Full fee" : "Enrollment fee only"} />
            <Detail label="Contact" value={row.contact_number} href={`tel:+91${row.contact_number}`} />
            <Detail label="WhatsApp" value={row.whatsapp_number} href={`https://wa.me/91${row.whatsapp_number}`} />
            <Detail label="Guardian" value={row.guardian_phone} href={`tel:+91${row.guardian_phone}`} />
            {row.email && <Detail label="Email" value={row.email} href={`mailto:${row.email}`} />}
            <Detail label="Paid via" value={row.payment_method ?? "not chosen"} />
            {row.payment_plan === "enrollment_only" && (
              <Detail label="Day-one balance by" value={row.balance_method ?? "not chosen"} />
            )}
            {row.razorpay_payment_id && <Detail label="Razorpay id" value={row.razorpay_payment_id} />}
          </div>

          <div className="text-white/55 font-body text-sm mb-4">
            <span className="text-white/35">Address: </span>{row.address}
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            {row.aadhaar_path && (
              <a href={`/api/admin/file?path=${encodeURIComponent(row.aadhaar_path)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-white/70 hover:border-amber-brand/40 hover:text-amber-brand font-heading font-semibold text-xs transition-colors">
                <FileText className="w-3.5 h-3.5" /> Aadhaar card
              </a>
            )}
            {row.payment_proof_path && (
              <a href={`/api/admin/file?path=${encodeURIComponent(row.payment_proof_path)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-white/70 hover:border-amber-brand/40 hover:text-amber-brand font-heading font-semibold text-xs transition-colors">
                <ImageIcon className="w-3.5 h-3.5" /> Payment screenshot
              </a>
            )}
          </div>

          {row.admin_notes && (
            <p className="text-white/45 font-body text-xs mb-4 italic">Note: {row.admin_notes}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
            {row.payment_status !== "paid" && (
              <form action={markPaymentReceived}>
                <input type="hidden" name="id" value={row.id} />
                <button type="submit" className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-emerald-300 font-heading font-semibold text-xs hover:bg-emerald-400/20 transition-colors">
                  Payment received
                </button>
              </form>
            )}
            <form action={setEnrollmentStatus} className="flex items-center gap-2">
              <input type="hidden" name="id" value={row.id} />
              <input type="hidden" name="status" value="verified" />
              <input name="note" placeholder="Note (optional)"
                className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-white/80 font-body text-xs w-44 focus:border-amber-brand/50 focus:outline-none" />
              <button type="submit" className="rounded-lg border border-amber-brand/40 bg-amber-brand/10 px-3.5 py-2 text-amber-brand font-heading font-semibold text-xs hover:bg-amber-brand/20 transition-colors">
                Mark verified
              </button>
            </form>
            <form action={setEnrollmentStatus}>
              <input type="hidden" name="id" value={row.id} />
              <input type="hidden" name="status" value="rejected" />
              <button type="submit" className="rounded-lg border border-white/15 px-3.5 py-2 text-white/50 font-heading font-semibold text-xs hover:border-red-400/40 hover:text-red-300 transition-colors">
                Reject
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <span className="text-white/35">{label}: </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-amber-brand transition-colors">
          {value}
        </a>
      ) : (
        <span className="text-white/80">{value}</span>
      )}
    </div>
  );
}
