import Link from "next/link";
import { query } from "@/lib/server/db";
import { formatInr } from "@/lib/enrollment";

export const dynamic = "force-dynamic";

interface Counts {
  new_enrollments: number;
  awaiting_payment_check: number;
  students: number;
  certificates: number;
  collected_paise: number;
}

export default async function AdminHome() {
  const [counts] = await query<Counts>`
    SELECT
      (SELECT count(*) FROM enrollments WHERE status = 'new')::int AS new_enrollments,
      (SELECT count(*) FROM enrollments WHERE payment_status = 'awaiting_verification')::int AS awaiting_payment_check,
      (SELECT count(*) FROM users WHERE role = 'student' AND is_active)::int AS students,
      (SELECT count(*) FROM certificates WHERE status = 'valid')::int AS certificates,
      (SELECT coalesce(sum(amount_paid_paise), 0) FROM enrollments)::bigint AS collected_paise
  `;

  const recent = await query<{
    id: number;
    reference: string;
    student_name: string;
    program_name: string;
    payment_status: string;
    status: string;
    created_at: string;
  }>`
    SELECT id, reference, student_name, program_name, payment_status, status, created_at
    FROM enrollments ORDER BY created_at DESC LIMIT 8
  `;

  const cards = [
    { label: "New enrollments", value: counts?.new_enrollments ?? 0, href: "/admin/enrollments" },
    { label: "Payments to check", value: counts?.awaiting_payment_check ?? 0, href: "/admin/enrollments" },
    { label: "Active students", value: counts?.students ?? 0, href: "/admin/students" },
    { label: "Certificates issued", value: counts?.certificates ?? 0, href: "/admin/certificates" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bento p-5 hover:border-amber-brand/30 transition-colors">
            <div className="stat-number text-3xl mb-1">{card.value}</div>
            <div className="text-white/50 font-body text-xs">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="bento p-5">
        <div className="text-white/50 font-body text-xs mb-1">Total recorded as paid</div>
        <div className="stat-number text-3xl">{formatInr(Number(counts?.collected_paise ?? 0))}</div>
        <p className="text-white/35 font-body text-xs mt-2">
          Includes Razorpay payments and UPI or cash payments your team has marked as received.
        </p>
      </div>

      <div>
        <h2 className="font-heading font-bold text-white mb-4">Latest enrollments</h2>
        <div className="bento overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left p-4">Reference</th>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Course</th>
                <th className="text-left p-4">Payment</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-white/40">No enrollments yet.</td></tr>
              )}
              {recent.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.04] last:border-0">
                  <td className="p-4 text-amber-brand font-heading font-semibold">{row.reference}</td>
                  <td className="p-4 text-white/80">{row.student_name}</td>
                  <td className="p-4 text-white/55">{row.program_name}</td>
                  <td className="p-4 text-white/55">{row.payment_status.replace(/_/g, " ")}</td>
                  <td className="p-4 text-white/55">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/admin/enrollments" className="inline-block mt-4 text-amber-brand font-heading font-semibold text-sm hover:underline">
          See all enrollments
        </Link>
      </div>
    </div>
  );
}
