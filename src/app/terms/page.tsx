import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Digital Magician's terms and conditions for course enrolment, usage, and conduct.",
};

export default function TermsPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 bg-[#09071c]" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-bold text-amber-brand bg-amber-brand/10 border border-amber-brand/20 mb-4">Legal</span>
          <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-white/40 text-sm font-body">Last updated: April 17, 2026</p>
        </div>
        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65 font-body leading-relaxed">
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">1. Acceptance of Terms</h2>
            <p>By enrolling in any Digital Magician program or using our website, you agree to these Terms &amp; Conditions. If you do not agree, please do not enroll or use our services.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">2. Enrolment &amp; Fees</h2>
            <ul className="list-none space-y-2 pl-0">
              {[
                "A seat is confirmed only upon receipt of full payment or the agreed first EMI instalment.",
                "Course fees are non-transferable to a different program or student unless approved in writing by Digital Magician.",
                "EMI plans are available subject to approval. Missed EMI payments may result in suspension from the program until dues are cleared.",
                "Fees are subject to change for future batches. Once enrolled, your fee is locked at the agreed amount.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">3. Course Access &amp; Conduct</h2>
            <ul className="list-none space-y-2 pl-0">
              {[
                "Students receive 12-month access to all class recordings from the date of their batch start.",
                "Recording, reproducing, or sharing any course material outside the program is strictly prohibited.",
                "Students are expected to maintain respectful conduct in all classes and communication channels.",
                "Digital Magician reserves the right to remove a student from the program without refund in cases of misconduct or violation of these terms.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">4. Placement Guarantee</h2>
            <p className="mb-3">The 100% Placement Guarantee applies to eligible students who:</p>
            <ul className="list-none space-y-2 pl-0 mb-3">
              {[
                "Complete all course modules with a minimum 75% attendance.",
                "Submit all graded assignments on time.",
                "Complete their live campaign portfolio project.",
                "Apply to a minimum of 30 job positions within 4 months of course completion.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
            <p>Students who meet all conditions and are not placed within the guarantee period are entitled to a full course fee refund as described in our Refund Policy.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">5. Intellectual Property</h2>
            <p>All course materials, presentations, recordings, and curriculum content are the intellectual property of Digital Magician. Unauthorised distribution or commercial use is prohibited.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">6. Limitation of Liability</h2>
            <p>Digital Magician provides career support and placement assistance but cannot guarantee specific salary outcomes. Individual results depend on effort, market conditions, and personal factors beyond our control.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">7. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Sonipat, Haryana.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">8. Contact</h2>
            <p>For questions about these terms: hello@digitalmagician.in or +91 79882 27240.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
