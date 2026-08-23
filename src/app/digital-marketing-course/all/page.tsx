import type { Metadata } from "next";
import { pageTitle } from "@/lib/seo";
import Link from "next/link";
import { MapPin, Wifi, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import { getHaryanaLocations, getDelhiLocations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Digital Marketing Institute in Haryana & Delhi NCR") },
  description:
    "Digital marketing institute serving all Haryana & Delhi NCR — live Google Ads, SEO & Meta Ads training, 100% placement. Online & offline (Sonipat).",
  alternates: { canonical: "/digital-marketing-course/all" },
};

const allFaqs = [
  { q: "Which cities does the digital marketing institute cover in Haryana?", a: "Digital Magician serves students across all 22 Haryana districts — Sonipat, Panipat, Karnal, Rohtak, Hisar, Ambala, Faridabad, Gurugram and more — plus every Delhi NCR zone. Offline classes run at our Sonipat campus; the live online batch reaches the entire region." },
  { q: "Can I do the digital marketing course online from anywhere in Haryana?", a: "Yes. Our live online batch is a real-time class — you see the trainer's screen, ask questions live, work on real campaigns, and get 12-month recording access. Students from across Haryana and Delhi NCR learn entirely online with the same outcomes as offline." },
  { q: "Is the online batch the same as the offline Sonipat classes?", a: "Identical curriculum, same expert trainers, same real client-campaign access, and the same 100% placement guarantee. The only difference is whether you attend at the Sonipat campus or join the live online session." },
  { q: "Do you offer placement support across Haryana and Delhi NCR?", a: "Yes. Our placement network covers Sonipat, Delhi, Gurugram, Noida, and Faridabad, plus remote roles. 80% of graduates are placed within 30 days, backed by a written 100% placement guarantee or full refund." },
  { q: "Is the course fee the same across all locations?", a: "Yes — the fee is identical whether you attend online or offline, from any city. The Full Stack program is ₹45,000 (reduced from ₹60,000) with EMI options; specialisation courses start from ₹10,000." },
];

export default function AllLocationsPage() {
  const haryanaLocations = getHaryanaLocations();
  const delhiLocations = getDelhiLocations();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[400px] h-[400px] -top-10 -right-10 opacity-25 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Haryana & Delhi NCR</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Digital Marketing Institute in Haryana<br />
            <em className="not-italic text-gradient-amber">Wherever You Are in North India</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/60 text-lg max-w-2xl mx-auto font-body">
            Our Sonipat campus serves students in person. Our live online batch serves the entire region.
            Same curriculum. Same expert trainers. Same placement guarantee. Your location is not a barrier.
          </p>
        </div>
      </section>

      {/* Haryana */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="tag">Haryana — All 22 Districts</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {haryanaLocations.map((loc, i) => (
              <AnimateOnScroll key={loc.slug} delay={(i % 4) * 60}>
                <Link href={`/digital-marketing-course/${loc.slug}`} className="group bento p-5 flex flex-col gap-3 hover:border-amber-brand/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-heading font-bold text-white group-hover:text-amber-brand transition-colors">{loc.name}</div>
                      <div className="text-white/60 text-xs font-body mt-0.5">{loc.distanceFromSonipat} from Sonipat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-amber-brand group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {loc.mode !== "far" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-white/5 text-white/60">
                        <MapPin className="w-2.5 h-2.5" /> Offline
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-brand/10 text-amber-brand/70">
                      <Wifi className="w-2.5 h-2.5" /> Online
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Delhi NCR */}
      <section className="py-16 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="tag">Delhi NCR</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {delhiLocations.map((loc, i) => (
              <AnimateOnScroll key={loc.slug} delay={(i % 4) * 60}>
                <Link href={`/digital-marketing-course/${loc.slug}`} className="group bento p-5 flex flex-col gap-3 hover:border-amber-brand/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-heading font-bold text-white group-hover:text-amber-brand transition-colors">{loc.name}</div>
                      <div className="text-white/60 text-xs font-body mt-0.5">{loc.distanceFromSonipat} from Sonipat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-amber-brand group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-white/5 text-white/60">
                      <MapPin className="w-2.5 h-2.5" /> Offline reachable
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-brand/10 text-amber-brand/70">
                      <Wifi className="w-2.5 h-2.5" /> Online
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Haryana + FAQ (unique content) */}
      <section className="py-20 bg-[#07051a] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-6 text-center">
              Why Learn Digital Marketing in Haryana?
            </h2>
            <div className="space-y-4 text-white/65 text-base font-body leading-relaxed">
              <p>
                Haryana sits on the edge of Delhi NCR — India&apos;s largest digital marketing job market — yet
                trained digital marketers from Haryana are genuinely rare. From the Kundli–Manesar–Palwal
                industrial corridor to Gurugram&apos;s agencies and the textile and agro businesses of Panipat,
                Karnal and Rohtak, employers across the state are hiring digital marketers faster than local
                talent can be trained. That gap is the opportunity for Haryana students.
              </p>
              <p>
                As the leading <Link href="/digital-marketing-course/sonipat" className="text-amber-brand hover:underline">digital marketing institute in Sonipat</Link>,
                Digital Magician trains students from every Haryana district either in person at our Sonipat
                campus or through a fully live online batch. You learn Google Ads, Meta Ads, SEO, and AI tools
                on real client campaigns — not theory — and graduate with a portfolio and a 100% placement
                guarantee. Your pin code never caps your salary: graduates work locally, commute to Delhi NCR,
                or work remotely for companies across India.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-12">
            <h3 className="font-heading font-bold text-white text-xl mb-5 text-center">
              Haryana &amp; Delhi NCR — Common Questions
            </h3>
            <div className="space-y-3">
              {allFaqs.map((faq, i) => (
                <details key={i} className="group bento p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-heading font-semibold text-white text-sm">{faq.q}</span>
                    <svg className="w-4 h-4 text-amber-brand flex-shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-white/55 text-sm font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10">
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                Don&apos;t See Your City?<br />
                <span className="text-gradient-amber">We Still Cover You.</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-lg mx-auto">
                Our live online batch is open to students anywhere in India. Same expert trainers, same campaigns,
                same 100% placement guarantee — from wherever you are.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20know%20about%20the%20online%20batch%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Ask About Your City
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/programs" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                  View All Programs
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
