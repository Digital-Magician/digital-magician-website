import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Award, Zap, CheckCircle, Shield, Users } from "lucide-react";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Digital Marketing Programs in Sonipat | Digital Magician",
  description:
    "6 specialised digital marketing programs — Full Stack, Google Ads, Meta Ads, SEO, Performance Marketing & Web Development. Live mentorship, real campaigns, placement support.",
  openGraph: {
    title: "Digital Marketing Programs | Digital Magician",
    description: "Choose from 6 career-defining programs with live mentorship and 100% placement guarantee.",
    url: "https://digitalmagician.in/programs",
  },
};

const included = [
  { icon: "👨‍🏫", title: "Live Mentorship from Gaurav", desc: "Learn directly from a practitioner managing ₹1 Crore+ in annual ad spend — not a trainer who memorised slides." },
  { icon: "📊", title: "Real Campaign Work", desc: "Run live campaigns on actual eSahayak agency client accounts from Week 1. Not simulations, not demo accounts." },
  { icon: "🎓", title: "Industry Certifications", desc: "Google, Meta, and platform-issued certifications included in your course fee. 10+ credentials on your resume." },
  { icon: "💼", title: "Placement Support", desc: "Resume review, mock interviews, and direct referrals to 10+ hiring partners. 80% placed within 30 days." },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            6 Career-Defining Programs
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Pick Your Path to a
            <span className="block text-amber-400">₹1 Lakh/Month Career</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Every program includes live mentorship, real campaign experience on agency accounts,
            industry certifications, and active placement support.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* ── Programs list ──────────────────────────────────────────────── */}
        <div className="space-y-5 mb-20">
          {programs.map((program, i) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group bento flex flex-col lg:flex-row gap-6 p-7 lg:p-9 items-start lg:items-center hover:border-amber-500/40 transition-all duration-300"
            >
              {/* Icon */}
              <span className="text-5xl shrink-0">{program.icon}</span>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="font-bold text-white text-xl group-hover:text-amber-400 transition-colors">
                    {program.name}
                  </h2>
                  {i === 0 && (
                    <span className="text-xs bg-amber-500 text-slate-900 px-2.5 py-0.5 rounded-full font-bold">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                  {program.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {program.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> {program.certifications} Certifications
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> {program.level}
                  </span>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-right">
                  <div className="font-black text-3xl text-amber-400">
                    ₹{program.fee.toLocaleString("en-IN")}
                  </div>
                  <div className="text-slate-500 text-xs">+ Placement Support</div>
                </div>
                <span className="inline-flex items-center gap-2 bg-amber-500 group-hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  View Program <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── What's included ───────────────────────────────────────────── */}
        <div className="mb-20">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase text-center mb-3">
            Every program includes
          </p>
          <h2 className="font-bold text-3xl text-white text-center mb-10">
            What you get with every enrollment
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {included.map((item) => (
              <div key={item.title} className="bento p-6 text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Guarantee strip ──────────────────────────────────────────── */}
        <div className="mb-20 bento gradient-border rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-xl text-white mb-1">
                100% Placement Guarantee — or Full Refund
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Complete all modules with 75%+ score, submit assignments, build your portfolio,
                and apply to 30+ jobs within 4 months. If you still aren't placed, we refund every
                rupee. No fine print. No loopholes.
              </p>
            </div>
            <Link
              href="/placement"
              className="shrink-0 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm whitespace-nowrap transition-colors"
            >
              See how it works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Not sure CTA ─────────────────────────────────────────────── */}
        <div className="bento p-8 md:p-12 text-center">
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
            Not sure which program is right for you?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Talk to Gaurav for a free 15-minute call. He'll help you pick the right program
            based on your goals, background, and budget.
          </p>
          <a
            href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20need%20help%20choosing%20the%20right%20digital%20marketing%20program."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Get a Free Program Recommendation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
