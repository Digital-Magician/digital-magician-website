import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Write for Us | Blog",
  description:
    "Contribute to the Digital Magician blog. We publish practitioner-written articles on Google Ads, SEO, Meta Ads, AI tools and marketing careers in India.",
  openGraph: {
    title: "Write for Us | Digital Magician",
    description: "Share your digital marketing expertise with our audience of students and professionals across North India.",
    url: "https://digitalmagician.in/write-for-us",
  },
};

const weAccept = [
  "How-to guides based on real campaign experience (with actual numbers)",
  "Tool comparisons and honest reviews — pros, cons, and real use cases",
  "Career advice for digital marketers in India — based on lived experience",
  "Local SEO and performance marketing case studies from Indian businesses",
  "AI tools and workflow breakdowns with specific prompts and results",
  "Salary, freelancing, and income guides backed by real data",
];

const weDontAccept = [
  "Generic 'What is digital marketing' beginner posts already covered everywhere",
  "Promotional content disguised as editorial (paid-for placements)",
  "AI-generated articles without original human expertise and insight",
  "Content that copies or closely paraphrases existing articles",
  "Guest posts primarily for backlinks with thin or surface-level content",
];

const guidelines = [
  { rule: "Minimum 1,200 words", desc: "Longer if the topic demands it. We don't pad for length — we cut ruthlessly. But our audience expects depth." },
  { rule: "Real examples required", desc: "Every tactical claim needs a real example. 'This strategy increased CTR by 18%' is better than 'this strategy can increase CTR'." },
  { rule: "No fluff, no filler", desc: "No 'great question!' lead-ins, no unnecessary definition sections, no conclusions that just repeat the intro." },
  { rule: "India-relevant", desc: "Our audience is in Haryana, Delhi NCR, and broader India. Examples, salary data, and market context should reflect this." },
  { rule: "Author bio required", desc: "We publish real people. Include your name, role, and a one-line description of your relevant experience." },
];

export default function WriteForUsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Guest Contributors
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Write for the
            <span className="block text-amber-400">Digital Magician Blog</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            We publish practitioner-written articles on performance marketing, SEO, AI tools,
            and digital marketing careers. If you have real experience and real numbers — we want to hear from you.
          </p>
          <a
            href="mailto:Hello@digitalmagician.in?subject=Write%20for%20Us%20—%20Article%20Pitch"
            className="hero-item hero-item-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" /> Pitch Your Article
          </a>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── What we publish ───────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {/* Accept */}
          <div className="bento p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" /> What We Publish
            </h2>
            <div className="space-y-3">
              {weAccept.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Don't accept */}
          <div className="bento p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> What We Don&apos;t Publish
            </h2>
            <div className="space-y-3">
              {weDontAccept.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 text-red-400 shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs">✕</span>
                  <p className="text-slate-400 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Writing guidelines ────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">Writing Guidelines</h2>
          <div className="space-y-3">
            {guidelines.map((g) => (
              <div key={g.rule} className="bento p-5 flex gap-4">
                <div className="shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2" />
                <div>
                  <div className="font-bold text-white text-sm mb-1">{g.rule}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What you get ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">What You Get</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: "✍️", title: "Byline + Author Bio", desc: "Your name, role, LinkedIn, and a short bio on every article you publish. Permanent attribution." },
              { icon: "🔗", title: "One Do-Follow Link", desc: "One contextual do-follow link to your website, portfolio, or LinkedIn in the author bio or article body." },
              { icon: "📢", title: "Social Amplification", desc: "Articles are shared to our WhatsApp channels, Instagram, and LinkedIn. You reach our audience directly." },
            ].map((item) => (
              <div key={item.title} className="bento p-6 text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bento border border-amber-500/20 bg-amber-500/5 p-5 mt-4">
            <p className="text-slate-300 text-sm leading-relaxed text-center">
              <span className="font-semibold text-amber-400">We do not pay per word or per article.</span> This is an editorial platform — we publish for reach and credibility, not payment. If that's not the right fit, we understand.
            </p>
          </div>
        </div>

        {/* ── Submission process ────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">How to Submit</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Email a pitch", desc: "Send a 100-word pitch — topic, angle, the real experience you're drawing from, and why our audience would find it useful." },
              { step: "02", title: "We respond in 5 days", desc: "We'll confirm if the topic is a fit and give you a brief. We don't give detailed feedback on declined pitches." },
              { step: "03", title: "Submit the draft", desc: "Send us the full draft as a Google Doc with comment access. We'll edit for clarity and length, and share it before publishing." },
            ].map((s) => (
              <div key={s.step} className="bento p-5 text-center">
                <div className="font-black text-3xl text-amber-400/30 mb-3">{s.step}</div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="bento gradient-border rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-bold text-2xl text-white mb-3">Ready to pitch?</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Email us your 100-word pitch. Subject line: "Write for Us — [Your Topic]".
            We read every pitch and respond within 5 working days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:Hello@digitalmagician.in?subject=Write%20for%20Us%20—%20Article%20Pitch"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" /> Email Your Pitch
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Read the Blog First
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-slate-500 text-xs mt-4">hello@digitalmagician.in · Response within 5 working days</p>
        </div>
      </div>
    </main>
  );
}
