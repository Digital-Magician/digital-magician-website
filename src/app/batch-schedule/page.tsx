import type { Metadata } from "next";
import { pageTitle } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Users, MapPin, Wifi, AlertCircle } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import { getUpcomingBatchDates } from "@/lib/date";
import { getProgramBySlug } from "@/lib/data/programs";

// Regenerate daily so the rolling batch dates never go stale (always future).
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const [nextDate] = getUpcomingBatchDates(1);
  return {
    title: { absolute: pageTitle("Batch Schedule & Upcoming Classes in Sonipat") },
    description: `Upcoming Digital Magician batch dates. Next batch starts ${nextDate}, only 4 seats left. Online and offline available. Book your seat on WhatsApp.`,
  };
}

const batches = [
  {
    name: "Full Stack Digital Marketing",
    duration: "4 Months",
    mode: ["Offline", "Online"],
    timing: "Mon / Wed / Fri — 7:00 PM to 9:00 PM",
    seats: 4,
    totalSeats: 20,
    status: "filling-fast",
    highlights: [
      "Google Ads + Meta Ads + SEO + Content",
      "Live agency campaign access from Week 1",
      "10+ certifications included",
      "100% placement guarantee",
    ],
    slug: "full-stack-digital-marketing",
  },
  {
    name: "Performance Marketing",
    duration: "2 Months",
    mode: ["Offline", "Online"],
    timing: "Tue / Thu / Sat — 7:00 PM to 9:00 PM",
    seats: 8,
    totalSeats: 15,
    status: "open",
    highlights: [
      "Google Ads + Meta Ads deep-dive",
      "Live ₹10,000+ ad budget practicals",
      "Google & Meta certifications",
      "Placement support included",
    ],
    slug: "performance-marketing",
  },
  {
    name: "SEO Mastery",
    duration: "6 Weeks",
    mode: ["Online"],
    timing: "Mon / Wed / Fri — 8:00 PM to 9:30 PM",
    seats: 12,
    totalSeats: 20,
    status: "open",
    highlights: [
      "Technical SEO + On-page + Off-page",
      "AI-powered SEO tools (Surfer, Ahrefs, GSC)",
      "Programmatic SEO module included",
      "Real client ranking projects",
    ],
    slug: "seo-mastery",
  },
  {
    name: "Google Ads Mastery",
    duration: "6 Weeks",
    mode: ["Online"],
    timing: "Tue / Thu — 7:30 PM to 9:00 PM",
    seats: 15,
    totalSeats: 20,
    status: "open",
    highlights: [
      "Search, Display, YouTube, Performance Max",
      "Real campaign management from Day 1",
      "Google Ads certification included",
      "ROAS-focused training",
    ],
    slug: "google-ads-mastery",
  },
];

const faqs = [
  {
    q: "Can I switch between online and offline modes?",
    a: "Yes. Most students do hybrid — offline when they can, online when they can't. Every session is recorded so you never miss a class.",
  },
  {
    q: "What happens if I miss a class?",
    a: "Every class is recorded and uploaded within 24 hours. You get 12-month access to all recordings. Missing a class won't cause you to fall behind.",
  },
  {
    q: "Are there any EMI options?",
    a: "Yes. We offer 2-month and 3-month EMI plans with no interest. Ask us on WhatsApp for details.",
  },
  {
    q: "Can I enroll in multiple programs?",
    a: "Full Stack is the most comprehensive and covers all specialisations. If you're looking for a deep-dive into one area, the specialisation courses are ideal. Talk to us before deciding.",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "filling-fast") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-red-500/10 text-red-400 border border-red-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        Filling Fast
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-green-500/10 text-green-400 border border-green-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Open
    </span>
  );
}

export default function BatchSchedulePage() {
  // Rolling future start dates, spaced ~2 weeks apart, recomputed on each
  // (re)generation so visitors never see a past date.
  const startDates = getUpcomingBatchDates(batches.length);
  // Fees are derived from the program data (single source of truth) so the
  // batch schedule always matches the homepage / program pages.
  const datedBatches = batches.map((batch, i) => {
    const program = getProgramBySlug(batch.slug);
    return {
      ...batch,
      startDate: startDates[i],
      fee: program ? `₹${program.fee.toLocaleString("en-IN")}` : "",
      originalFee: program?.originalFee
        ? `₹${program.originalFee.toLocaleString("en-IN")}`
        : undefined,
    };
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[400px] h-[400px] -top-10 -left-10 opacity-25 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <Calendar className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Next Batch: {startDates[0]}</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl text-white mb-5">
            Find Your Batch.<br />
            <em className="not-italic text-gradient-amber">Start Your Career.</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/60 text-lg max-w-xl mx-auto font-body">
            All batches run live — not pre-recorded. Every session is also recorded for 12-month replay access.
            Online and offline seats available for every program.
          </p>
        </div>
      </section>

      {/* ── Batch Cards ───────────────────────────────────────────── */}
      <section className="py-20 bg-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {datedBatches.map((batch, i) => (
            <AnimateOnScroll key={batch.name} delay={i * 80}>
              <div className={`bento p-7 sm:p-8 ${batch.status === "filling-fast" ? "border-amber-brand/30" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="font-heading font-bold text-white text-xl">{batch.name}</h2>
                      <StatusBadge status={batch.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/45 text-sm font-body">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-brand" />
                        Starts {batch.startDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-brand" />
                        {batch.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-brand" />
                        {batch.seats} of {batch.totalSeats} seats left
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="stat-number text-3xl">
                      {"originalFee" in batch && batch.originalFee ? (
                        <span className="line-through text-white/60 font-normal mr-2 text-[0.6em] align-middle">
                          {batch.originalFee}
                        </span>
                      ) : null}
                      {batch.fee}
                    </div>
                    <div className="text-white/60 text-xs font-body">one-time fee</div>
                  </div>
                </div>

                {/* Timing & Mode */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-white/55 text-xs font-body">{batch.timing}</span>
                  </div>
                  {batch.mode.map((m) => (
                    <div key={m} className="flex items-center gap-1.5 glass-amber rounded-full px-3 py-1.5">
                      {m === "Online" ? <Wifi className="w-3 h-3 text-amber-brand" /> : <MapPin className="w-3 h-3 text-amber-brand" />}
                      <span className="text-amber-brand text-xs font-heading font-semibold">{m}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {batch.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-white/55 text-sm font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Seat bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-body text-white/60 mb-1.5">
                    <span>Seats filled</span>
                    <span>{batch.totalSeats - batch.seats} / {batch.totalSeats}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-brand to-amber-400 rounded-full"
                      style={{ width: `${((batch.totalSeats - batch.seats) / batch.totalSeats) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(batch.name)}%20batch%20starting%20${encodeURIComponent(batch.startDate)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 text-sm gap-2 group flex-1 justify-center"
                  >
                    Reserve a Seat
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={`/programs/${batch.slug}`}
                    className="btn-ghost px-6 py-3 text-sm gap-2 flex-1 justify-center"
                  >
                    {batch.name} curriculum
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ── Note ──────────────────────────────────────────────────── */}
      <section className="pb-16 bg-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex items-start gap-4 glass rounded-2xl p-5">
              <AlertCircle className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-heading font-semibold text-white mb-1">Can&apos;t find a time that works?</div>
                <p className="text-white/50 text-sm font-body leading-relaxed">
                  We occasionally run weekend batches for working professionals. WhatsApp us to check availability
                  or get notified when the next batch opens.
                  <Link
                    href="https://wa.me/917988227240?text=Hi!%20I%20want%20to%20know%20about%20weekend%20or%20custom%20batch%20options."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-brand ml-1 hover:underline"
                  >
                    Ask about custom batches →
                  </Link>
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="heading-lg text-3xl text-white">
              Batch <span className="text-gradient-amber">FAQs</span>
            </h2>
          </AnimateOnScroll>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
