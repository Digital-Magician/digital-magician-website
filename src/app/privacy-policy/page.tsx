import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Digital Magician's privacy policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 bg-[#09071c]" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-bold text-amber-brand bg-amber-brand/10 border border-amber-brand/20 mb-4">Legal</span>
          <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-3">Privacy Policy</h1>
          <p className="text-white/40 text-sm font-body">Last updated: April 17, 2026</p>
        </div>
        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65 font-body leading-relaxed">
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">1. Who We Are</h2>
            <p>Digital Magician (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a digital marketing training institute based in Sonipat, Haryana, India, operating at digitalmagician.in. We are owned and operated by Gaurav Malik.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">2. What Data We Collect</h2>
            <p className="mb-3">When you interact with our website or enquire about our programs, we may collect:</p>
            <ul className="list-none space-y-2 pl-0">
              {["Your name and contact information (phone, email) provided via enquiry forms or WhatsApp", "Usage data: pages visited, time on site, device/browser type (via cookies)", "Any information you voluntarily share during counselling calls or email conversations"].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">We use your information only to:</p>
            <ul className="list-none space-y-2 pl-0">
              {["Respond to your enquiries about our programs", "Send you information about batch dates, offers, and course updates (only if you opted in)", "Improve our website and course offerings", "Process enrolments and course payments"].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">4. Cookies</h2>
            <p>Our website uses standard cookies to understand how visitors use the site (e.g., Google Analytics). You can disable cookies in your browser settings at any time. Disabling cookies will not affect your ability to access the website.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">5. Data Retention</h2>
            <p>We retain your personal data only as long as necessary for the purposes outlined above, or as required by applicable law. Enquiry data is retained for a maximum of 2 years unless you are an active student.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">6. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, contact us at hello@digitalmagician.in or on WhatsApp at +91 79882 27240.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">7. Third-Party Services</h2>
            <p>We may use third-party tools like Google Analytics, Meta Pixel, and WhatsApp Business. These services have their own privacy policies. We recommend reviewing them.</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-3">8. Contact</h2>
            <p>For any privacy-related questions, contact: hello@digitalmagician.in or +91 79882 27240.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
