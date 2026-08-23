import type { Metadata } from "next";
import { pageTitle } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Award, Users, TrendingUp, Target, CheckCircle, Star, MapPin } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CountUp from "@/components/shared/CountUp";

export const metadata: Metadata = {
  title: { absolute: pageTitle("About Us: AI Marketing Institute in Sonipat, India") },
  description:
    "Meet the team behind Digital Magician, Sonipat's AI and digital marketing institute. 500+ students trained, founded by a practitioner who built two agencies.",
};

const timeline = [
  {
    year: "2017",
    title: "Started from the back row of a lecture hall",
    desc: "Third year of college. While classmates were studying for exams, Gaurav was running his first freelance campaigns. A local business paid him Rs 3,000 to manage their Facebook page. That one project changed everything.",
  },
  {
    year: "2017",
    title: "First real client. Still in college.",
    desc: "Word spread. By the end of third year, he had 4 paying clients and was earning more from freelancing than most fresh graduates earned in a job. The classroom could not keep up with what he was learning on live accounts.",
  },
  {
    year: "2019",
    title: "Placed before graduation",
    desc: "Final semester. While his peers were sending out CVs, Gaurav was already joining an IT company as a Digital Marketing Executive. He had a portfolio of real campaigns and real results. The job interview was practically a formality.",
  },
  {
    year: "2020",
    title: "Promoted to Marketing Head",
    desc: "One year into the job, he was running the entire marketing function. Not because of seniority but because the results were undeniable. That experience of owning a full marketing strategy, not just executing tasks, shaped how he teaches today.",
  },
  {
    year: "2021",
    title: "Rs 60 Lacs funding. Rs 2.55 Crores in 14 months.",
    desc: "Got funded to build and sell a Legal Documentation Tool. Used every digital marketing strategy he had built over 4 years: performance campaigns, content funnels, WhatsApp automation, retargeting. Made a profit of Rs 2.55 Crores in 14 months. Not luck. System.",
  },
  {
    year: "2023",
    title: "Legal tech startup with Rs 5 Lacs MRR. Agency started.",
    desc: "Scaled the legal tech venture to Rs 5 Lacs monthly recurring revenue, then started 10x Profits, a performance marketing agency. Two businesses running simultaneously, both growing. The playbook was clear enough to teach.",
  },
  {
    year: "2024",
    title: "Scaled to Rs 10 Lacs MRR. Built Digital Magician.",
    desc: "The agency hit Rs 10 Lacs MRR. And every time Gaurav tried to hire, the same problem came up: candidates with certificates who had never run a real campaign. So Digital Magician was born to fix exactly that.",
  },
  {
    year: "2025",
    title: "Placement guarantee. Rs 20 Lacs MRR.",
    desc: "Rebuilt the curriculum around AI tools, introduced the 100% placement guarantee backed by a real refund policy, and scaled the legal tech startup to Rs 20 Lacs MRR. Digital Magician students started landing jobs in 18 days.",
  },
  {
    year: "2026",
    title: "AI Superkids. Full AI curriculum. Still growing.",
    desc: "Launched AI Superkids, a Gen AI course for the next generation. Updated the full Digital Magician curriculum with 60+ tools and the Dual Certification. Both the legal tech startup and 10x Profits are scaling. The mission: train 10,000 marketers across India.",
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Practitioner-First Teaching",
    desc: "Every module is built around how agencies and startups actually work. Not how textbooks describe them. If it does not work on a real campaign, it does not make it into the curriculum.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Real Skin in the Game",
    desc: "Our trainers manage active client campaigns with real budgets and real accountability. When they teach campaign strategy, it is because they ran that exact type of campaign last month.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Over Certificates",
    desc: "Our alumni network is 500+ working marketers sharing live campaigns, rate cards, and client referrals. The community you join at Digital Magician pays dividends long after you graduate.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Results or Refund",
    desc: "We only win when you win. The placement guarantee is a written commitment backed by a real refund policy. No fine print designed to trap you. If we do not deliver, we give your money back.",
  },
];

const teamHighlights = [
  { stat: "7+", label: "Years running live campaigns" },
  { stat: "Rs 1Cr+", label: "Annual ad spend managed" },
  { stat: "50+", label: "Active clients served" },
  { stat: "500+", label: "Students trained" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[500px] h-[500px] -top-20 -left-20 opacity-30 z-[2]" />
        <div className="orb orb-indigo w-[400px] h-[400px] top-0 -right-20 opacity-35 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">Sonipat, Haryana. Teaching India.</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Built by Someone Who Did It First,<br className="hidden sm:block" />
            <em className="not-italic text-gradient-amber"> Then Decided to Teach It</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Not from a textbook. Not from YouTube tutorials recorded in 2019. From live campaigns,
            real budgets, and a founder who built two agencies and a Rs 20 Lacs MRR startup before starting Digital Magician.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
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

      {/* Founder Story */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll type="reveal-left">
              <div>
                <span className="tag mb-4 inline-block">The Founder</span>
                <h2 className="heading-lg text-3xl sm:text-4xl lg:text-5xl text-white mb-6 mt-4">
                  Gaurav Malik<br />
                  <span className="text-gradient-amber">From Job to Startup</span>
                </h2>
                <div className="space-y-5 text-white/65 font-body text-base leading-relaxed">
                  <p>
                    Gaurav did not start Digital Magician to build a training business. He started it
                    because he was hiring and every candidate who walked in with a digital marketing
                    certificate could not set up a Meta Pixel, could not interpret a GA4 report, and
                    had never actually managed a live campaign.
                  </p>
                  <p>
                    By the time he started teaching, he had already built two performance marketing
                    agencies: 10x Estates and 10x Admissions. He had taken a Rs 60 Lacs funded startup
                    to Rs 2.55 Crores in profit in 14 months using the exact strategies he now teaches.
                    He had scaled a legal tech venture to Rs 20 Lacs MRR.
                  </p>
                  <p className="text-white/80 font-semibold">
                    Digital Magician is not a training company that also runs an agency. It is a practitioner
                    who built real businesses, then decided the best way to give back was to share exactly
                    what worked.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="https://wa.me/917988227240?text=Hi!%20I%20want%20to%20know%20more%20about%20Digital%20Magician."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 text-sm gap-2 group"
                  >
                    Talk to Digital Magician
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll type="reveal-right">
              <div className="gradient-border rounded-3xl p-8 bg-carbon/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center">
                    <span className="text-2xl font-heading font-black text-amber-brand">G</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-lg">Gaurav Malik</div>
                    <div className="text-amber-brand text-sm font-body">Founder, Digital Magician</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "7+ years running live digital campaigns",
                    "Rs 1 Crore+ annual ad spend managed",
                    "Google Ads and Meta certified",
                    "50+ brands served across India",
                    "Co-Founder, 10x Estates and 10x Admissions",
                    "Trainer to 500+ working marketers",
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
                    <span className="text-white/50 text-xs ml-2 font-body">4.9, 115+ Google reviews</span>
                  </div>
                  <p className="text-white/50 text-xs font-body italic">
                    &ldquo;The trainer showed us his actual client dashboard during class. I have never seen that in any other course.&rdquo;
                    <span className="text-amber-brand not-italic ml-1">— Priya S., Gurgaon</span>
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <span className="tag mb-4">How We Think</span>
            <h2 className="heading-lg text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
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

      {/* Timeline */}
      <section className="py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-16">
            <span className="tag mb-4">The Story</span>
            <h2 className="heading-lg text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              From Job to <span className="text-gradient-amber">Startup</span>
            </h2>
            <p className="text-white/55 font-body mt-4 max-w-xl mx-auto">
              Nine years. Two agencies. One funded startup. One institute. Here is how it actually happened.
            </p>
          </AnimateOnScroll>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-brand/40 via-amber-brand/20 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimateOnScroll key={`${item.year}-${i}`} delay={i * 60}>
                  <div className="sm:pl-16 relative">
                    <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-midnight border-2 border-amber-brand/40 items-center justify-center">
                      <span className="text-amber-brand font-heading font-black text-xs">{item.year.slice(2)}</span>
                    </div>
                    <div className="bento p-6">
                      <div className="inline-flex items-center gap-2 glass-amber rounded-full px-3 py-1 mb-3">
                        <span className="text-amber-brand text-xs font-heading font-bold">{item.year}</span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-base sm:text-lg mb-2">{item.title}</h3>
                      <p className="text-white/55 text-sm font-body leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <div className="glass-amber rounded-3xl p-8 sm:p-14">
              <div className="text-4xl mb-5">🎯</div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                Ready to Learn From People<br />
                <span className="text-gradient-amber">Who Are Still in the Game?</span>
              </h2>
              <p className="text-white/60 font-body mb-3 max-w-xl mx-auto">
                Book a free 30-minute call. No sales pitch. Just an honest conversation about
                where you want to go and whether Digital Magician is the right path to get there.
              </p>
              <p className="text-white/40 text-xs font-body mb-8">
                Above Dr. Batra&apos;s Clinic, near Mittal Nursing Home, 8 Marla, Model Town, Sonipat, Haryana 131001
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/917988227240?text=Hi!%20I%20want%20to%20know%20more%20about%20Digital%20Magician."
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
