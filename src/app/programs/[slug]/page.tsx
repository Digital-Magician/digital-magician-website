import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Clock, Award, Zap, CheckCircle,
  ChevronDown, Shield, Users, Star,
} from "lucide-react";
import { programs, getProgramBySlug } from "@/lib/data/programs";
import { testimonials } from "@/lib/data/testimonials";
import { serviceCourses } from "@/lib/data/services";
import FeeTag from "@/components/shared/FeeTag";
import { pageTitle, metaDescription } from "@/lib/seo";
import VideoTestimonials from "@/components/home/VideoTestimonials";

// ── Static params ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};

  return {
    title: { absolute: pageTitle(program.metaTitle ?? `${program.name} in Sonipat`) },
    description: metaDescription(
      `${program.shortName} digital marketing course in Sonipat: ${program.durationDetail ?? program.duration}. 100% placement guarantee, live campaigns. Fee ₹${program.fee.toLocaleString("en-IN")}, EMI available.`
    ),
    alternates: { canonical: `/programs/${slug}` },
    openGraph: {
      title: `${program.name} | Digital Magician`,
      description: program.description,
      url: `https://digitalmagician.in/programs/${slug}`,
      images: ["/og-image.png"],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const programTestimonials = testimonials
    .filter((t) => t.program.toLowerCase().includes(program.shortName.toLowerCase()))
    .slice(0, 3);

  // Matching location-specific landing page (boosts those pages via a
  // relevant link from this high-authority program page).
  const geoService = serviceCourses.find((s) => s.programSlug === program.slug);

  const whatsappMsg = encodeURIComponent(
    `Hi! I am interested in the ${program.name} at Digital Magician, Sonipat. Can you tell me more?`
  );

  const emiAmount = Math.ceil(program.fee / 3).toLocaleString("en-IN");

  // JSON-LD Course schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name,
    description: program.description,
    provider: {
      "@type": "Organization",
      name: "Digital Magician",
      url: "https://digitalmagician.in",
    },
    offers: {
      "@type": "Offer",
      price: program.fee,
      priceCurrency: "INR",
    },
    courseMode: "Blended",
    timeRequired: program.duration,
    educationalLevel: program.level,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "122",
      bestRating: "5",
    },
  };

  // FAQPage schema — enables FAQ rich results for each program
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: program.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalmagician.in" },
      { "@type": "ListItem", position: 2, name: "Programs", item: "https://digitalmagician.in/programs" },
      { "@type": "ListItem", position: 3, name: program.name, item: `https://digitalmagician.in/programs/${program.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen pt-24 pb-20">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              All Programs
            </Link>

            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* ── Left: Info ─────────────────────────────────────────── */}
              <div className="lg:col-span-2">
                {/* Emoji + badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="text-6xl">{program.icon}</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full">
                      {program.level}
                    </span>
                    <span className="text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 px-3 py-1.5 rounded-full">
                      {program.durationDetail ?? program.duration}
                    </span>
                    <span className="text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 px-3 py-1.5 rounded-full">
                      {program.certifications} Certifications
                    </span>
                  </div>
                </div>

                <h1 className="hero-item hero-item-1 font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                  {program.name}
                </h1>
                {program.slug === "full-stack-digital-marketing" && (
                  <h2 className="hero-item hero-item-1 text-amber-400 font-semibold text-lg md:text-xl mb-4">
                    Full Stack Digital Marketing Course in Sonipat — Online &amp; Offline
                  </h2>
                )}
                <p className="hero-item hero-item-2 text-slate-400 text-lg leading-relaxed mb-8">
                  {program.description}
                </p>

                {geoService ? (
                  <p className="hero-item hero-item-2 text-sm text-slate-400 mb-8 -mt-4">
                    📍 Based in Haryana?{" "}
                    <Link href={`/${geoService.slug}/sonipat`} className="text-amber-400 font-medium hover:underline">
                      {geoService.name} in Sonipat
                    </Link>{" "}
                    has the fees, batch dates, and local placement details.
                  </p>
                ) : (
                  <p className="hero-item hero-item-2 text-sm text-slate-400 mb-8 -mt-4">
                    📍 Based in Haryana? See the{" "}
                    <Link href="/digital-marketing-course/sonipat" className="text-amber-400 font-medium hover:underline">
                      digital marketing course in Sonipat
                    </Link>{" "}
                    for local fees, batches, and placement.
                  </p>
                )}

                {/* Outcomes */}
                <div className="hero-item hero-item-3 grid sm:grid-cols-2 gap-3 mb-8">
                  {program.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="hero-item hero-item-4 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/917988227240?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
                  >
                    Enroll Now — ₹{program.fee.toLocaleString("en-IN")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/free-demo"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                  >
                    Book Free Demo First
                  </Link>
                </div>
              </div>

              {/* ── Right: Sticky enrollment card ───────────────────────── */}
              <div className="lg:col-span-1">
                <div className="bento p-6 lg:sticky lg:top-28">
                  {/* Price */}
                  <div className="text-center mb-5 pb-5 border-b border-white/10">
                    <FeeTag
                      fee={program.fee}
                      originalFee={program.originalFee}
                      className="block font-black text-5xl text-amber-400 mb-1"
                    />
                    <div className="text-slate-500 text-sm">or ₹{emiAmount} × 3 easy EMIs</div>
                  </div>

                  {/* Details list */}
                  <div className="space-y-3 mb-6 text-sm">
                    {[
                      { icon: <Clock className="w-4 h-4 text-amber-400" />, text: program.durationDetail ?? program.duration },
                      { icon: <Award className="w-4 h-4 text-amber-400" />, text: `${program.certifications} Certifications` },
                      { icon: <Zap className="w-4 h-4 text-amber-400" />, text: program.level },
                      { icon: <Users className="w-4 h-4 text-amber-400" />, text: "Hybrid — Online + Offline" },
                      { icon: <Shield className="w-4 h-4 text-amber-400" />, text: "Placement Support Included" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-slate-400">
                        {icon} {text}
                      </div>
                    ))}
                  </div>

                  {/* Enroll button */}
                  <a
                    href={`https://wa.me/917988227240?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold w-full py-3.5 rounded-xl transition-colors mb-3 text-sm"
                  >
                    Enroll on WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/free-demo"
                    className="flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white font-semibold w-full py-3.5 rounded-xl transition-colors text-sm border border-white/10"
                  >
                    Book Free Demo
                  </Link>
                  <p className="text-slate-500 text-xs text-center mt-4">
                    ⭐ 4.9 stars, 500+ students trained, 100% placement guarantee
                  </p>
                  <p className="text-slate-600 text-xs text-center mt-1">
                    Above Dr. Batra&apos;s Clinic, Model Town, Sonipat, Haryana 131001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Curriculum ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase text-center mb-3">
              Full Curriculum
            </p>
            <h2 className="font-bold text-3xl text-white text-center mb-10">
              What You&apos;ll Learn
            </h2>
            <div className="space-y-3">
              {program.modules.map((mod, i) => (
                <details
                  key={mod.name}
                  className="bento overflow-hidden group"
                  open={i === 0}
                >
                  <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center font-bold text-amber-400 text-sm shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{mod.name}</div>
                        <div className="text-slate-500 text-xs">{mod.lessons} lessons · {mod.duration}</div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-5 pb-5 pt-1">
                    <div className="grid sm:grid-cols-2 gap-2 pl-12">
                      {mod.topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-2 text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
              Hands-on training
            </p>
            <h2 className="font-bold text-3xl text-white mb-10">
              Tools You&apos;ll Master
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {program.tools.map((tool) => (
                <span
                  key={tool}
                  className="bento px-5 py-2.5 text-sm font-semibold text-slate-300 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ────────────────────────────────────────────────── */}
        {programTestimonials.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-bold text-3xl text-white text-center mb-10">
                What Students Say
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {programTestimonials.map((t) => (
                  <div key={t.name} className="bento p-6 flex flex-col gap-4">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    {/* Review */}
                    <p className="text-slate-400 text-sm leading-relaxed italic flex-1">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="pt-3 border-t border-white/5">
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                      {t.salaryAfter && (
                        <div className="mt-1 text-amber-400 font-semibold text-xs">
                          Now earning: {t.salaryAfter}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Video testimonials ──────────────────────────────────────────── */}
        <VideoTestimonials />

        {/* ── FAQs ────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold text-3xl text-white text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {program.faqs.map((faq) => (
                <details key={faq.question} className="bento overflow-hidden group">
                  <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4">
                    <span className="font-semibold text-white text-sm">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantee banner ────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bento gradient-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-xl text-white mb-2">
                100% Placement Guarantee on Every Program
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Complete all modules, submit assignments, build your portfolio, and apply to 30+ jobs.
                If you aren't placed within 4 months, we refund every rupee. No exceptions, no fine print.
              </p>
            </div>
            <Link
              href="/placement"
              className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              See Placement Data <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Location ────────────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto bento p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="text-3xl shrink-0">📍</div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">
                {program.name} — Taught in Sonipat, Haryana. Available Online Across India.
              </h3>
              <p className="text-slate-400 text-sm">
                Our campus is at: above Dr. Batra&apos;s Clinic, near Mittal Nursing Home, 8 Marla, Model Town, Sonipat, Haryana 131001.
                Students from Delhi, Rohtak, Panipat, Karnal, Hisar and cities across India attend online with the same live experience.
              </p>
            </div>
          </div>
        </section>

        {/* ── Other Programs ──────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-2xl text-white">Explore Other Programs</h2>
              <Link href="/programs" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                All programs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs
                .filter((p) => p.slug !== program.slug)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="group bento p-6 hover:border-amber-500/40 transition-all duration-300"
                  >
                    <span className="text-4xl mb-4 block">{p.icon}</span>
                    <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-400 transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-500 text-xs mb-4">
                      <span>{p.duration}</span>
                      <span>·</span>
                      <span>{p.certifications} certs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <FeeTag
                        fee={p.fee}
                        originalFee={p.originalFee}
                        className="font-bold text-amber-400"
                      />
                      <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
