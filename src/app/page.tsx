import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Star, Clock, Award,
  Shield, Play, ChevronRight, MapPin, Phone, Zap,
  TrendingUp, Users, Target, BarChart3
} from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CountUp from "@/components/shared/CountUp";
import Marquee from "@/components/shared/Marquee";
import NextBatchDate from "@/components/shared/NextBatchDate";
import FeeTag from "@/components/shared/FeeTag";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import { programs } from "@/lib/data/programs";
import { testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Best AI Digital Marketing Institute in India — Sonipat",
  description:
    "North India's #1 digital marketing institute in Sonipat — master Google Ads, SEO, Meta Ads & AI tools with a 100% placement guarantee. 500+ students trained.",
  alternates: { canonical: "/" },
};

const tools = [
  "ChatGPT", "Claude", "Gemini", "Google Ads", "Meta Ads Manager",
  "SEMrush", "Ahrefs", "Google Analytics 4", "Canva", "WordPress",
  "GTM", "Meta Pixel", "Mailchimp", "Surfer SEO", "WhatsApp CRM",
  "YouTube Ads", "Screaming Frog", "HubSpot", "Google Search Console",
  "AI Image Generation", "AI Video Generation", "Programmatic SEO",
  "Leonardo AI", "HeyGen", "n8n", "Zapier", "Looker Studio",
];

const painPoints = [
  { icon: "❌", title: "Zero Live Campaign Experience", desc: "90% of courses spend 3 months on theory, then hand you a certificate. No one tells you how to actually spend ₹10,000 in ad budget and not lose it." },
  { icon: "❌", title: "Instructors Who've Never Run Ads", desc: "Your trainer memorised a textbook. They've never managed a client campaign, hit a ROAS target, or been accountable for real ad spend." },
  { icon: "❌", title: "Placement 'Support' = A WhatsApp Group", desc: "Most institutes call a list of companies 'placement partners.' Their students spend 6 months applying to jobs with no response." },
  { icon: "❌", title: "Curriculum Frozen in 2021", desc: "ChatGPT. AI SEO. Performance Max. These changed digital marketing entirely. Most courses still teach the 2019 version." },
];

const whyUs = [
  { icon: <BarChart3 className="w-5 h-5" />, title: "Live Campaigns from Week 1", desc: "You manage real ad budgets on real client accounts from Day 1. Not simulations. Not dummy accounts. Actual campaigns with actual results in your portfolio." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Taught by Active Practitioners", desc: "Our trainers manage over Rs 1 Crore in ad spend every year. When they teach campaign optimisation, it is because they ran that exact campaign last week." },
  { icon: <Users className="w-5 h-5" />, title: "10+ Companies Actively Hiring From Us", desc: "We have a real placement pipeline. Hiring partners come to us for talent every month. That is how 80% of our graduates are placed within 30 days of graduating." },
  { icon: <Zap className="w-5 h-5" />, title: "AI-Integrated Curriculum, Updated Every Quarter", desc: "ChatGPT, Claude, Gemini, Midjourney. AI tools are built into every module. You graduate as a marketer who is 10x more productive than your competition." },
];

const faqs = [
  { q: "Is the 100% placement guarantee actually real — or is it full of conditions?", a: "It's real, and the conditions are fair. Complete all modules with 75%+ score, submit assignments on time, build your portfolio during training, and apply to 30+ jobs within 4 months. If you do all that and still aren't placed, we refund every rupee. No loopholes." },
  { q: "I have zero marketing experience. Will I be able to keep up?", a: "That's who this is designed for. We start from 'what is digital marketing' and go all the way to managing real client campaigns. 60% of our students had no prior marketing experience. Today they're running campaigns for companies across India." },
  { q: "Can I attend while working a full-time job?", a: "Yes. Classes run Monday to Friday and you pick the slot that fits your job: 7:30 AM, 9:00 AM, 12:30 PM or 5:30 PM, each 90 minutes. Every session is recorded and accessible for 12 months. You can attend from Sonipat in person or join the same live class online — identical experience, identical access to our trainers." },
  { q: "What's the actual difference between online and offline mode?", a: "The content is identical: same live class, same curriculum, same real campaign projects. Offline students get the campus energy in Sonipat. Online students join the live Zoom with full interaction and screen sharing. Most students prefer hybrid: come to campus when they can, join online when they cannot." },
  { q: "How long before I can start earning after the course?", a: "Most Full Stack graduates land jobs within 30 days. Freelancers often start getting clients within 2–3 months. Our fastest: Sakshi from Panipat was earning ₹60,000/month freelancing 3 months after completing the SEO course." },
  { q: "What certifications will I actually earn?", a: "For the Full Stack program: Google Ads Search Certification, Google Analytics 4 Certification, Meta Blueprint certification, and 7+ more — all issued directly by Google, Meta, and industry platforms. Plus your Digital Magician completion certificate. Total: 10+ credentials on your resume." },
];

const salaryData = [
  { role: "SEO Executive", range: "₹22,000 – ₹45,000", growth: "↑ 34% YoY demand" },
  { role: "Performance Marketer", range: "₹30,000 – ₹70,000", growth: "↑ 52% YoY demand" },
  { role: "Social Media Manager", range: "₹20,000 – ₹50,000", growth: "↑ 28% YoY demand" },
  { role: "Google Ads Specialist", range: "₹28,000 – ₹65,000", growth: "↑ 47% YoY demand" },
  { role: "Freelance Consultant", range: "₹40,000 – ₹1,50,000", growth: "Unlimited ceiling" },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 pb-16">
        {/* Background layers — explicit z-index stacking */}
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-25" />

        {/* Orbs — z-[2], behind content */}
        <div className="orb orb-amber w-[700px] h-[700px] -top-20 -left-32 opacity-35 z-[2]" />
        <div className="orb orb-indigo w-[550px] h-[550px] top-1/4 -right-24 opacity-45 z-[2]" />
        <div className="orb orb-amber w-[350px] h-[350px] bottom-10 left-1/3 opacity-20 z-[2]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[10]">
          <div className="max-w-5xl mx-auto text-center">

            {/* Eyebrow badge */}
            <div className="hero-item hero-item-1 inline-flex items-center gap-2.5 glass-amber rounded-full px-5 py-2.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
              <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">
                #1 in Sonipat, Haryana. Serving Students Across India.
              </span>
            </div>

            {/* Main headline */}
            <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-6xl lg:text-7xl xl:text-[82px] text-white mb-6">
              Stop{" "}
              <em className="not-italic text-gradient-amber">Learning</em>{" "}
              Digital Marketing.{" "}
              <br className="hidden sm:block" />
              Start{" "}
              <span className="relative inline-block">
                <em className="not-italic text-gradient-amber">Getting Paid</em>
                {/* Underline SVG */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C60 3 120 2 150 4C180 6 240 10 298 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </span>{" "}
              For It.
            </h1>

            <h2 className="hero-item hero-item-2 text-amber-brand/90 font-heading font-semibold text-base sm:text-lg mb-6 tracking-wide">
              India&apos;s #1 AI-Powered Digital Marketing Institute — Sonipat &amp; Online
            </h2>

            {/* Sub-headline */}
            <p className="hero-item hero-item-3 text-white/70 text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-body">
              <strong className="text-white font-semibold">500+ students trained.</strong> ₹1.2 Crore+ in combined annual salaries generated.
              Placed in 30 days, or we refund{" "}
              <strong className="text-amber-brand font-semibold">every single rupee.</strong>
            </p>

            <p className="hero-item hero-item-3 text-white/55 text-base mb-10 max-w-2xl mx-auto font-body">
              India&apos;s most results-driven{" "}
              <Link
                href="/digital-marketing-course/sonipat"
                className="text-amber-brand underline underline-offset-4 decoration-amber-brand/40 hover:decoration-amber-brand transition-colors"
              >
                digital marketing course in Sonipat
              </Link>
              {" "}— now available online &amp; offline across Haryana and Delhi NCR.
            </p>

            {/* CTAs */}
            <div className="hero-item hero-item-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="https://wa.me/917988227240?text=Hi!%20I%20want%20to%20know%20about%20the%20digital%20marketing%20course%20at%20Digital%20Magician."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base gap-2.5 group w-full sm:w-auto justify-center"
              >
                Talk to Digital Magician, It&apos;s Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/free-demo"
                className="btn-ghost px-8 py-4 text-base gap-2.5 w-full sm:w-auto justify-center"
              >
                <Play className="w-4 h-4 text-amber-brand fill-amber-brand" />
                Book Free Demo Class
              </Link>
            </div>

            {/* Proof strip */}
            <div className="hero-item hero-item-5 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm text-white/50 font-body">
              {[
                { icon: "⭐", text: "4.9★, 122 Google Reviews" },
                { icon: "🎓", text: "500+ Students Trained" },
                { icon: "🏆", text: "10+ Certifications Included" },
                { icon: "✅", text: "100% Placement or Refund" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-1.5">
                  <span>{item.icon}</span> {item.text}
                </span>
              ))}
            </div>

            {/* Floating proof cards */}
            <div className="hidden lg:flex items-center justify-between mt-16 max-w-3xl mx-auto">
              <div className="float glass rounded-2xl px-5 py-3 text-left">
                <div className="text-xs text-white/50 font-body mb-1">Recent placement</div>
                <div className="font-heading font-bold text-white text-sm">Priya S. → ₹28,000/mo</div>
                <div className="text-xs text-amber-brand font-body">Performance Marketing, Gurgaon</div>
              </div>
              <div className="float-delay glass rounded-2xl px-5 py-3 text-left">
                <div className="text-xs text-white/50 font-body mb-1">Freelancing income</div>
                <div className="font-heading font-bold text-white text-sm">Sakshi V. → ₹60,000/mo</div>
                <div className="text-xs text-amber-brand font-body">SEO Consultant, Panipat</div>
              </div>
              <div className="float glass rounded-2xl px-5 py-3 text-left">
                <div className="text-xs text-white/50 font-body mb-1">Next batch</div>
                <div className="font-heading font-bold text-white text-sm"><NextBatchDate /></div>
                <div className="text-xs text-red-400 font-body">Only 4 seats remaining</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VIDEO TESTIMONIALS (below hero)
      ═══════════════════════════════════════════════════════════ */}
      <VideoTestimonials />

      {/* ═══════════════════════════════════════════════════════════
          TOOLS MARQUEE
      ═══════════════════════════════════════════════════════════ */}
      <div className="py-10 border-y border-white/[0.06] bg-[#07051a] relative overflow-hidden">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#07051a] to-transparent z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#07051a] to-transparent z-10 pointer-events-none" />

        {/* Label */}
        <p className="text-center text-white/60 text-[10px] font-heading font-bold tracking-[0.2em] uppercase mb-5">
          50+ Industry Tools You&apos;ll Master
        </p>

        <Marquee speed="slow">
          {tools.map((tool) => (
            <div key={tool} className="flex-shrink-0 mx-2.5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/55 text-xs font-heading font-semibold tracking-wide whitespace-nowrap hover:border-amber-brand/40 hover:text-amber-brand hover:bg-amber-brand/[0.06] transition-all duration-300 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-brand/50 flex-shrink-0" />
                {tool}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STATS BENTO GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">By The Numbers</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              The Only Metric That{" "}
              <span className="text-gradient-amber">Matters Is Results</span>
            </h2>
          </AnimateOnScroll>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">

            {/* Big stat — students */}
            <AnimateOnScroll className="col-span-2 row-span-2 lg:col-span-1 lg:row-span-2" delay={100}>
              <div className="bento h-full p-8 flex flex-col justify-between min-h-[220px]">
                <div className="text-3xl mb-4">👨‍🎓</div>
                <div>
                  <div className="stat-number text-7xl lg:text-8xl mb-2">
                    <CountUp end={500} suffix="+" />
                  </div>
                  <div className="text-white/60 font-body text-sm">Students trained, from Sonipat to across India</div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Rating */}
            <AnimateOnScroll delay={200}>
              <div className="bento p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-brand fill-amber-brand" />
                  ))}
                </div>
                <div className="stat-number text-5xl mb-1">
                  <CountUp end={4.9} suffix="" decimals={1} />
                </div>
                <div className="text-white/50 text-xs font-body">Average rating, 122 Google Reviews</div>
              </div>
            </AnimateOnScroll>

            {/* Placement speed */}
            <AnimateOnScroll delay={300}>
              <div className="bento p-6 bg-amber-brand/5 border-amber-brand/20">
                <Shield className="w-7 h-7 text-amber-brand mb-3" />
                <div className="stat-number text-5xl mb-1">30</div>
                <div className="text-white/50 text-xs font-body">Days avg. to placement — or full refund</div>
              </div>
            </AnimateOnScroll>

            {/* Wide card — salaries */}
            <AnimateOnScroll className="col-span-2" delay={200}>
              <div className="bento p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-brand/5 rounded-full blur-2xl" />
                <TrendingUp className="w-6 h-6 text-amber-brand mb-3" />
                <div className="stat-number text-4xl sm:text-5xl mb-1">₹1.2 Cr+</div>
                <div className="text-white/50 text-xs font-body">Combined annual salaries generated by our graduates</div>
              </div>
            </AnimateOnScroll>

            {/* Certifications */}
            <AnimateOnScroll delay={400}>
              <div className="bento p-6">
                <Award className="w-7 h-7 text-amber-brand mb-3" />
                <div className="stat-number text-5xl mb-1">
                  <CountUp end={10} suffix="+" />
                </div>
                <div className="text-white/50 text-xs font-body">Google, Meta & industry certifications</div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROBLEM / SOLUTION SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#08071a] relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="text-center mb-16">
            <span className="tag mb-4">The Hard Truth</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4 max-w-3xl mx-auto">
              Why Most Digital Marketing Courses{" "}
              <span className="text-gradient-amber">Don&apos;t Get You Hired</span>
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto font-body">
              You&apos;ve probably seen the ads. ₹5,000 courses. &quot;Learn in 30 days.&quot; &quot;We guarantee jobs.&quot; Here&apos;s what they don&apos;t tell you.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-5 mb-20">
            {painPoints.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 100} type="reveal-scale">
                <div className="bento p-7 flex gap-5">
                  <div className="text-2xl flex-shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="heading-md text-white text-base mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm font-body leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Comparison table (AI / answer-engine friendly) */}
          <AnimateOnScroll className="mt-12 mb-4">
            <div className="bento p-0 overflow-x-auto">
              <table className="w-full text-sm font-body border-collapse">
                <caption className="sr-only">Digital Magician vs a typical digital marketing institute</caption>
                <thead>
                  <tr className="text-left text-white/50 border-b border-white/[0.08]">
                    <th className="p-4 font-heading font-semibold">What you get</th>
                    <th className="p-4 font-heading font-semibold text-amber-brand">Digital Magician</th>
                    <th className="p-4 font-heading font-semibold">A typical institute</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  {[
                    ["Live client campaigns", "Real budgets from Week 1", "Dummy accounts / theory"],
                    ["Trainers", "Active practitioners (₹1 Cr+ ad spend/yr)", "Slide-readers"],
                    ["Placement", "100% guarantee or full refund", "A WhatsApp group"],
                    ["AI tools", "Built into every module", "Rarely covered"],
                    ["Curriculum", "Updated every quarter", "Frozen for years"],
                    ["Certifications", "10+ (Google, Meta & more)", "Institute certificate only"],
                    ["Modes", "Online + offline, same fee", "Usually one mode"],
                  ].map(([f, dm, other]) => (
                    <tr key={f} className="border-b border-white/[0.05]">
                      <td className="p-4 font-medium text-white/85">{f}</td>
                      <td className="p-4 text-white">{dm}</td>
                      <td className="p-4 text-white/45">{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>

          {/* Divider */}
          <AnimateOnScroll className="text-center mb-16">
            <div className="flex items-center gap-6 max-w-lg mx-auto">
              <div className="flex-1 section-divider" />
              <span className="text-amber-brand font-heading font-bold text-sm tracking-widest uppercase">vs. Digital Magician</span>
              <div className="flex-1 section-divider" />
            </div>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-8">
              We Teach the Way{" "}
              <span className="text-gradient-amber">Agencies Work</span>
            </h2>
            <p className="text-white/60 text-lg mt-4 font-body">Because we run one.</p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-5">
            {whyUs.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 100}>
                <div className="gradient-border p-7 h-full relative">
                  <div className="program-accent" />
                  <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center text-amber-brand mb-5">
                    {item.icon}
                  </div>
                  <h3 className="heading-md text-white text-base mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm font-body leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROGRAMS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-midnight" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">6 Specialisations</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Choose Your Path to{" "}
              <span className="text-gradient-amber">₹1 Lakh/Month</span>
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto font-body">
              Every program includes live campaign work on real client accounts. Every program comes with placement support. Every program gives you results you can show, not just a certificate.
            </p>
          </AnimateOnScroll>

          {/* Featured program */}
          <AnimateOnScroll className="mb-5">
            <Link href="/programs/full-stack-digital-marketing" className="gradient-border block p-8 lg:p-10 relative overflow-hidden group">
              <div className="program-accent" />
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                <span className="bg-amber-brand text-midnight text-xs font-heading font-black px-3 py-1.5 rounded-full">
                  ⭐ MOST POPULAR
                </span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="text-5xl mb-5">🚀</div>
                  <h3 className="heading-lg text-2xl sm:text-3xl text-white mb-3 group-hover:text-amber-brand transition-colors">
                    Full Stack Digital Marketing Program
                  </h3>
                  <p className="text-white/65 font-body mb-6 max-w-xl leading-relaxed">
                    The complete career transformation program. In 4 months, you go from zero to managing real Google Ads, Meta Ads, SEO, and AI tools for live clients — with a 100% job placement guarantee or full refund.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["4 Months", "10+ Certifications", "All Levels", "Live Campaigns", "100% Placement"].map((tag) => (
                      <span key={tag} className="text-xs bg-white/6 border border-white/10 text-white/70 font-body px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-left lg:text-right">
                  <FeeTag fee={45000} originalFee={60000} className="stat-number text-5xl mb-1 block" />
                  <div className="text-white/40 text-sm font-body mb-5">or ₹15,000 × 3 EMIs</div>
                  <div className="inline-flex items-center gap-2 text-amber-brand font-heading font-bold group-hover:gap-3 transition-all">
                    See Full Program Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Other programs grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.slice(1).map((program, i) => (
              <AnimateOnScroll key={program.slug} delay={i * 80}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="gradient-border block p-6 h-full group relative overflow-hidden"
                >
                  <div className="program-accent" />
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="heading-md text-white text-base mb-2 group-hover:text-amber-brand transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-white/55 text-sm font-body mb-5 leading-relaxed">
                    {program.tagline}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/45 font-body mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-brand" /> {program.duration}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-brand" /> {program.certifications} certs</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <span className="font-heading font-black text-amber-brand text-xl">
                      ₹{program.fee.toLocaleString("en-IN")}
                    </span>
                    <span className="text-amber-brand group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <Link href="/programs" className="btn-ghost px-8 py-3.5 text-sm gap-2">
              Compare All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — TIMELINE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#08071a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-16">
            <span className="tag mb-4">The Process</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              From Day 1 to{" "}
              <span className="text-gradient-amber">Your First Paycheck</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "🎯",
                title: "Orientation & Goal Setting",
                desc: "Week 1. We map your background to your target outcome. You join a cohort of driven learners. The intensity is real from Day 1.",
              },
              {
                step: "02",
                icon: "📊",
                title: "Learn and Execute at the Same Time",
                desc: "Weeks 2 to 12. Theory in class. You apply it on live client campaigns the same day. No waiting to get to the real part. You are doing the real part from Week 2.",
              },
              {
                step: "03",
                icon: "🎓",
                title: "Build Portfolio + Earn Certifications",
                desc: "Weeks 10–16. You have 3–5 portfolio projects with real results — ROAS numbers, organic rankings, conversion data. Plus 10+ certificates.",
              },
              {
                step: "04",
                icon: "💼",
                title: "Get Placed — We Make the Intro",
                desc: "Month 4+. Resume review. Mock interviews. Direct referrals to our 10+ hiring partners. 80% of our graduates are placed within 30 days.",
              },
            ].map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 120} type="reveal-scale">
                <div className="bento p-7 h-full flex flex-col">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="font-heading font-black text-6xl text-gradient-amber opacity-30 mb-2 leading-none">
                    {step.step}
                  </div>
                  <h3 className="heading-md text-white text-sm mb-3">{step.title}</h3>
                  <p className="text-white/55 text-sm font-body leading-relaxed flex-1">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PLACEMENT GUARANTEE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-midnight relative overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal opacity-60" />
        <div className="orb orb-amber w-[500px] h-[500px] -right-32 top-0 opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-amber rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-brand/8 rounded-full blur-3xl" />

            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <AnimateOnScroll type="reveal-left">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-amber-brand" />
                    <span className="tag">Risk-Free Guarantee</span>
                  </div>
                  <h2 className="heading-xl text-5xl sm:text-6xl text-white mb-6">
                    Get Placed.{" "}
                    <span className="text-gradient-amber">Or Get Paid.</span>
                  </h2>
                  <p className="text-white/70 text-xl font-body leading-relaxed mb-8">
                    No fine print. No gotcha clauses. If you follow the program and we don&apos;t place you within 4 months of graduation — you get every rupee back. That&apos;s how confident we are in what we teach.
                  </p>
                  <div className="space-y-4 mb-10">
                    {[
                      "Complete all modules (75%+ score in each)",
                      "Submit every assignment by the deadline",
                      "Build 3 portfolio projects during training",
                      "Apply to 30+ jobs within 4 months",
                      "Get placed — or receive a full refund",
                    ].map((step, i) => (
                      <div key={step} className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-full bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center font-heading font-black text-amber-brand text-xs flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-white/80 font-body text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/placement" className="btn-primary px-8 py-4 text-sm gap-2">
                    Read the Full Guarantee <ArrowRight className="w-4 h-4" />
                  </Link>
                </AnimateOnScroll>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100%", label: "Placement Guarantee" },
                  { value: "30", suffix: " days", label: "Average time to placement" },
                  { value: "₹0", label: "Risk — full refund if not placed" },
                  { value: "10+", label: "Active hiring partners" },
                ].map((s, i) => (
                  <AnimateOnScroll key={s.label} delay={i * 100}>
                    <div className="bento p-6 text-center">
                      <div className="stat-number text-4xl mb-2">{s.value}</div>
                      <div className="text-white/50 text-xs font-body leading-snug">{s.label}</div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS MARQUEE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#08071a] overflow-hidden">
        <AnimateOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="tag mb-4">Real Students. Real Numbers.</span>
          <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
            What Happens When You{" "}
            <span className="text-gradient-amber">Stop Studying</span>{" "}
            and Start Doing
          </h2>
        </AnimateOnScroll>

        {/* Row 1 — forward */}
        <Marquee speed="slow" className="mb-4">
          {testimonials.map((t) => (
            <div key={t.name} className="quote-card p-6 mx-3 w-80 flex-shrink-0">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-brand fill-amber-brand" />
                ))}
              </div>
              <p className="text-white/75 text-sm font-body italic leading-relaxed mb-5">
                &ldquo;{t.review.slice(0, 140)}...&rdquo;
              </p>
              {t.salaryBefore && (
                <div className="flex items-center gap-3 mb-4 text-xs font-body">
                  <span className="text-white/60 line-through">{t.salaryBefore}</span>
                  <ArrowRight className="w-3 h-3 text-amber-brand flex-shrink-0" />
                  <span className="text-amber-brand font-semibold">{t.salaryAfter}</span>
                </div>
              )}
              <div>
                <div className="font-heading font-bold text-white text-sm">{t.name}</div>
                <div className="text-white/60 text-xs font-body">{t.role} · {t.program}</div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2 — reverse */}
        <Marquee speed="slow" reverse>
          {[...testimonials].reverse().map((t) => (
            <div key={`r-${t.name}`} className="quote-card p-6 mx-3 w-80 flex-shrink-0">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-brand fill-amber-brand" />
                ))}
              </div>
              <p className="text-white/75 text-sm font-body italic leading-relaxed mb-5">
                &ldquo;{t.review.slice(0, 140)}...&rdquo;
              </p>
              {t.salaryBefore && (
                <div className="flex items-center gap-3 mb-4 text-xs font-body">
                  <span className="text-white/60 line-through">{t.salaryBefore}</span>
                  <ArrowRight className="w-3 h-3 text-amber-brand flex-shrink-0" />
                  <span className="text-amber-brand font-semibold">{t.salaryAfter}</span>
                </div>
              )}
              <div>
                <div className="font-heading font-bold text-white text-sm">{t.name}</div>
                <div className="text-white/60 text-xs font-body">{t.role} · {t.program}</div>
              </div>
            </div>
          ))}
        </Marquee>

        <AnimateOnScroll className="text-center mt-10">
          <Link href="/success-stories" className="btn-ghost px-8 py-3.5 text-sm gap-2 mx-auto">
            Read All Success Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateOnScroll>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SALARY SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll type="reveal-left">
              <span className="tag mb-6 block w-fit">What You&apos;ll Earn</span>
              <h2 className="heading-lg text-4xl sm:text-5xl text-white mb-6">
                Digital Marketing Salaries{" "}
                <span className="text-gradient-amber">in India, 2026</span>
              </h2>
              <p className="text-white/65 text-lg font-body leading-relaxed mb-8">
                India added 3.8 lakh digital marketing jobs in 2025. Salaries are rising 30%+ year-on-year. And the people who can run AI-assisted campaigns? Companies are fighting over them.
              </p>
              <div className="space-y-4">
                {salaryData.map((item, i) => (
                  <div key={item.role} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
                    <div>
                      <div className="font-heading font-semibold text-white text-sm">{item.role}</div>
                      <div className="text-green-400 text-xs font-body">{item.growth}</div>
                    </div>
                    <div className="font-heading font-bold text-amber-brand text-sm">{item.range}</div>
                  </div>
                ))}
              </div>
              <Link href="/salary-guide" className="btn-ghost px-6 py-3 text-sm gap-2 mt-8 inline-flex">
                Full Salary Guide 2026 <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll type="reveal-right">
              <div className="bento p-8 relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-30" />
                <div className="relative">
                  <div className="text-center mb-8">
                    <div className="font-heading font-black text-2xl text-white mb-1">Our Graduate Starting Salaries</div>
                    <div className="text-white/50 text-sm font-body">Verified from LinkedIn profiles & student reports</div>
                  </div>
                  {[
                    { name: "Performance Marketing", pct: 82 },
                    { name: "Google Ads Specialist", pct: 75 },
                    { name: "SEO Consultant", pct: 68 },
                    { name: "Social Media Manager", pct: 60 },
                    { name: "Web Designer", pct: 55 },
                  ].map((item) => (
                    <div key={item.name} className="mb-5">
                      <div className="flex items-center justify-between text-sm font-body mb-2">
                        <span className="text-white/70">{item.name}</span>
                        <span className="text-amber-brand font-semibold">{item.pct}% placed &gt; ₹25K</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-fill animated"
                          style={{ "--target-width": `${item.pct}%` } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOUNDER
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#08071a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Founder card */}
            <AnimateOnScroll type="reveal-left">
              <div className="gradient-border p-8 lg:p-10 relative overflow-hidden">
                <div className="program-accent" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-brand/5 rounded-full blur-3xl" />
                <div className="relative">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-brand to-orange-500 flex items-center justify-center font-heading font-black text-midnight text-3xl mb-6">
                    G
                  </div>
                  <h3 className="heading-lg text-white text-2xl mb-1">Gaurav Malik</h3>
                  <p className="text-amber-brand font-heading font-semibold text-sm mb-6">
                    Founder, Digital Magician. 7+ Years in Performance Marketing.
                  </p>
                  <blockquote className="text-white/70 font-body text-base leading-relaxed italic mb-8 border-l-2 border-amber-brand/40 pl-5">
                    &ldquo;I built Digital Magician because I was tired of watching talented people get stuck with certificates that meant nothing to employers. Every lesson we teach is something we applied last week on a live client campaign. That is the only kind of teaching that actually works.&rdquo;
                  </blockquote>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { v: "7+", l: "Years Active" },
                      { v: "500+", l: "Students" },
                      { v: "4.9★", l: "Rating" },
                    ].map((s) => (
                      <div key={s.l} className="text-center">
                        <div className="font-heading font-black text-2xl text-amber-brand">{s.v}</div>
                        <div className="text-white/60 text-xs font-body">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll type="reveal-right">
              <span className="tag mb-6 block w-fit">Who You&apos;re Learning From</span>
              <h2 className="heading-lg text-4xl sm:text-5xl text-white mb-6">
                Taught by People Who{" "}
                <span className="text-gradient-amber">Actually Run Campaigns</span>{" "}
                Right Now.
              </h2>
              <p className="text-white/65 text-lg font-body leading-relaxed mb-8">
                Digital Magician was built by practitioners, not academics. Gaurav has managed over Rs 1 Crore in live ad spend across Google and Meta. He co-founded 10x Estates and 10x Admissions, two active performance marketing agencies serving clients across India. What he teaches, he does every day.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Co-Founder of 10x Estates and 10x Admissions, active performance marketing agencies",
                  "Managed Rs 1 Crore+ in Google and Meta ad budgets",
                  "7+ years of performance marketing experience across India",
                  "Students placed at companies across Delhi NCR, Haryana and major Indian cities",
                  "Curriculum updated every quarter based on what is working in live campaigns",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5" />
                    <span className="text-white/75 font-body text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-ghost px-8 py-4 text-sm gap-2 inline-flex">
                Read the Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TOOLS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="heading-lg text-3xl sm:text-4xl text-white">
              Master <span className="text-gradient-amber">50+ Tools</span> — Including AI
            </h2>
            <p className="text-white/55 font-body mt-3">
              Every tool in the Digital Magician curriculum is used on live client campaigns.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {tools.map((tool, i) => (
                <div
                  key={tool}
                  className="bento px-5 py-2.5 text-sm font-heading font-semibold text-white/65 hover:text-amber-brand hover:border-amber-brand/25 transition-all cursor-default"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {tool}
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#08071a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">The Questions Everyone Asks</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              Straight Answers.{" "}
              <span className="text-gradient-amber">No Marketing Fluff.</span>
            </h2>
          </AnimateOnScroll>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 60}>
                <details className="bento overflow-hidden group">
                  <summary className="list-none cursor-pointer p-6 flex items-start justify-between gap-4 select-none">
                    <span className="heading-md text-white text-sm sm:text-base leading-snug">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-white/65 font-body text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <p className="text-white/50 font-body text-sm mb-4">Still have a question?</p>
            <Link
              href="https://wa.me/917988227240?text=Hi!%20I%20have%20a%20question%20about%20Digital%20Magician."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5 text-sm gap-2"
            >
              Ask Us on WhatsApp <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-midnight relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-25" />
        <div className="orb orb-amber w-[600px] h-[600px] left-1/2 -translate-x-1/2 -bottom-60 opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="glass-amber rounded-3xl p-10 lg:p-16 text-center">

            {/* Rotating badge */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-amber-brand/10 border border-amber-brand/20" />
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🚀</div>
              <svg
                className="absolute inset-0 rotating-badge"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  id="circle-path"
                  d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
                  fill="none"
                />
                <text fontSize="10" fill="rgba(245,158,11,0.6)" fontFamily="Montserrat">
                  <textPath href="#circle-path">
                    ENROLL NOW • SEATS LIMITED • MAY 2026 •
                  </textPath>
                </text>
              </svg>
            </div>

            <h2 className="heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Your First Day at{" "}
              <span className="text-gradient-amber">Digital Magician</span>{" "}
              Could Change Everything.
            </h2>
            <p className="text-white/70 text-lg font-body mb-4 max-w-2xl mx-auto leading-relaxed">
              500+ people have already made this decision. They now run ad budgets, manage campaigns, and earn salaries they did not think were possible a year ago. The upcoming batch has{" "}
              <strong className="text-white">4 seats left.</strong>
            </p>
            <p className="text-amber-brand font-heading font-bold mb-10">
              100% placement guarantee, or every rupee back. No risk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="https://wa.me/917988227240?text=Hi!%20I%20want%20to%20enroll%20in%20the%20May%202026%20batch%20at%20Digital%20Magician.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-5 text-base gap-2.5 group w-full sm:w-auto justify-center"
              >
                Reserve My Seat, Talk to Digital Magician
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/scholarship-test"
                className="btn-ghost px-10 py-5 text-base gap-2 w-full sm:w-auto justify-center"
              >
                Take the Free Scholarship Test (50% Off)
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40 font-body">
              <span className="flex items-center gap-2 text-center sm:text-left">
                <MapPin className="w-4 h-4 text-amber-brand/50 shrink-0" />
                Above Dr. Batra&apos;s Clinic, near Mittal Nursing Home, 8 Marla, Model Town, Sonipat, Haryana 131001
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <Phone className="w-4 h-4 text-amber-brand/50" />
                +91-79882-27240
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Schema: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
