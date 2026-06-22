import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Quote } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import Marquee from "@/components/shared/Marquee";

export const metadata: Metadata = {
  title: "Alumni Stories — 500+ Students. Real Salaries. Real Results.",
  description:
    "Meet Digital Magician alumni — working marketers earning ₹22,000 to ₹1,50,000 per month. Read their stories, learn from their journeys, and see where a real digital marketing education takes you.",
};

const alumni = [
  {
    name: "Priya Sharma",
    batch: "Full Stack Digital Marketing, 2024",
    before: "Fresher, BA Economics",
    after: "Performance Marketing Manager",
    company: "Digital Agency, Gurgaon",
    salary: "₹28,000/mo",
    timeToJob: "22 days",
    location: "Gurgaon",
    quote: "Every class felt like working at an actual agency — because we were. Gaurav had us inside real client dashboards from week two. That's why interviews felt easy.",
  },
  {
    name: "Rahul Kapoor",
    batch: "Google Ads Mastery, 2024",
    before: "Call centre agent, 2 years",
    after: "Google Ads Specialist",
    company: "E-commerce Brand, Delhi",
    salary: "₹32,000/mo",
    timeToJob: "18 days",
    location: "Delhi",
    quote: "I'd tried two other courses before this. Both gave me certificates. Neither got me a single interview. Digital Magician got me a job in 18 days.",
  },
  {
    name: "Sakshi Verma",
    batch: "SEO Mastery, 2023",
    before: "Content writer, ₹12,000/mo",
    after: "Freelance SEO Consultant",
    company: "Self-employed, Panipat",
    salary: "₹60,000/mo",
    timeToJob: "3 months to ₹60K",
    location: "Panipat",
    quote: "I didn't want a job — I wanted clients. Gaurav taught me how agencies pitch and price. Three months later I had 4 retainer clients and was earning more than any full-time offer I'd received.",
  },
  {
    name: "Amit Dubey",
    batch: "Performance Marketing, 2023",
    before: "Shop assistant, no marketing exp.",
    after: "Google Ads Manager",
    company: "Real Estate Firm, Sonipat",
    salary: "₹35,000/mo",
    timeToJob: "25 days",
    location: "Sonipat",
    quote: "I joined with zero background in anything digital. Gaurav started from scratch and never made me feel behind. The live campaign projects gave me real numbers to talk about in interviews.",
  },
  {
    name: "Neha Rawat",
    batch: "Full Stack Digital Marketing, 2024",
    before: "Homemaker, 3-year career gap",
    after: "Social Media Strategist",
    company: "D2C Brand, Noida",
    salary: "₹26,000/mo",
    timeToJob: "30 days",
    location: "Noida",
    quote: "Coming back to work after 3 years felt impossible. Gaurav's team helped me build a portfolio that made interviewers forget about the gap entirely. They were invested in my success.",
  },
  {
    name: "Vikram Mehra",
    batch: "Full Stack Digital Marketing, 2023",
    before: "BBA graduate, 6-month job gap",
    after: "Digital Marketing Lead",
    company: "SaaS Startup, Gurugram",
    salary: "₹45,000/mo",
    timeToJob: "28 days",
    location: "Gurugram",
    quote: "The AI modules were a game-changer. I walked into every interview knowing ChatGPT workflows, prompt engineering for ad copy, and AI-driven SEO — things no one else was doing.",
  },
  {
    name: "Pooja Singh",
    batch: "Meta Ads Mastery, 2024",
    before: "Retail store manager",
    after: "Meta Ads Specialist",
    company: "Fashion Brand, Delhi",
    salary: "₹30,000/mo",
    timeToJob: "21 days",
    location: "Delhi",
    quote: "The Meta Ads module is taught by someone who actually manages crores in ad spend. There's a difference between someone who read about ROAS and someone who's obsessed with it every single day.",
  },
  {
    name: "Deepak Rana",
    batch: "SEO Mastery, 2024",
    before: "Engineering dropout, freelancing gigs",
    after: "SEO Manager",
    company: "SaaS Company, Bengaluru (remote)",
    salary: "₹38,000/mo",
    timeToJob: "35 days",
    location: "Sonipat → Remote",
    quote: "Landed a remote job at a Bangalore startup while sitting in Sonipat. The technical SEO training was on par with what agencies teach in Delhi. No compromise because of location.",
  },
];

const quickStats = [
  { value: "500+", label: "Total alumni" },
  { value: "₹28K", label: "Average starting salary" },
  { value: "80%", label: "Placed within 30 days" },
  { value: "4.9★", label: "Average rating by alumni" },
];

export default function AlumniPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-indigo w-[500px] h-[500px] -top-20 -right-20 opacity-30 z-[2]" />
        <div className="orb orb-amber w-[300px] h-[300px] bottom-10 -left-10 opacity-25 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">500+ Working Marketers</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            These Are Not<br />
            <em className="not-italic text-gradient-amber">Success Stories. They&apos;re Careers.</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Every name below is a real person earning a real salary in digital marketing today.
            No stock photos. No fabricated quotes. No hypothetical outcomes.
          </p>
        </div>
      </section>

      {/* ── Quick Stats ───────────────────────────────────────────── */}
      <section className="py-12 bg-midnight border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {quickStats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 80}>
                <div>
                  <div className="stat-number text-4xl sm:text-5xl mb-1">{stat.value}</div>
                  <div className="text-white/45 text-xs font-body">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni Grid ───────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">Alumni Stories</span>
            <h2 className="heading-lg text-4xl sm:text-5xl text-white mt-4">
              From Zero to <span className="text-gradient-amber">Career in 30 Days</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {alumni.map((person, i) => (
              <AnimateOnScroll key={person.name} delay={(i % 3) * 100}>
                <div className="bento p-7 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center flex-shrink-0">
                        <span className="font-heading font-black text-amber-brand">{person.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-heading font-bold text-white text-sm">{person.name}</div>
                        <div className="text-white/40 text-xs font-body">{person.location}</div>
                      </div>
                    </div>
                    <span className="text-amber-brand font-heading font-bold text-base flex-shrink-0">{person.salary}</span>
                  </div>

                  {/* Before → After */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2">
                      <div className="text-white/30 text-[10px] font-heading font-bold tracking-widest uppercase mb-0.5">Before</div>
                      <div className="text-white/55 text-xs font-body">{person.before}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-brand flex-shrink-0" />
                    <div className="flex-1 bg-amber-brand/[0.06] border border-amber-brand/15 rounded-lg px-3 py-2">
                      <div className="text-amber-brand/60 text-[10px] font-heading font-bold tracking-widest uppercase mb-0.5">After</div>
                      <div className="text-white text-xs font-body font-semibold">{person.after}</div>
                    </div>
                  </div>

                  {/* Company & Time */}
                  <div className="flex items-center justify-between text-xs font-body text-white/40 mb-5">
                    <span>{person.company}</span>
                    <span className="text-amber-brand/70">{person.timeToJob}</span>
                  </div>

                  {/* Quote */}
                  <div className="mt-auto pt-5 border-t border-white/[0.06]">
                    <Quote className="w-4 h-4 text-amber-brand/40 mb-2" />
                    <p className="text-white/55 text-xs font-body leading-relaxed italic">{person.quote}</p>
                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-amber-brand fill-amber-brand" />
                      ))}
                    </div>
                  </div>

                  {/* Batch tag */}
                  <div className="mt-4 inline-flex items-center gap-1.5 glass-amber rounded-full px-3 py-1 self-start">
                    <span className="text-amber-brand text-[10px] font-heading font-bold">{person.batch}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scrolling quotes ──────────────────────────────────────── */}
      <section className="py-16 bg-[#07051a] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07051a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07051a] to-transparent z-10 pointer-events-none" />
        <p className="text-center text-white/25 text-[10px] font-heading font-bold tracking-[0.2em] uppercase mb-6">
          What Alumni Say
        </p>
        <Marquee speed="slow" reverse>
          {alumni.slice(0, 5).map((p) => (
            <div key={p.name} className="flex-shrink-0 mx-3 max-w-xs">
              <div className="glass rounded-2xl px-5 py-4">
                <p className="text-white/55 text-xs font-body italic leading-relaxed mb-3">&ldquo;{p.quote.slice(0, 90)}…&rdquo;</p>
                <div className="font-heading font-bold text-amber-brand text-xs">{p.name}</div>
                <div className="text-white/35 text-[10px] font-body">{p.after}</div>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🎓</div>
              <h2 className="heading-lg text-3xl sm:text-4xl text-white mb-4">
                Your Story Could Be<br />
                <span className="text-gradient-amber">On This Page Next</span>
              </h2>
              <p className="text-white/60 font-body mb-8 max-w-xl mx-auto">
                Join the next batch — only 4 seats remaining.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20enroll%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base gap-2 group w-full sm:w-auto justify-center"
                >
                  Secure Your Seat
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/batch-schedule" className="btn-ghost px-8 py-4 text-base gap-2 w-full sm:w-auto justify-center">
                  View Batch Dates
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
