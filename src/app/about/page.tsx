import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Users, TrendingUp, Target, CheckCircle, Star, MapPin, ExternalLink } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CountUp from "@/components/shared/CountUp";

export const metadata: Metadata = {
  title: "About Us | Digital Magician — Sonipat's Real-World Digital Marketing Institute",
  description:
    "Meet Gaurav Malik — founder of Digital Magician and eSahayak agency. We don't teach theory. We teach from live client campaigns. Learn why 127+ students chose us for real results.",
};

const timeline = [
  {
    year: "2017",
    title: "eSahayak Agency Founded",
    desc: "Gaurav starts eSahayak Digital, a full-service digital marketing agency serving local and national brands. The agency that would eventually become the live lab for every Digital Magician student.",
  },
  {
    year: "2019",
    title: "First Batch of Students",
    desc: "Frustrated by the gap between 'courses' and real jobs, Gaurav starts training his first 12 students — not from a textbook, but directly from active agency campaigns.",
  },
  {
    year: "2021",
    title: "The Placement Guarantee",
    desc: "After watching other institutes leave students jobless, Digital Magician becomes one of the first institutes in Haryana to introduce a legally-backed 100% placement guarantee or full refund.",
  },
  {
    year: "2023",
    title: "AI-Integrated Curriculum",
    desc: "ChatGPT, Gemini, Midjourney — when AI flipped digital marketing upside down, Digital Magician was the first institute in Sonipat to rebuild its curriculum around AI tools. Competitors were still teaching 2019.",
  },
  {
    year: "2024",
    title: "127 Students. ₹1.2 Crore+ in Salaries.",
    desc: "By 2024, Digital Magician students were earning a combined ₹1.2 Crore+ annually. 80% placed in under 30 days. The numbers now speak louder than any brochure ever could.",
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Agency-First Teaching",
    desc: "Every module is built around how agencies actually work — timelines, client expectations, performance targets. Not how textbooks describe agencies.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Skin in the Game",
    desc: "Gaurav still manages ₹1 Crore+ in live ad spend every year. When he teaches campaign strategy, it's because he ran that exact campaign last week.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Over Certificates",
    desc: "Our alumni WhatsApp group isn't just a job board — it's 127 working marketers sharing live campaigns, rate cards, and client referrals. The network pays dividends for years.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Results or Refund",
    desc: "We only win when you win. The placement guarantee isn't marketing copy — it's a written commitment backed by a refund policy. No fine print designed to trap you.",
  },
];

const teamHighlights = [
  { stat: "7+", label: "Years running live campaigns" },
  { stat: "₹1Cr+", label: "Annual ad spend managed" },
  { stat: "50+", label: "Active clients served" },
  { stat: "127+", label: "Students placed" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[500px] h-[500px] -top-20 -left-20 opacity-30 z-[2]" />
        <div className="orb orb-indigo w-[400px] h-[400px] top-0 -right-20 opacity-35 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Sonipat, Haryana</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            We Teach Digital Marketing<br className="hidden sm:block" />
            <em className="not-italic text-gradient-amber"> The Way Agencies Do It</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Not from a textbook. Not from YouTube tutorials recorded in 2019. From live client campaigns
            running right now — managed by the same person teaching you.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────── */}
      <section className="py-16 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamHighlights.map((item, i) => (
              <AnimateOnScroll key={item.label} delay={i * 100}>
                <div className="text-center">
                  <div className="stat-number text-4xl sm:text-5xl mb-2">{item.stat}</div>
                  <div className="text-white/50 text-sm font-body">{item.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Story ─────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story */}
            <AnimateOnScroll type="reveal-left">
              <div>
                <span className="tag mb-4 inline-block">The Founder</span>
                <h2 className="heading-lg text-4xl sm:text-5xl text-white mb-6 mt-4">
                  Gaurav Malik —<br />
                  <span className="text-gradient-amber">Not Just a Trainer</span>
                </h2>
                <div className="space-y-5 text-white/65 font-body text-base leading-relaxed">
                  <p>
                    Gaurav didn&apos;t start Digital Magician to build a training business. He started it because he was hiring —
                    and every candidate who walked in with a &ldquo;digital marketing certificate&rdquo; didn&apos;t know how to
                    set up a Meta Pixel, couldn&apos;t interpret a GA4 report, and had never actually managed a live campaign.
                  </p>
                  <p>
                    So he started training them himself. From inside eSahayak, his active digital marketing agency,
                    using real client accounts, real budgets, and real deadlines.
                  </p>
                  <p>
                    Today, Gaurav manages over ₹1 Crore in annual ad spend across Google, Meta, and YouTube — and every
                    tactic he teaches is something he tested last week on a live account. Not something he read in a course.
                  </p>
                  <p className="text-white/80 font-semibold">
                    That&apos;s the unfair advantage Digital Magician students have over everyone else.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20more%20about%20Digital%20Magician."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 text-sm gap-2 group"
                  >
                    Talk to Gaurav Directly
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="https://esahayak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost px-6 py-3 text-sm gap-2"
                  >
                    Visit eSahayak <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right: Card */}
            <AnimateOnScroll type="reveal-right">
              <div className="gradient-border rounded-3xl p-8 bg-carbon/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center">
                    <span className="text-2xl font-heading font-black text-amber-brand">G</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-lg">Gaurav Malik</div>
                    <div className="text-amber-brand text-sm font-body">Founder, Digital Magician &amp; eSahayak</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "7+ years running live digital campaigns",
                    "₹1 Crore+ annual ad spend managed",
                    "Google Ads & Meta certified",
                    "50+ brands served across India",
                    "Trainer to 127+ working marketers",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm font-body">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-brand fill-amber-brand" />
                    ))}
                    <span className="text-white/50 text-xs ml-2 font-body">4.9 — 105 Google reviews</span>
                  </div>
                  <p className="text-white/50 text-xs font-body italic">
                    &ldquo;Gaurav is the only trainer I&apos;ve met who showed us his actual client dashboard during class.&rdquo;
                    <span className="text-amber-brand not-italic ml-1">— Priya S., Gurgaon</span>
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">How We Think</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Four Beliefs That Make Us<br />
              <span className="text-gradient-amber">Different From Every Other Institute</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 100}>
                <div className="bento p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center text-amber-brand mb-5">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-white/55 text-sm font-body leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-16">
            <span className="tag mb-4">Our Story</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              From Agency to <span className="text-gradient-amber">Institute</span>
            </h2>
          </AnimateOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-brand/40 via-amber-brand/20 to-transparent hidden sm:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimateOnScroll key={item.year} delay={i * 80}>
                  <div className="sm:pl-16 relative">
                    {/* Dot */}
                    <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-midnight border-2 border-amber-brand/40 items-center justify-center">
                      <span className="text-amber-brand font-heading font-black text-xs">{item.year.slice(2)}</span>
                    </div>
                    <div className="bento p-6">
                      <div className="inline-flex items-center gap-2 glass-amber rounded-full px-3 py-1 mb-3">
                        <span className="text-amber-brand text-xs font-heading font-bold">{item.year}</span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-white/55 text-sm font-body leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🎯</div>
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                Ready to Learn From Someone<br />
                <span className="text-gradient-amber">Who&apos;s Still in the Game?</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-xl mx-auto">
                Book a free 30-minute call with Gaurav. No sales pitch — just an honest conversation
                about where you want to go and whether Digital Magician is the right path.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20more%20about%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Book Free Counselling Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/programs"
                  className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center"
                >
                  Browse Programs
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
