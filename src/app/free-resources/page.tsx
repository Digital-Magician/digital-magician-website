import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, BookOpen, FileText, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Digital Marketing Resources",
  description:
    "Free guides, templates, and checklists for digital marketers in India. Google Ads checklist, Meta Ads swipe file, SEO audit template, and more — all free.",
  openGraph: {
    title: "Free Digital Marketing Resources | Digital Magician",
    description: "Download free guides, templates, and checklists to level up your digital marketing skills.",
    url: "https://digitalmagician.in/free-resources",
  },
};

const resources = [
  {
    icon: "📋",
    title: "Google Ads Campaign Checklist",
    desc: "A 47-point pre-launch checklist used in our eSahayak agency before going live on any Search campaign. Covers keyword research, match types, ad copy, extensions, conversion tracking, and bidding.",
    type: "PDF Checklist",
    cta: "Get Free Checklist",
    tag: "Google Ads",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    icon: "📱",
    title: "Meta Ads Swipe File — 30 Proven Ad Formulas",
    desc: "30 high-converting ad copy formulas for Facebook and Instagram ads, with real examples from Indian D2C, real estate, and education brands. Stop starting from a blank screen.",
    type: "PDF Swipe File",
    cta: "Get Swipe File",
    tag: "Meta Ads",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    icon: "🔍",
    title: "Local SEO Audit Template",
    desc: "A structured 35-point SEO audit template for Haryana small businesses. Covers Google Business Profile, on-page SEO, citations, reviews, and local schema. Use it for clients or your own business.",
    type: "Excel Template",
    cta: "Get Audit Template",
    tag: "SEO",
    tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    icon: "🤖",
    title: "50 ChatGPT Prompts for Digital Marketers",
    desc: "Exactly the prompts we use at eSahayak for ad copy, email sequences, content briefs, competitor analysis, and client reporting — ready to copy and customise.",
    type: "PDF Prompt Library",
    cta: "Get Prompt Library",
    tag: "AI Tools",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
  {
    icon: "💰",
    title: "Freelance Pricing Calculator",
    desc: "A simple calculator to figure out what to charge for Google Ads management, SEO retainers, Meta Ads, and content writing. Based on real rates in the Indian freelance market in 2026.",
    type: "Google Sheet",
    cta: "Get Calculator",
    tag: "Freelancing",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    icon: "📊",
    title: "Digital Marketing Career Roadmap",
    desc: "A visual 12-month roadmap from zero knowledge to your first ₹30,000/month digital marketing job. Shows the exact skills to build each month, certifications to earn, and job-search milestones.",
    type: "PDF Roadmap",
    cta: "Get Roadmap",
    tag: "Career",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
];

const blogHighlights = [
  { title: "Google Ads Bidding Strategies in 2026", href: "/blog/google-ads-bidding-strategies-2026", emoji: "📊" },
  { title: "Local SEO for Haryana Businesses", href: "/blog/local-seo-haryana-small-business-guide-2026", emoji: "📍" },
  { title: "10 AI Tools That Make You 10x More Productive", href: "/blog/ai-tools-digital-marketing-2026", emoji: "🤖" },
  { title: "Meta Ads vs Google Ads: Which to Learn First", href: "/blog/meta-ads-vs-google-ads-which-to-learn-first", emoji: "⚔️" },
];

export default function FreeResourcesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Free Forever
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Tools We Actually Use,
            <span className="block text-amber-400">Yours for Free</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Checklists, templates, swipe files, and prompts from the eSahayak agency
            and the Digital Magician classroom. No email required — just send us a WhatsApp.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">

        {/* ── Resources grid ────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {resources.map((r) => (
            <div key={r.title} className="bento flex flex-col gap-4 p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl">{r.icon}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${r.tagColor}`}>
                  {r.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-bold text-white mb-2 leading-snug">{r.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <FileText className="w-3.5 h-3.5" /> {r.type}
                </span>
                <a
                  href={`https://wa.me/917988227240?text=Hi!%20I%20want%20the%20free%20resource:%20${encodeURIComponent(r.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> {r.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Free blog content ─────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-2xl text-white">Free Long-Form Guides</h2>
            <Link href="/blog" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              All articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogHighlights.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bento p-5 flex items-center gap-4 hover:border-amber-500/40 transition-all duration-300"
              >
                <span className="text-3xl shrink-0">{post.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Free article
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Free demo ─────────────────────────────────────────────────── */}
        <div className="mb-16 bento gradient-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-5xl shrink-0">🎬</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-xl text-white mb-2">
              The best free resource: a 60-minute demo class
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Watch our trainer teach a real module — no registration, no email, just 60 minutes of
              actual class content. See exactly how we teach before you decide to enroll.
            </p>
          </div>
          <Link
            href="/free-demo"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            <Play className="w-4 h-4" /> Watch Free Demo
          </Link>
        </div>

        {/* ── Get all via WhatsApp ──────────────────────────────────────── */}
        <div className="bento p-8 text-center">
          <h2 className="font-bold text-xl text-white mb-3">Want all 6 resources in one go?</h2>
          <p className="text-slate-400 text-sm mb-6">
            Message "Free Resources" on WhatsApp and we'll send you everything in one bundle.
          </p>
          <a
            href="https://wa.me/917988227240?text=Hi!%20Please%20send%20me%20all%20the%20free%20resources%20bundle."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Get Full Bundle on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
