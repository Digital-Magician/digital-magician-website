import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | Digital Magician — Placement Guarantee Explained",
  description:
    "Digital Magician's refund policy for course fees. Full refund if placement conditions are met but placement not achieved. Clear, no-trap policy.",
};

export default function RefundPolicyPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 bg-[#09071c]" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-bold text-amber-brand bg-amber-brand/10 border border-amber-brand/20 mb-4">Legal</span>
          <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-3">Refund Policy</h1>
          <p className="text-white/40 text-sm font-body">Last updated: April 17, 2026</p>
        </div>
        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65 font-body leading-relaxed">
          <div className="glass-amber rounded-2xl p-5">
            <p className="text-amber-brand font-heading font-bold mb-1">Plain-language summary</p>
            <p className="text-white/70 text-sm">If you complete the course, submit all work, build your portfolio, and apply to 30+ jobs within 4 months — and still aren&apos;t placed — we refund every rupee. For all other refund requests, a time-based policy applies. Full details below.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">1. Placement Guarantee Refund</h2>
            <p className="mb-3">Students who meet ALL of the following conditions are eligible for a full course fee refund:</p>
            <ul className="list-none space-y-2 pl-0 mb-3">
              {[
                "Attended 75% or more of all live classes (recorded catch-up counted toward attendance)",
                "Submitted all graded assignments before their respective deadlines",
                "Completed the live campaign portfolio project on a real client account",
                "Applied to a minimum of 30 job positions using our placement portal within 4 months of course completion",
                "Participated in at least 2 Digital Magician placement drives",
                "Submitted proof of job applications (screenshot/email confirmation) to the Digital Magician team",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
            <p>Refund requests under the placement guarantee must be submitted within 6 months of the course completion date. Refunds will be processed within 15 working days of verification.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">2. Standard Cancellation Refund</h2>
            <p className="mb-4">If you choose to withdraw from the course for reasons other than non-placement:</p>
            <div className="bento overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-4 text-white/40 text-xs font-heading font-bold tracking-widest uppercase">Cancellation Timing</th>
                    <th className="text-right p-4 text-white/40 text-xs font-heading font-bold tracking-widest uppercase">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { timing: "More than 7 days before batch start", refund: "100% refund" },
                    { timing: "3–7 days before batch start", refund: "75% refund" },
                    { timing: "Within 3 days of batch start", refund: "50% refund" },
                    { timing: "After first class, within 7 days", refund: "25% refund" },
                    { timing: "After 7 days from first class", refund: "No refund" },
                  ].map((row) => (
                    <tr key={row.timing} className="border-b border-white/[0.04] last:border-0">
                      <td className="p-4 text-white/65 font-body">{row.timing}</td>
                      <td className={`p-4 text-right font-heading font-bold ${row.refund === "No refund" ? "text-red-400" : "text-amber-brand"}`}>{row.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">3. Non-Refundable Situations</h2>
            <ul className="list-none space-y-2 pl-0">
              {[
                "Removal from the program due to misconduct or violation of Terms & Conditions",
                "Failure to meet the placement guarantee eligibility criteria",
                "Requests made after 6 months from course completion",
                "Partial module completion where a certificate was already issued",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">4. How to Request a Refund</h2>
            <p>Send an email to hello@digitalmagician.in with subject line &ldquo;Refund Request — [Your Name]&rdquo; or message us on WhatsApp at +91 79882 27240. Include your full name, batch details, and the reason for your request. We will acknowledge within 24 hours and resolve within 15 working days.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">5. Questions?</h2>
            <p>
              If you have any questions about this policy, reach us at hello@digitalmagician.in or{" "}
              <Link href="https://wa.me/917988227240?text=Hi!%20I%20have%20a%20question%20about%20the%20refund%20policy." target="_blank" rel="noopener noreferrer" className="text-amber-brand hover:underline">
                WhatsApp us
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
