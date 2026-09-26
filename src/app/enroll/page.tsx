import type { Metadata } from "next";
import { Lock, ShieldCheck } from "lucide-react";
import EnrollmentForm from "./EnrollmentForm";

export const metadata: Metadata = {
  title: { absolute: "Enrollment Form | Digital Magician" },
  description: "Private enrollment form for admitted Digital Magician students.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function EnrollPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-1.5 mb-5">
            <Lock className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-xs font-heading font-bold tracking-wide">
              Private enrollment link
            </span>
          </span>
          <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-4">
            Enrollment <span className="text-gradient-amber">Form</span>
          </h1>
          <p className="text-white/60 font-body">
            Takes about three minutes. Keep the student&apos;s Aadhaar card handy, and your UPI app
            if you are paying online.
          </p>
        </div>

        <EnrollmentForm />

        <p className="mt-8 flex items-center justify-center gap-2 text-white/35 font-body text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          Payments are processed by Razorpay or your own UPI app. We never see your card or bank details.
        </p>
      </div>
    </section>
  );
}
