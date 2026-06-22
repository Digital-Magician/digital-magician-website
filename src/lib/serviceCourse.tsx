import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, CheckCircle, MapPin, Clock, Award, Shield,
  TrendingUp, BookOpen, Briefcase, Wrench,
} from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import FeeTag from "@/components/shared/FeeTag";
import {
  serviceCourses, getServiceCourse, SERVICE_CITY_SLUGS, type ServiceCourse,
} from "@/lib/data/services";
import { getLocationBySlug } from "@/lib/data/locations";

const fill = (text: string, city: string) => text.replaceAll("{city}", city);

// ── Route helpers (called from each /{service}/[city]/page.tsx) ──────────────
export function serviceCityParams() {
  return SERVICE_CITY_SLUGS.map((city) => ({ city }));
}

export async function buildServiceMetadata(
  serviceKey: string,
  citySlug: string
): Promise<Metadata> {
  const service = getServiceCourse(serviceKey);
  const location = getLocationBySlug(citySlug);
  if (!service || !location) return { title: "Not Found" };
  const city = location.name;
  const title = `${service.name} in ${city} — Fees, Syllabus & 100% Placement`;
  const description = `${service.name} in ${city} — live projects & 100% placement guarantee. ${service.tagline} Fees ₹${service.fee.toLocaleString("en-IN")}, ${service.duration}, online & offline.`;
  const url = `https://digitalmagician.in/${service.slug}/${citySlug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${service.name} in ${city} | Digital Magician`, description, url, images: ["/og-image.png"] },
  };
}

// ── Page renderer ────────────────────────────────────────────────────────────
export async function renderServiceCourse(serviceKey: string, citySlug: string) {
  const service = getServiceCourse(serviceKey);
  const location = getLocationBySlug(citySlug);
  if (!service || !location) notFound();
  const city = location.name;

  const whatsapp = `https://wa.me/917988227240?text=${encodeURIComponent(
    `Hi Digital Magician! I'm from ${city} and want to know about the ${service.name} at Digital Magician.`
  )}`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${service.name} in ${city}`,
    description: fill(service.intro, city),
    provider: {
      "@type": "Organization",
      name: "Digital Magician",
      url: "https://digitalmagician.in",
    },
    offers: { "@type": "Offer", price: String(service.fee), priceCurrency: "INR" },
    courseMode: "Blended",
    timeRequired: service.duration,
    areaServed: city,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "115",
      bestRating: "5",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: fill(f.q, city),
      acceptedAnswer: { "@type": "Answer", text: fill(f.a, city) },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalmagician.in" },
      { "@type": "ListItem", position: 2, name: `Digital Marketing Course in ${city}`, item: `https://digitalmagician.in/digital-marketing-course/${citySlug}` },
      { "@type": "ListItem", position: 3, name: `${service.name} in ${city}`, item: `https://digitalmagician.in/${service.slug}/${citySlug}` },
    ],
  };

  const otherServices = serviceCourses.filter((s) => s.key !== service.key);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[600px] h-[600px] -top-20 -left-20 opacity-28 z-[2]" />
        <div className="orb orb-indigo w-[450px] h-[450px] top-1/4 -right-20 opacity-35 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
              <MapPin className="w-3.5 h-3.5 text-amber-brand" />
              <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">
                {service.icon} {service.name} · {city}, {location.region}
              </span>
            </div>

            <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              {service.name} in {city}
            </h1>

            <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body mb-8">
              {fill(service.intro, city)}
            </p>

            {/* Quick facts */}
            <div className="hero-item hero-item-4 flex flex-wrap items-center justify-center gap-3 mb-9">
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-white/70 text-xs font-body">
                <Clock className="w-3.5 h-3.5 text-amber-brand" /> {service.duration}
              </span>
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-white/70 text-xs font-body">
                <Award className="w-3.5 h-3.5 text-amber-brand" /> {service.certifications} Certifications
              </span>
              <span className="flex items-center gap-1.5 glass-amber rounded-full px-4 py-2 text-amber-brand text-xs font-heading font-bold">
                <FeeTag fee={service.fee} /> · EMI available
              </span>
              <span className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-white/70 text-xs font-body">
                <Shield className="w-3.5 h-3.5 text-amber-brand" /> 100% Placement Guarantee
              </span>
            </div>

            <div className="hero-item hero-item-5 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center">
                Talk to Digital Magician — Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/free-demo" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                Watch a Free Demo First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you'll learn ─────────────────────────────────────── */}
      <section className="py-20 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <span className="tag mb-4 inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Syllabus</span>
            <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
              What You&apos;ll Master in the {service.name}
            </h2>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.whatYouLearn.map((item, i) => (
              <AnimateOnScroll key={item} delay={i * 60}>
                <div className="bento p-5 flex items-start gap-3 h-full">
                  <CheckCircle className="w-5 h-5 text-amber-brand shrink-0 mt-0.5" />
                  <span className="text-white/75 text-sm font-body leading-relaxed">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Tools */}
          <AnimateOnScroll className="mt-12">
            <div className="bento p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-amber-brand" />
                <span className="font-heading font-bold text-white text-sm">Tools you&apos;ll use</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span key={tool} className="text-xs bg-white/6 border border-white/10 text-white/70 font-body px-3 py-1.5 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Careers & salaries ────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <span className="tag mb-4 inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Careers</span>
            <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
              Where the {service.name} Takes You
            </h2>
            <p className="text-white/55 text-base font-body mt-4 max-w-2xl mx-auto">
              Roles our {city} and Delhi NCR graduates land — with the live-campaign portfolio you build during the course.
            </p>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-3 gap-5">
            {service.roles.map((r, i) => (
              <AnimateOnScroll key={r.role} delay={i * 70}>
                <div className="bento p-6 text-center h-full">
                  <TrendingUp className="w-5 h-5 text-amber-brand mx-auto mb-3" />
                  <div className="font-heading font-bold text-white text-sm mb-1">{r.role}</div>
                  <div className="text-amber-brand font-heading font-bold text-lg">{r.salary}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local relevance (unique per city) ─────────────────────── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="bento p-7 sm:p-9">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-amber-brand" />
                <span className="font-heading font-bold text-white text-base">
                  {service.shortLabel} careers in {city}
                </span>
              </div>
              <p className="text-white/65 text-sm font-body leading-relaxed mb-4">{location.jobMarket.insight}</p>
              <p className="text-white/65 text-sm font-body leading-relaxed">{location.opportunity}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {location.mode === "home" ? (
                  <span className="text-xs glass-amber text-amber-brand font-heading font-bold px-4 py-2 rounded-full">
                    Offline classes in {city} + live online batch
                  </span>
                ) : location.mode === "far" ? (
                  <span className="text-xs glass-amber text-amber-brand font-heading font-bold px-4 py-2 rounded-full">
                    Live online batch recommended · {location.distanceFromSonipat} from our Sonipat campus
                  </span>
                ) : (
                  <span className="text-xs glass-amber text-amber-brand font-heading font-bold px-4 py-2 rounded-full">
                    Online &amp; offline · {location.distanceFromSonipat} ({location.travelTime}) from Sonipat
                  </span>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Enroll / program link ─────────────────────────────────── */}
      <section className="py-16 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bento gradient-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading font-bold text-2xl text-white mb-2">
                Ready to enroll in the {service.name}?
              </h2>
              <p className="text-white/60 text-sm font-body leading-relaxed">
                See the full syllabus, batch dates, and EMI options on the program page — or message us directly to reserve your seat in {city}.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link href={`/programs/${service.programSlug}`} className="btn-primary px-7 py-3.5 text-sm gap-2 justify-center">
                View Full Program <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3.5 text-sm justify-center">
                Reserve My Seat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <span className="tag mb-4">FAQs</span>
            <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
              {service.name} in {city} — Questions, Answered
            </h2>
          </AnimateOnScroll>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 60}>
                <details className="group bento p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-heading font-semibold text-white text-sm">{fill(faq.q, city)}</span>
                    <svg className="w-4 h-4 text-amber-brand flex-shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-white/55 text-sm font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {fill(faq.a, city)}
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related courses + main course ─────────────────────────── */}
      <section className="py-16 bg-midnight border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-lg text-2xl sm:text-3xl text-white text-center mb-3">
            Other Courses in {city}
          </h2>
          <p className="text-white/50 text-sm font-body text-center mb-10">
            Want the complete skill set? The{" "}
            <Link href={`/digital-marketing-course/${citySlug}`} className="text-amber-brand hover:underline">
              Digital Marketing Course in {city}
            </Link>{" "}
            covers everything.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link key={s.key} href={`/${s.slug}/${citySlug}`} className="bento p-5 group hover:border-amber-brand/30 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <div className="font-heading font-bold text-white text-sm mt-3 group-hover:text-amber-brand transition-colors">
                  {s.name} in {city}
                </div>
                <div className="text-amber-brand text-xs font-heading font-bold mt-2 inline-flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
