import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, MapPin, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Salary Guide 2026 — Haryana & Delhi NCR",
  description:
    "Real digital marketing salary data for Haryana & Delhi NCR (2026) — by role, experience & city. Based on 500+ student placements.",
  alternates: { canonical: "/salary-guide" },
  openGraph: {
    title: "Digital Marketing Salary Guide 2026 | Digital Magician",
    description: "What can you actually earn in digital marketing in North India? Real data from 500+ placement records.",
    url: "https://digitalmagician.in/salary-guide",
    images: ["/og-image.png"],
  },
};

const salaryTable = [
  { role: "Performance Marketer (Google + Meta)", entry: "₹28,000–₹45,000", mid: "₹45,000–₹75,000", senior: "₹75,000–₹1,20,000" },
  { role: "Google Ads Specialist", entry: "₹25,000–₹42,000", mid: "₹42,000–₹70,000", senior: "₹70,000–₹1,10,000" },
  { role: "Meta Ads Specialist", entry: "₹22,000–₹38,000", mid: "₹38,000–₹65,000", senior: "₹65,000–₹95,000" },
  { role: "SEO Specialist", entry: "₹22,000–₹38,000", mid: "₹38,000–₹60,000", senior: "₹60,000–₹90,000" },
  { role: "Social Media Manager", entry: "₹20,000–₹35,000", mid: "₹35,000–₹55,000", senior: "₹55,000–₹80,000" },
  { role: "Content Strategist", entry: "₹20,000–₹32,000", mid: "₹32,000–₹52,000", senior: "₹52,000–₹75,000" },
  { role: "Digital Marketing Manager", entry: "₹35,000–₹55,000", mid: "₹55,000–₹90,000", senior: "₹90,000–₹1,50,000" },
];

const cityData = [
  {
    city: "Gurugram",
    range: "₹35,000–₹70,000",
    note: "Highest in North India. MNCs and funded startups pay 40–60% above Haryana rates.",
    premium: "+50% vs Haryana",
    icon: "🏙️",
    highlight: true,
  },
  {
    city: "Delhi (South/Central)",
    range: "₹28,000–₹55,000",
    note: "Close to Gurugram levels for agency and corporate roles.",
    premium: "+40% vs Haryana",
    icon: "🏛️",
    highlight: false,
  },
  {
    city: "Noida / Faridabad",
    range: "₹25,000–₹48,000",
    note: "15–25% above Haryana rate. Good mid-tier market for freshers.",
    premium: "+20% vs Haryana",
    icon: "🏢",
    highlight: false,
  },
  {
    city: "Haryana (Sonipat, Panipat, Rohtak)",
    range: "₹18,000–₹35,000",
    note: "Lower nominal salary but 40–50% lower cost of living. Strong purchasing power.",
    premium: "Baseline",
    icon: "🏘️",
    highlight: false,
  },
  {
    city: "Remote (for NCR clients)",
    range: "₹35,000–₹55,000",
    note: "NCR rates while living in Haryana. Highest real-terms value. Growing fast.",
    premium: "Best deal",
    icon: "💻",
    highlight: true,
  },
];

const freelancePhases = [
  {
    phase: "Phase 1",
    timeline: "Months 1–3 after training",
    income: "₹10,000–₹25,000/month",
    desc: "Building first 2–3 clients. Rates are low because your portfolio is thin. Focus on results, not rates.",
    color: "border-slate-500/30",
  },
  {
    phase: "Phase 2",
    timeline: "Months 4–12",
    income: "₹25,000–₹60,000/month",
    desc: "3–5 clients, a portfolio with real numbers, growing referrals. Start raising rates.",
    color: "border-amber-500/30",
  },
  {
    phase: "Phase 3",
    timeline: "Year 2+",
    income: "₹60,000–₹1,50,000/month",
    desc: "Established clients, retainer model, ability to be selective. This is where real leverage lives.",
    color: "border-green-500/30",
  },
];

const salaryLevers = [
  {
    lever: "Portfolio quality",
    impact: "+₹5,000–₹10,000/month",
    desc: "Candidates with documented campaign results — real CTR, real ROAS, real organic traffic — consistently out-earn certificate-only candidates.",
  },
  {
    lever: "Google + Meta certifications",
    impact: "Table stakes",
    desc: "Not having them costs you credibility. Having them doesn't spike salary, but absence is a red flag to every hiring manager.",
  },
  {
    lever: "AI tool fluency",
    impact: "+₹3,000–₹8,000/month",
    desc: "Freshers who demonstrate ChatGPT workflows, Midjourney for creatives, or Surfer SEO for content are getting noticed and hired over more experienced candidates.",
  },
  {
    lever: "Negotiation",
    impact: "+₹3,000–₹8,000/month",
    desc: "Students who negotiate their first offer — confidently stating a number or presenting a competing offer — earn significantly more than those who accept the first number.",
  },
  {
    lever: "City and geography",
    impact: "+₹8,000–₹15,000/month",
    desc: "Applying to Gurgaon and Noida roles instead of only Haryana ones is the single biggest salary lever available to Haryana-based freshers.",
  },
];

export default function SalaryGuidePage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Based on 500+ Placement Records
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            What Digital Marketers
            <span className="block text-amber-400">Actually Earn in 2026</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Real salary data for Haryana and Delhi NCR — not inflated institute brochure numbers
            and not the depressed figures sceptics throw around. Based on actual offer letters.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">

        {/* ── Key number ────────────────────────────────────────────────── */}
        <div className="bento gradient-border rounded-2xl p-8 md:p-10 mb-12 text-center">
          <p className="text-slate-400 text-sm mb-2">Median first salary — Digital Magician graduates</p>
          <div className="font-black text-6xl md:text-7xl text-amber-400 mb-2">₹26,000</div>
          <p className="text-slate-400 text-sm">per month · Range: ₹20,000 to ₹38,000 depending on role, city, and portfolio</p>
        </div>

        {/* ── Salary table ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white mb-2">Salary by Specialisation</h2>
          <p className="text-slate-400 text-sm mb-6">
            Haryana and Delhi NCR market. Sourced from offer letters, Naukri/LinkedIn job postings, and employer feedback.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Entry (0–1 yr)</th>
                  <th className="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Mid (1–3 yrs)</th>
                  <th className="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Senior (3–5 yrs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {salaryTable.map((row, i) => (
                  <tr key={row.role} className={`hover:bg-white/3 transition-colors ${i === 0 ? "bg-amber-500/5" : ""}`}>
                    <td className="px-5 py-4 text-slate-300 font-medium">{row.role}</td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{row.entry}</td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{row.mid}</td>
                    <td className="px-5 py-4 text-amber-400 font-semibold whitespace-nowrap">{row.senior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── City premium ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white mb-2">The City Premium</h2>
          <p className="text-slate-400 text-sm mb-6">
            Geography matters more than most Haryana freshers realise. The same skill set pays
            dramatically different amounts in different cities.
          </p>
          <div className="space-y-3">
            {cityData.map((city) => (
              <div
                key={city.city}
                className={`bento p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                  city.highlight ? "border-amber-500/30 bg-amber-500/3" : ""
                }`}
              >
                <span className="text-2xl shrink-0">{city.icon}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-bold text-white">{city.city}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      city.highlight
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-white/5 text-slate-400 border border-white/10"
                    }`}>
                      {city.premium}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{city.note}</p>
                </div>
                <div className="text-amber-400 font-bold text-sm whitespace-nowrap shrink-0">
                  {city.range}
                </div>
              </div>
            ))}
          </div>
          <div className="bento border border-amber-500/20 bg-amber-500/5 p-5 mt-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="font-semibold text-amber-400">The best move for Haryana students in 2026:</span> Get a remote role
              with a Gurgaon or Delhi agency. NCR salary rates, Haryana cost of living.
              Several of our graduates earn ₹35,000–₹55,000/month working remotely from Panipat or Karnal.
            </p>
          </div>
        </div>

        {/* ── Freelancing ───────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white mb-2">Freelancing: The Uncapped Option</h2>
          <p className="text-slate-400 text-sm mb-6">
            Freelancing has no ceiling — and no floor. Here's what realistic income looks like phase by phase.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {freelancePhases.map((phase) => (
              <div key={phase.phase} className={`bento border p-6 ${phase.color}`}>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{phase.phase}</div>
                <div className="text-amber-400 font-black text-lg mb-1">{phase.income}</div>
                <div className="text-slate-500 text-xs mb-3">{phase.timeline}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
          <div className="bento p-6">
            <div className="flex gap-4">
              <span className="text-3xl shrink-0">👩‍💻</span>
              <div>
                <div className="font-bold text-white mb-1">Real example: Sakshi from Panipat</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Was earning ₹60,000/month in freelance SEO consulting 10 months after completing our
                  SEO Mastery program. 4 retainer clients, all Haryana-based businesses, found through
                  local networking. The Haryana freelance market is significantly underserved — most local
                  businesses have never worked with a trained digital marketer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Salary levers ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white mb-2">What Actually Moves Your Salary</h2>
          <p className="text-slate-400 text-sm mb-6">
            Beyond the certificate — these are the five factors that consistently differentiate higher-paid
            candidates from lower-paid ones in the same job market.
          </p>
          <div className="space-y-3">
            {salaryLevers.map((lever) => (
              <div key={lever.lever} className="bento p-5 flex gap-5 items-start">
                <TrendingUp className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-bold text-white text-sm">{lever.lever}</span>
                    <span className="text-xs font-semibold bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full">
                      {lever.impact}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{lever.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROI calculation ───────────────────────────────────────────── */}
        <div className="mb-16 bento gradient-border rounded-2xl p-8 md:p-10">
          <h2 className="font-bold text-2xl text-white mb-6 text-center">The ROI Math</h2>
          <p className="text-slate-400 text-sm text-center mb-8">
            Full Stack program fee: <span className="text-white font-semibold">₹45,000</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { year: "Year 1", salary: "₹26,000/month", annual: "₹3.6 lakh", note: "Median starting salary" },
              { year: "Year 2", salary: "₹33,800/month", annual: "₹4.7 lakh", note: "+30% raise (typical)" },
              { year: "Year 3", salary: "₹42,250/month", annual: "₹5.9 lakh", note: "+25% raise (typical)" },
            ].map((row) => (
              <div key={row.year} className="bento p-5 text-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">{row.year}</div>
                <div className="font-black text-xl text-white mb-1">{row.annual}</div>
                <div className="text-slate-400 text-xs">{row.note}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-1">Total 3-year earnings</div>
            <div className="font-black text-4xl text-amber-400 mb-2">~₹14 lakh</div>
            <div className="text-slate-500 text-xs">From a ₹45,000 course investment. That's 31× ROI before freelance income.</div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="bento p-8 md:p-10 text-center">
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
            Want to start building toward these numbers?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            Every salary figure on this page came from a student who went through structured
            training with real campaign experience. The path is replicable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20read%20the%20salary%20guide%20and%20want%20to%20know%20more%20about%20your%20programs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Talk to Gaurav on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              View All Programs
            </Link>
          </div>
          <p className="text-slate-500 text-xs mt-5">
            Salary data based on Digital Magician placement records and publicly available job postings from Naukri and LinkedIn as of early 2026.
          </p>
        </div>
      </div>
    </main>
  );
}
