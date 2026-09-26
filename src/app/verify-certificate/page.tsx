import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { pageTitle, metaDescription } from "@/lib/seo";
import VerifyForm from "./VerifyForm";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Verify a Digital Magician Certificate") },
  description: metaDescription(
    "Check whether a Digital Magician certificate is genuine. Enter the certificate number to see the student name, programme and issue date."
  ),
  alternates: { canonical: "/verify-certificate" },
};

const faqs = [
  {
    q: "Where do I find the certificate number?",
    a: "It is printed at the bottom of the certificate, in the format DM-YEAR-NUMBER. Enter it exactly as printed, including the dashes.",
  },
  {
    q: "What does a verified result prove?",
    a: "It confirms that Digital Magician issued that certificate to the named student for the named programme on the date shown. Only the institute can add records to this system.",
  },
  {
    q: "I am an employer. Can I confirm the details another way?",
    a: "Yes. Message +91 79882 27240 on WhatsApp or email hello@digitalmagician.in with the certificate number and we will confirm in writing.",
  },
];

export default function VerifyCertificatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-32 pb-16 bg-midnight">
        <div className="absolute inset-0 z-0 bg-hero-gradient opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-xs font-heading font-bold tracking-wide">
              Certificate check
            </span>
          </span>
          <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-4">
            Verify a <span className="text-gradient-amber">Certificate</span>
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto">
            Employers and students can confirm any certificate issued by Digital Magician. Enter the
            number printed on the certificate.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VerifyForm />
        </div>
      </section>

      <section className="py-20 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-lg text-3xl text-white mb-8 text-center">Common questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bento p-6">
                <h3 className="font-heading font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/45 font-body text-sm mt-10">
            Looking for the course instead?{" "}
            <Link href="/digital-marketing-course/sonipat" className="text-amber-brand hover:underline">
              See the digital marketing course in Sonipat
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
