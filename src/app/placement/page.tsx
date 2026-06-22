import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Clock, TrendingUp, Award, Users, AlertCircle } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CountUp from "@/components/shared/CountUp";

export const metadata: Metadata = {
  title: "Digital Marketing Course With 100% Placement Guarantee",
  description:
    "A digital marketing course with a real, legally-backed placement guarantee — placed in 30 days or a full refund. 80% placed, 10+ hiring partners.",
  alternates: { canonical: "/placement" },
};

const stats = [
  { value: 80, suffix: "%", label: "Placed within 30 days", icon: <Clock className="w-5 h-5" /> },
  { value: 500, suffix: "+", label: "Total students placed", icon: <Users className="w-5 h-5" /> },
  { value: 10, suffix: "+", label: "Active hiring partners", icon: <Award className="w-5 h-5" /> },
  { value: 30, suffix: "k+", label: "Avg. first salary (₹)", icon: <TrendingUp className="w-5 h-5" /> },
];

const guaranteeSteps = [
  {
    num: "01",
    title: "Complete All Modules",
    desc: "Attend 75%+ of all classes and complete every module. Recordings are available for all missed sessions — no excuse to skip the curriculum.",
  },
  {
    num: "02",
    title: "Submit All Assignments",
    desc: "Practical assignments are graded on time. These aren't busywork — they're portfolio pieces that hiring managers will ask about.",
  },
  {
    num: "03",
    title: "Build Your Portfolio",
    desc: "Complete your live campaign project on a real eSahayak client account. This is the proof of work that separates you from every certificate-holder.",
  },
  {
    num: "04",
    title: "Apply to 30+ Jobs",
    desc: "Use our curated job board, attend our exclusive placement drives, and apply to at least 30 positions within 4 months of completion.",
  },
  {
    num: "05",
    title: "Placed — or Full Refund",
    desc: "If you've done everything above and still aren't placed, we return every single rupee of your course fee. No partial refunds. No conditions hidden in fine print.",
  },
];

const salaryRanges = [
  { role: "SEO Executive", min: 22000, max: 45000, demand: "↑ 34% YoY" },
  { role: "Performance Marketer", min: 30000, max: 70000, demand: "↑ 52% YoY" },
  { role: "Social Media Manager", min: 20000, max: 50000, demand: "↑ 28% YoY" },
  { role: "Google Ads Specialist", min: 28000, max: 65000, demand: "↑ 47% YoY" },
  { role: "Content Strategist", min: 22000, max: 48000, demand: "↑ 31% YoY" },
  { role: "Freelance Consultant", min: 40000, max: 150000, demand: "Unlimited ceiling" },
];

const hiringPartners = [
  "Digital Marketing Agencies", "E-commerce Brands", "D2C Startups",
  "Real Estate Companies", "EdTech Platforms", "Healthcare Brands",
  "SaaS Companies", "Media Houses", "Retail Chains", "Financial Services",
];

const placements = [
  { name: "Priya S.", role: "Performance Marketing Manager", company: "Digital Agency, Gurgaon", salary: "₹28,000/mo", time: "22 days after completion" },
  { name: "Rahul K.", role: "SEO Specialist", company: "E-commerce Brand, Delhi", salary: "₹32,000/mo", time: "18 days after completion" },
  { name: "Sakshi V.", role: "Freelance SEO Consultant", company: "Self-employed, Panipat", salary: "₹60,000/mo", time: "3 months — now growing" },
  { name: "Amit D.", role: "Google Ads Manager", company: "Real Estate, Sonipat", salary: "₹35,000/mo", time: "25 days after completion" },
  { name: "Neha R.", role: "Social Media Strategist", company: "D2C Brand, Noida", salary: "₹26,000/mo", time: "30 days after completion" },
  { name: "Vikram M.", role: "Digital Marketing Lead", company: "SaaS Startup, Gurugram", salary: "₹45,000/mo", time: "28 days after completion" },
];

export default function PlacementPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[600px] h-[600px] -top-20 -left-20 opacity-30 z-[2]" />
        <div className="orb orb-indigo w-[400px] h-[400px] top-1/4 -right-20 opacity-35 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <Shield className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Legally Backed Guarantee</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            Get Placed in 30 Days —<br />
            <em className="not-italic text-gradient-amber">Or Get Every Rupee Back</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            This isn&apos;t a marketing claim. It&apos;s a written commitment with a legal refund policy.
            80% of our students are placed before they even need to invoke it.
          </p>
          <div className="hero-item hero-item-4 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20more%20about%20the%20placement%20guarantee."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
            >
              Understand the Guarantee
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/programs" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div className="bento p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center text-amber-brand mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="stat-number text-4xl sm:text-5xl mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-xs font-body">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── How the Guarantee Works ───────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">No Fine Print</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Exactly How the<br />
              <span className="text-gradient-amber">Placement Guarantee Works</span>
            </h2>
            <p className="text-white/55 font-body mt-4 max-w-xl mx-auto text-base">
              Five steps. All fair. All achievable. If you do the work, you get the job.
              If you don&apos;t get the job despite doing the work, you get the refund.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {guaranteeSteps.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={i * 80} className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
                <div className={`bento p-7 h-full ${i === 4 ? "border-amber-brand/30 bg-amber-brand/[0.04]" : ""}`}>
                  <div className="stat-number text-5xl mb-4 opacity-30">{step.num}</div>
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-white/55 text-sm font-body leading-relaxed">{step.desc}</p>
                  {i === 4 && (
                    <div className="mt-4 flex items-center gap-2 text-amber-brand text-xs font-heading font-bold">
                      <Shield className="w-3.5 h-3.5" />
                      Written refund policy — no exceptions
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Transparency note */}
          <AnimateOnScroll className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 glass rounded-2xl p-5">
              <AlertCircle className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5" />
              <p className="text-white/55 text-sm font-body leading-relaxed">
                <strong className="text-white">Why do we offer this?</strong> Because 80% of our students get placed before
                the 30-day mark. We&apos;ve only ever processed 2 refunds in 5 years — and both were edge cases.
                The guarantee forces us to keep our curriculum and placement network sharp. It&apos;s accountability, not charity.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Recent Placements ─────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Real Results</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Students Who Are<br />
              <span className="text-gradient-amber">Already Getting Paid</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {placements.map((p, i) => (
              <AnimateOnScroll key={p.name} delay={i * 80}>
                <div className="bento p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center">
                      <span className="font-heading font-black text-amber-brand text-sm">{p.name[0]}</span>
                    </div>
                    <span className="text-amber-brand font-heading font-bold text-lg">{p.salary}</span>
                  </div>
                  <div className="font-heading font-bold text-white mb-0.5">{p.name}</div>
                  <div className="text-amber-brand/80 text-xs font-body mb-1">{p.role}</div>
                  <div className="text-white/40 text-xs font-body mb-4">{p.company}</div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs font-body">
                    <Clock className="w-3 h-3" />
                    {p.time}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Salary Ranges ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Market Data</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              What You Can Earn<br />
              <span className="text-gradient-amber">After Graduation</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="bento overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left p-4 text-white/40 text-xs font-heading font-bold tracking-widest uppercase">Role</th>
                      <th className="text-left p-4 text-white/40 text-xs font-heading font-bold tracking-widest uppercase">Salary Range</th>
                      <th className="text-right p-4 text-white/40 text-xs font-heading font-bold tracking-widest uppercase">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryRanges.map((row, i) => (
                      <tr key={row.role} className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.02] ${i === salaryRanges.length - 1 ? "border-0" : ""}`}>
                        <td className="p-4 font-heading font-semibold text-white text-sm">{row.role}</td>
                        <td className="p-4 text-amber-brand font-heading font-bold text-sm">₹{row.min.toLocaleString("en-IN")} – ₹{row.max.toLocaleString("en-IN")}</td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                            {row.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Hiring Partners ───────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <span className="tag mb-4">Hiring Network</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Industries Where Our<br />
              <span className="text-gradient-amber">Students Get Hired</span>
            </h2>
            <p className="text-white/50 font-body mt-4 max-w-lg mx-auto text-sm">
              We don&apos;t list fake logos. We list the real types of companies hiring from us right now.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="flex flex-wrap gap-3 justify-center">
              {hiringPartners.map((partner) => (
                <div key={partner} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm font-heading font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-brand" />
                  {partner}
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10 sm:p-14">
              <Shield className="w-12 h-12 text-amber-brand mx-auto mb-5" />
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                The Risk Is Ours,<br />
                <span className="text-gradient-amber">Not Yours</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-xl mx-auto">
                If you put in the work and still don&apos;t get placed, we refund every rupee.
                We&apos;ve had 500+ students trust us with that risk. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20enroll%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Claim Your Seat Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/programs" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                  View All Programs
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
