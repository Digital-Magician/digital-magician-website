import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle, Clock, Users, Star, Calendar } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Free Demo Class — Watch Before You Enroll",
  description:
    "Watch a free Digital Magician demo class before you enroll. See how we teach from live client campaigns, not slides. No registration needed.",
};

const whatYouGet = [
  { icon: "🎯", title: "A real Google Ads campaign breakdown", desc: "Your trainer walks through an actual client campaign — targeting, bidding, copy — not a hypothetical example." },
  { icon: "📊", title: "Live GA4 dashboard walkthrough", desc: "How to read analytics data the way agencies do: what metrics matter, what to ignore, and what to act on." },
  { icon: "🤖", title: "AI tools in action", desc: "ChatGPT for ad copy, keyword research with AI, and a prompt sequence our trainers use every week for real clients." },
  { icon: "💬", title: "Q&A from real students", desc: "You'll hear the questions actual students ask — and the trainer's unfiltered answers. No rehearsed script." },
];

const demoModules = [
  { time: "0:00 – 8:00", topic: "Who is this course for? (And who it's NOT for)" },
  { time: "8:00 – 22:00", topic: "Inside a live Google Ads campaign — real account, real spend" },
  { time: "22:00 – 38:00", topic: "GA4 deep-dive: the 5 metrics every marketer must track" },
  { time: "38:00 – 52:00", topic: "AI tools session: ChatGPT + Surfer SEO workflow" },
  { time: "52:00 – 60:00", topic: "The Digital Magician curriculum walkthrough + Q&A" },
];

const testimonials = [
  { name: "Rahul K.", text: "I watched the demo at 11 PM on a Tuesday. By Wednesday morning I'd enrolled. That session taught me more than 3 months at my previous institute.", role: "Now: Google Ads Specialist, Delhi" },
  { name: "Neha R.", text: "The demo wasn't a sales pitch. It was an actual class. I could see immediately that Gaurav knew his stuff — he was navigating a real client account, not PowerPoint slides.", role: "Now: Social Media Strategist, Noida" },
  { name: "Deepak R.", text: "What convinced me was when Gaurav said 'I'm going to show you my screen, not a stock image'. That's when I knew this was different.", role: "Now: SEO Manager (Remote)" },
];

export default function FreeDemoPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[500px] h-[500px] -top-10 -right-20 opacity-28 z-[2]" />
        <div className="orb orb-indigo w-[400px] h-[400px] bottom-0 -left-10 opacity-30 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
                <Play className="w-3.5 h-3.5 text-amber-brand fill-amber-brand" />
                <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">60-Minute Free Demo Class</span>
              </div>
              <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl text-white mb-6">
                Watch Before<br />
                <em className="not-italic text-gradient-amber">You Decide</em>
              </h1>
              <p className="hero-item hero-item-3 text-white/65 text-lg leading-relaxed font-body mb-8">
                Our trainer teaches a full 60-minute live demo class — real campaigns, real data, no sales pitch.
                Watch it free. Then decide if Digital Magician is right for you.
              </p>
              <div className="hero-item hero-item-4 flex flex-wrap gap-4 text-sm text-white/50 font-body mb-8">
                {[
                  { icon: <Clock className="w-3.5 h-3.5" />, text: "60 minutes" },
                  { icon: <Users className="w-3.5 h-3.5" />, text: "No registration required" },
                  { icon: <Star className="w-3.5 h-3.5" />, text: "4.9 star-rated by 105 students" },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-1.5 text-white/50">
                    <span className="text-amber-brand">{item.icon}</span>
                    {item.text}
                  </span>
                ))}
              </div>
              <div className="hero-item hero-item-5 flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20watch%20the%20free%20demo%20class%20and%20get%20the%20link."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  <Play className="w-4 h-4 fill-midnight" />
                  Get Demo Class Link
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20attend%20the%20next%20live%20demo%20class."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Attend Live Demo
                </Link>
              </div>
            </div>

            {/* Right: Video placeholder */}
            <AnimateOnScroll type="reveal-right">
              <div className="gradient-border rounded-3xl overflow-hidden aspect-video flex items-center justify-center bg-carbon/60 group cursor-pointer relative">
                {/* Thumbnail pattern */}
                <div className="absolute inset-0 pattern-dots opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-brand/10 via-transparent to-indigo-deep/20" />
                {/* Play button */}
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20watch%20the%20free%20demo%20class%20and%20get%20the%20link."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-brand flex items-center justify-center shadow-amber-lg group-hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 text-midnight fill-midnight ml-1" />
                  </div>
                  <div className="text-center">
                    <div className="font-heading font-bold text-white text-sm">Watch Free Demo</div>
                    <div className="text-white/40 text-xs font-body mt-0.5">60 min · No signup needed</div>
                  </div>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── What's in the demo ────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Demo Contents</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              What You&apos;ll Learn in the<br />
              <span className="text-gradient-amber">60-Minute Demo</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {whatYouGet.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 80}>
                <div className="bento p-6 flex gap-5">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-heading font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/55 text-sm font-body leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Chapter breakdown */}
          <AnimateOnScroll>
            <div className="bento overflow-hidden max-w-2xl mx-auto">
              <div className="p-5 border-b border-white/[0.06]">
                <h3 className="font-heading font-bold text-white">Chapter Breakdown</h3>
              </div>
              {demoModules.map((mod, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <span className="font-heading font-bold text-amber-brand text-xs w-24 flex-shrink-0 mt-0.5">{mod.time}</span>
                  <span className="text-white/65 text-sm font-body">{mod.topic}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── What students said ────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <h2 className="heading-lg text-4xl text-white">
              What Happened After They<br />
              <span className="text-gradient-amber">Watched the Demo</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 100}>
                <div className="bento p-7 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-amber-brand fill-amber-brand" />
                    ))}
                  </div>
                  <p className="text-white/65 text-sm font-body leading-relaxed italic flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="font-heading font-bold text-white text-sm">{t.name}</div>
                    <div className="text-amber-brand text-xs font-body mt-0.5">{t.role}</div>
                  </div>
                </div>
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
              <div className="text-4xl mb-5">🎬</div>
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                60 Minutes That Could<br />
                <span className="text-gradient-amber">Change Your Career</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-lg mx-auto">
                Don&apos;t take our word for it. Watch the demo. Decide for yourself.
                No email. No registration. Just click and watch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20watch%20the%20free%20demo%20class%20and%20get%20the%20link."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  <Play className="w-4 h-4 fill-midnight" />
                  Watch the Demo Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20enroll%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center"
                >
                  Ready to Enroll? →
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
