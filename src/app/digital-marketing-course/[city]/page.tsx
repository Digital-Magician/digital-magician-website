import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, MapPin, Wifi, Clock, Shield,
  TrendingUp, Users, Star, AlertCircle, Train
} from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CountUp from "@/components/shared/CountUp";
import NextBatchDate from "@/components/shared/NextBatchDate";
import { getLocationBySlug, getAllLocationSlugs, locations } from "@/lib/data/locations";
import { programs } from "@/lib/data/programs";
import { serviceCourses, SERVICE_CITY_SLUGS } from "@/lib/data/services";

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: "Not Found" };

  return {
    title: location.metaTitle,
    description: location.metaDesc,
    alternates: {
      canonical: `https://digitalmagician.in/digital-marketing-course/${location.slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDesc,
      images: ["/og-image.png"],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const isHome = location.mode === "home";
  const isNearby = location.mode === "nearby";
  const isFar = location.mode === "far";
  const isDelhiNCR = location.region === "Delhi NCR";

  const featuredPrograms = programs.slice(0, 3);
  const hasServicePages = SERVICE_CITY_SLUGS.includes(location.slug);

  // FAQs shared across every city page (rendered + used for FAQPage schema)
  const sharedFaqs = [
    { q: "What is the fee for the Full Stack Digital Marketing course?", a: "₹45,000 for the 4-month Full Stack program — a limited-time offer reduced from ₹60,000. Specialisation courses start from ₹10,000. The fee is identical for online and offline modes. EMI options (2–3 months) are available — ask on WhatsApp." },
    { q: "What certifications will I earn?", a: "10+ industry certifications including Google Ads Search, Google Analytics 4, Meta Blueprint, and more — all issued by Google and Meta directly. Plus your Digital Magician completion certificate." },
    { q: "Is there really a 100% placement guarantee?", a: "Yes — it's a written commitment with a legal refund policy. Complete all modules, submit assignments, build your portfolio, and apply to 30+ jobs within 4 months. If you're still not placed, you get a full refund. We've processed only 2 refunds in 5 years." },
  ];

  // JSON-LD schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Digital Magician",
    description: location.metaDesc,
    url: `https://digitalmagician.in/digital-marketing-course/${location.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sonipat",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: location.name,
    offers: {
      "@type": "Offer",
      name: "Full Stack Digital Marketing Program",
      price: "45000",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "115",
      bestRating: "5",
    },
  };

  // FAQPage schema — city-specific + shared FAQs (enables FAQ rich results)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...location.faqs, ...sharedFaqs].map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalmagician.in" },
      { "@type": "ListItem", position: 2, name: "Digital Marketing Courses", item: "https://digitalmagician.in/digital-marketing-course/all" },
      { "@type": "ListItem", position: 3, name: `Digital Marketing Course in ${location.name}`, item: `https://digitalmagician.in/digital-marketing-course/${location.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[600px] h-[600px] -top-20 -left-20 opacity-28 z-[2]" />
        <div className="orb orb-indigo w-[450px] h-[450px] top-1/4 -right-20 opacity-35 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Location badge */}
            <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
              <MapPin className="w-3.5 h-3.5 text-amber-brand" />
              <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">
                {location.eyebrowText}
              </span>
            </div>

            <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              {location.heroHeadline}
            </h1>

            <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body mb-10">
              {location.heroSubheadline}
            </p>

            {/* Mode pills */}
            <div className="hero-item hero-item-4 flex flex-wrap items-center justify-center gap-3 mb-10">
              {!isHome && (
                <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                  <Train className="w-3.5 h-3.5 text-amber-brand" />
                  <span className="text-white/60 text-xs font-body">
                    {location.distanceFromSonipat} · {location.travelTime} from {location.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 glass-amber rounded-full px-4 py-2">
                <Wifi className="w-3 h-3 text-amber-brand" />
                <span className="text-amber-brand text-xs font-heading font-bold">
                  {isFar ? "Online Live Batch Available" : "Online & Offline Available"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 glass rounded-full px-4 py-2">
                <Shield className="w-3 h-3 text-amber-brand" />
                <span className="text-white/60 text-xs font-body">100% Placement Guarantee</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-item hero-item-5 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%27m%20from%20${encodeURIComponent(location.name)}%20and%20want%20to%20know%20about%20the%20digital%20marketing%20course%20at%20Digital%20Magician.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
              >
                Talk to Digital Magician — Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/free-demo"
                className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center"
              >
                Watch Free Demo First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="py-12 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { end: 500, suffix: "+", label: "Students Placed" },
              { end: 80, suffix: "%", label: "Placed in 30 Days" },
              { end: 10, suffix: "+", label: "Certifications Earned" },
              { end: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 80}>
                <div>
                  <div className="stat-number text-4xl sm:text-5xl mb-1">
                    <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-white/45 text-xs font-body">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local context ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimateOnScroll type="reveal-left">
              <div>
                <span className="tag mb-4 inline-block">
                  Digital Marketing in {location.name}
                </span>
                <h2 className="heading-lg text-4xl sm:text-5xl text-white mb-6 mt-4">
                  {location.localContext.heading}
                </h2>
                <p className="text-white/65 font-body leading-relaxed text-base mb-6">
                  {location.localContext.body}
                </p>
                <div className="flex items-start gap-3 glass rounded-2xl p-4">
                  <AlertCircle className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <p className="text-white/55 text-sm font-body leading-relaxed">
                    <strong className="text-white">The gap:</strong> {location.problemStatement}
                  </p>
                </div>
                <div className="flex items-start gap-3 glass-amber rounded-2xl p-4 mt-3">
                  <TrendingUp className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm font-body leading-relaxed">
                    <strong className="text-amber-brand">The opportunity:</strong> {location.opportunity}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll type="reveal-right">
              <div className="gradient-border rounded-3xl p-7 bg-carbon/40">
                <h3 className="font-heading font-bold text-white text-lg mb-5">
                  Roles You Can Land From {location.name}
                </h3>
                <div className="space-y-3 mb-6">
                  {location.jobMarket.topRoles.map((role) => (
                    <div key={role} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0" />
                      <span className="text-white/70 text-sm font-body">{role}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-5 border-t border-white/[0.06]">
                  <p className="text-white/50 text-sm font-body leading-relaxed">
                    {location.jobMarket.insight}
                  </p>
                  <Link
                    href="/salary-guide"
                    className="inline-flex items-center gap-1.5 text-amber-brand text-sm font-heading font-semibold mt-4 hover:gap-2.5 transition-all"
                  >
                    See the digital marketing salary guide for Haryana &amp; Delhi NCR
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Online vs Offline ─────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Your Learning Mode</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Online or Offline?<br />
              <span className="text-gradient-amber">Same Curriculum. Same Fees. Same Guarantee.</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Online */}
            <AnimateOnScroll>
              <div className={`bento p-7 h-full ${isFar ? "border-amber-brand/30 bg-amber-brand/[0.03]" : ""}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center text-amber-brand">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white">Online Live Batch</div>
                    {isFar && <div className="text-amber-brand text-xs font-body">Recommended for {location.name}</div>}
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    "Same live trainers — no pre-recorded videos",
                    "See real client campaigns on screen in real time",
                    "Ask questions, get answers live",
                    "All sessions recorded for 12-month replay",
                    "Join from anywhere in India",
                    "Same fees as offline mode",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-white/65 text-sm font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0 mt-1.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="text-white/35 text-xs font-body">
                  Schedule: Mon / Wed / Fri · 7:00 PM – 9:00 PM IST
                </div>
              </div>
            </AnimateOnScroll>

            {/* Offline */}
            <AnimateOnScroll delay={100}>
              <div className="bento p-7 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white">Offline Campus Classes</div>
                    {!isHome && (
                      <div className="text-white/40 text-xs font-body">
                        {location.distanceFromSonipat} · {location.travelTime}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    "In-person classes at our Sonipat campus",
                    "Face-to-face sessions on live client accounts",
                    isHome ? "Walk-in on any class day" : `${location.travelInfo}`,
                    "Full campus community access",
                    "Workshops, portfolio reviews, mock interviews",
                    "Same fees as online mode",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-white/65 text-sm font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0 mt-1.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="text-white/35 text-xs font-body">
                  Schedule: Mon / Wed / Fri · 7:00 PM – 9:00 PM
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick comparison table (AI/answer-engine friendly) */}
          <AnimateOnScroll className="mt-8">
            <div className="bento p-0 overflow-x-auto">
              <table className="w-full text-sm font-body border-collapse">
                <caption className="sr-only">Online vs offline digital marketing course in {location.name} — comparison</caption>
                <thead>
                  <tr className="text-left text-white/50 border-b border-white/[0.08]">
                    <th className="p-4 font-heading font-semibold">Feature</th>
                    <th className="p-4 font-heading font-semibold text-amber-brand">Online Live Batch</th>
                    <th className="p-4 font-heading font-semibold">Offline Campus</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  {[
                    ["Curriculum", "Identical", "Identical"],
                    ["Trainers", "Same live trainers", "Same live trainers"],
                    ["Real client campaigns", "Yes — shared on screen live", "Yes — in person"],
                    ["Fees", `₹45,000 (Full Stack)`, `₹45,000 (Full Stack)`],
                    ["Class recordings", "12-month replay access", "12-month replay access"],
                    ["Location", "Anywhere in India", `Sonipat campus (${location.distanceFromSonipat} from ${location.name})`],
                    ["Placement guarantee", "100% — same terms", "100% — same terms"],
                    ["Best for", isFar ? `${location.name} students (recommended)` : "Students who can't commute daily", "Students near Sonipat"],
                  ].map(([f, on, off]) => (
                    <tr key={f} className="border-b border-white/[0.05]">
                      <td className="p-4 font-medium text-white/85">{f}</td>
                      <td className="p-4">{on}</td>
                      <td className="p-4">{off}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>

          {/* PG accommodation note */}
          {location.pgNote && (
            <AnimateOnScroll className="mt-6">
              <div className="flex items-start gap-4 glass-amber rounded-2xl p-5">
                <div className="text-2xl">🏠</div>
                <div>
                  <div className="font-heading font-bold text-amber-brand mb-1">PG Accommodation Available</div>
                  <p className="text-white/65 text-sm font-body leading-relaxed">{location.pgNote}</p>
                </div>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* ── Programs ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Programs</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              What You&apos;ll Learn
            </h2>
            <p className="text-white/50 font-body mt-4 max-w-xl mx-auto">
              All programs are available in both online and offline mode at the same fee.
            </p>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredPrograms.map((program, i) => (
              <AnimateOnScroll key={program.slug} delay={i * 80}>
                <div className="bento p-6 h-full flex flex-col">
                  <div className="text-3xl mb-4">{program.icon}</div>
                  <h3 className="font-heading font-bold text-white mb-2">{program.name}</h3>
                  <p className="text-white/50 text-xs font-body mb-4 leading-relaxed flex-1">{program.tagline}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-brand font-heading font-bold">{program.fee}</span>
                    <span className="text-white/35 text-xs font-body">{program.duration}</span>
                  </div>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="btn-ghost text-sm px-4 py-2.5 gap-2 justify-center group"
                  >
                    View the {program.shortName} curriculum
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll className="text-center mt-8">
            <Link href="/programs" className="btn-primary px-7 py-3 text-sm gap-2 group inline-flex">
              See All 6 Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Specialisation courses (service landing pages) ────────── */}
      {hasServicePages && (
        <section className="py-20 bg-midnight border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-12">
              <span className="tag mb-4">Specialisation Courses in {location.name}</span>
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
                Prefer to Master One Skill First?
              </h2>
              <p className="text-white/50 font-body mt-4 max-w-xl mx-auto">
                Go deep on a single specialisation with a dedicated course in {location.name} — or get everything in the Full Stack program.
              </p>
            </AnimateOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceCourses.map((s, i) => (
                <AnimateOnScroll key={s.key} delay={i * 60}>
                  <Link
                    href={`/${s.slug}/${location.slug}`}
                    className="bento p-6 group hover:border-amber-brand/30 transition-colors h-full flex flex-col"
                  >
                    <span className="text-3xl mb-3">{s.icon}</span>
                    <h3 className="font-heading font-bold text-white group-hover:text-amber-brand transition-colors">
                      {s.name} in {location.name}
                    </h3>
                    <p className="text-white/50 text-xs font-body mt-2 mb-4 leading-relaxed flex-1">{s.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-brand font-heading font-bold text-sm">₹{s.fee.toLocaleString("en-IN")}</span>
                      <span className="text-amber-brand text-xs font-heading font-bold inline-flex items-center gap-1">
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Alumni story ──────────────────────────────────────────── */}
      {location.studentStory && (
        <section className="py-24 bg-midnight">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="gradient-border rounded-3xl p-8 sm:p-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-brand fill-amber-brand" />
                  ))}
                </div>
                <blockquote className="text-white/80 text-lg font-body leading-relaxed italic mb-8">
                  &ldquo;{location.studentStory.quote}&rdquo;
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-white">{location.studentStory.name}</div>
                    <div className="text-amber-brand text-sm font-body">{location.studentStory.after}</div>
                    <div className="text-white/35 text-xs font-body mt-0.5">From {location.studentStory.from}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="glass rounded-xl px-4 py-2 text-center">
                      <div className="text-white/35 text-[10px] font-heading font-bold uppercase tracking-widest">Before</div>
                      <div className="text-white/60 text-xs font-body mt-0.5">{location.studentStory.before}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-brand flex-shrink-0" />
                    <div className="glass-amber rounded-xl px-4 py-2 text-center">
                      <div className="text-amber-brand/60 text-[10px] font-heading font-bold uppercase tracking-widest">After</div>
                      <div className="text-white text-xs font-body font-semibold mt-0.5">{location.studentStory.after.split(",")[0]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <span className="tag mb-4">Common Questions</span>
            <h2 className="heading-lg text-4xl text-white mt-4">
              From {location.name} Students
            </h2>
          </AnimateOnScroll>
          <div className="space-y-4">
            {/* City-specific FAQs */}
            {location.faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 60}>
                <details className="group bento p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-heading font-semibold text-white text-sm">{faq.q}</span>
                    <svg className="w-4 h-4 text-amber-brand flex-shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-white/55 text-sm font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
            {/* Shared FAQs */}
            {sharedFaqs.map((faq, i) => (
              <AnimateOnScroll key={`shared-${i}`} delay={(location.faqs.length + i) * 60}>
                <details className="group bento p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-heading font-semibold text-white text-sm">{faq.q}</span>
                    <svg className="w-4 h-4 text-amber-brand flex-shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-white/55 text-sm font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🚀</div>
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                {isDelhiNCR
                  ? `Ready to Outperform Every Delhi Institute?`
                  : `Your Digital Marketing Career Starts Here`}
                <br />
                <span className="text-gradient-amber">Get Started Today.</span>
              </h2>
              <p className="text-white/60 font-body mb-4 max-w-xl mx-auto">
                Next batch starts <strong className="text-white"><NextBatchDate /></strong> — only 4 seats remaining.
              </p>
              <p className="text-white/40 text-sm font-body mb-8">
                {isFar
                  ? `Online batch available for ${location.name} students — same training, same results, zero commute.`
                  : `Both online and offline seats available for ${location.name} students.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%27m%20from%20${encodeURIComponent(location.name)}%20and%20want%20to%20enroll%20at%20Digital%20Magician.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Reserve Your Seat Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/batch-schedule" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                  View All Batch Dates
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Location index (internal linking) ────────────────────── */}
      <section className="py-16 bg-[#07051a] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/25 text-xs font-heading font-bold tracking-[0.2em] uppercase mb-6">
            Digital Marketing Course Available Across North India
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {locations
              .filter((l) => l.slug !== location.slug)
              .slice(0, 20)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/digital-marketing-course/${loc.slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.06] text-white/35 text-xs font-body hover:border-amber-brand/30 hover:text-amber-brand transition-all"
                >
                  {loc.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
