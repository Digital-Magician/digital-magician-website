import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Zap, Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Hire Digital Marketing Talent",
  description:
    "Hire pre-trained, job-ready digital marketing professionals from Digital Magician. Our graduates come with live campaign experience, industry certifications, and proven results.",
  openGraph: {
    title: "Hire Digital Marketing Talent | Digital Magician",
    description: "Pre-trained graduates with real campaign experience. No onboarding lag. Ready from Week 1.",
    url: "https://digitalmagician.in/hire-from-us",
  },
};

const whyHire = [
  {
    icon: "📊",
    title: "Real Campaign Experience",
    desc: "Every graduate has managed live campaigns on actual client accounts through our eSahayak agency. They've handled real budgets, optimised for real ROAS, and dealt with real-world campaign problems.",
  },
  {
    icon: "🎓",
    title: "Industry Certifications",
    desc: "Our Full Stack graduates carry 10+ certifications from Google, Meta, and industry platforms — all issued directly by the platforms, not by us.",
  },
  {
    icon: "🤖",
    title: "AI-Native Marketers",
    desc: "Our curriculum integrates ChatGPT, Midjourney, Surfer SEO, and marketing automation from Day 1. Graduates are measurably more productive than traditional hires.",
  },
  {
    icon: "⚡",
    title: "Zero Onboarding Lag",
    desc: "They know Google Ads Manager, Meta Business Suite, GA4, and GTM inside out. Most companies report a 2–3 week onboarding vs 6–8 weeks for untrained hires.",
  },
];

const roles = [
  { role: "Performance Marketer", skills: ["Google Ads", "Meta Ads", "YouTube Ads", "GA4", "Attribution"], level: "Entry–Mid" },
  { role: "Google Ads Specialist", skills: ["Search", "Display", "Shopping", "YouTube", "Conversion Tracking"], level: "Entry–Mid" },
  { role: "Meta Ads Specialist", skills: ["Campaign Management", "Audience Building", "Creative Strategy", "WhatsApp CRM"], level: "Entry–Mid" },
  { role: "SEO Specialist", skills: ["On-Page SEO", "Technical SEO", "Link Building", "SEMrush", "Ahrefs"], level: "Entry–Mid" },
  { role: "Social Media Manager", skills: ["Content Strategy", "Organic Growth", "Paid Social", "Community Management"], level: "Entry" },
  { role: "Web Designer (WordPress)", skills: ["WordPress", "Elementor", "WooCommerce", "Landing Pages", "UX Basics"], level: "Entry" },
];

const process = [
  { step: "01", title: "Share your requirement", desc: "Tell us the role, location (or remote), salary range, and any specific tools or domain experience needed." },
  { step: "02", title: "We match candidates", desc: "Within 48 hours, we shortlist graduates whose skills and portfolio match your requirements." },
  { step: "03", title: "Interview and hire", desc: "Conduct interviews with shortlisted candidates. Hire at your standard process — we facilitate, not intermediary." },
  { step: "04", title: "30-day guarantee", desc: "If a hire doesn't work out in the first 30 days, we'll find a replacement at no cost." },
];

const currentlyHiring = [
  { company: "D2C Brand", location: "Remote / Delhi NCR", role: "Performance Marketer", salary: "₹30,000–₹45,000/month" },
  { company: "Real Estate Agency", location: "Gurugram", role: "Meta Ads Specialist", salary: "₹25,000–₹38,000/month" },
  { company: "EdTech Startup", location: "Remote", role: "Google Ads Specialist", salary: "₹28,000–₹42,000/month" },
  { company: "Digital Marketing Agency", location: "Delhi", role: "SEO Specialist", salary: "₹22,000–₹35,000/month" },
];

export default function HireFromUsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Hiring Partners
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Hire Marketers Who
            <span className="block text-amber-400">Actually Know the Work</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Digital Magician graduates come with live campaign experience, industry certifications,
            and AI tool fluency. No onboarding lag. Ready to contribute from Week 1.
          </p>
          <div className="hero-item hero-item-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20We%20are%20looking%20to%20hire%20a%20digital%20marketing%20professional.%20Can%20we%20discuss?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Talk to Digital Magician About Hiring
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:Hello@digitalmagician.in?subject=Hiring%20Enquiry%20from%20[Company%20Name]"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" /> Email a Requirement
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { value: "500+", label: "Trained Graduates", icon: "👨‍🎓" },
            { value: "80%", label: "Placed Within 30 Days", icon: "⚡" },
            { value: "10+", label: "Active Hiring Partners", icon: "🤝" },
            { value: "4.9★", label: "Employer Satisfaction", icon: "⭐" },
          ].map((s) => (
            <div key={s.label} className="bento p-5 text-center">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <div className="font-black text-2xl text-amber-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Why hire ──────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">
            Why Companies Hire From Digital Magician
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyHire.map((item) => (
              <div key={item.title} className="bento p-6 flex gap-4">
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Roles available ───────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">
            Roles We Can Fill
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((r) => (
              <div key={r.role} className="bento p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-white text-sm">{r.role}</h3>
                  <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full shrink-0">
                    {r.level}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p) => (
              <div key={p.step} className="bento p-5 text-center">
                <div className="font-black text-3xl text-amber-400/30 mb-3">{p.step}</div>
                <h3 className="font-bold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Currently hiring ──────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white mb-2">Open Positions From Our Partners</h2>
          <p className="text-slate-400 text-sm mb-6">
            If you're a graduate looking for a job — these companies are actively hiring.
            WhatsApp us with your portfolio to be considered.
          </p>
          <div className="space-y-3">
            {currentlyHiring.map((job) => (
              <div key={`${job.company}-${job.role}`} className="bento p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{job.role}</div>
                  <div className="text-slate-400 text-sm">{job.company} · {job.location}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-amber-400 font-semibold text-sm">{job.salary}</span>
                  <a
                    href={`https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20am%20interested%20in%20the%20${encodeURIComponent(job.role)}%20position%20at%20${encodeURIComponent(job.company)}.%20Here%20is%20my%20portfolio.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="bento gradient-border rounded-2xl p-8 md:p-10 text-center">
          <Users className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
            Post a hiring requirement
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Tell us what role you're hiring for and we'll match you with pre-screened graduates
            within 48 hours. No recruitment fees — this is free for hiring partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20We%20want%20to%20hire%20a%20digital%20marketer.%20Here%20is%20our%20requirement:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Share Requirement on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:Hello@digitalmagician.in?subject=Hiring%20Requirement"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" /> Email a JD
            </a>
          </div>
          <p className="text-slate-500 text-xs mt-4">Free for employers · No placement fee · 30-day replacement guarantee</p>
        </div>
      </div>
    </main>
  );
}
