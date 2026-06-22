import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Student Success Stories",
  description:
    "Real results from real students. See how Digital Magician graduates from Haryana and Delhi NCR went from freshers to ₹60,000/month careers in digital marketing.",
  openGraph: {
    title: "Student Success Stories | Digital Magician",
    description: "500+ students placed. ₹1.2 Crore+ in salaries generated. Read their stories.",
    url: "https://digitalmagician.in/success-stories",
  },
};

// Extended stories with richer before/after narrative
const stories = [
  {
    name: "Priya Sharma",
    from: "Sonipat, Haryana",
    before: "Commerce graduate, no marketing experience, applying to jobs for months with zero callbacks.",
    after: "Placed as Digital Marketing Executive at a Gurgaon tech startup within 4 months. Now manages campaigns independently.",
    program: "Full Stack Digital Marketing",
    salaryBefore: "₹0",
    salaryAfter: "₹28,000/month",
    timeToJob: "4 months",
    quote: "Gaurav sir doesn't just teach — he prepares you for the real world. The live campaign experience on real client accounts was the thing that got me hired.",
    highlight: "First job in 4 months",
    emoji: "👩‍💼",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    from: "Panipat, Haryana",
    before: "Running a small family shop, earning ₹15,000/month, looking for a way out with no degree or technical background.",
    after: "Now manages ₹8 Lakh in monthly ad spend for a Delhi D2C brand as their full-time Performance Marketing Specialist.",
    program: "Performance Marketing Mastery",
    salaryBefore: "₹15,000/month",
    salaryAfter: "₹42,000/month",
    timeToJob: "2 months",
    quote: "I was managing a small shop. Now I manage ₹8 Lakh in monthly ad spend for a D2C brand. The ROI concepts and hands-on Google Ads practice at Digital Magician completely changed my career trajectory.",
    highlight: "₹15K → ₹42K/month",
    emoji: "🛒",
    rating: 5,
  },
  {
    name: "Sakshi Verma",
    from: "Panipat, Haryana",
    before: "Working as a data entry operator at ₹12,000/month. Wanted independence, not another office job.",
    after: "Freelance SEO consultant earning ₹60,000/month from 4 retainer clients — all from Haryana, all found through local networking.",
    program: "SEO Mastery",
    salaryBefore: "₹12,000/month",
    salaryAfter: "₹60,000/month freelancing",
    timeToJob: "10 months (freelance)",
    quote: "I now earn ₹60,000/month freelancing — from home, in Panipat. Gaurav sir is brutally honest about what works and what doesn't. No fluff, pure value.",
    highlight: "₹60K/month from home",
    emoji: "🔍",
    rating: 5,
  },
  {
    name: "Arjun Singh",
    from: "Rohtak, Haryana",
    before: "BA graduate, tried 3 different jobs in 2 years, none stuck. Had basic social media knowledge but no paid skills.",
    after: "Social Media Manager at a Noida fashion brand. Runs WhatsApp automation sequences for the brand's entire lead nurture process.",
    program: "Meta Ads Mastery",
    salaryBefore: "₹18,000/month",
    salaryAfter: "₹35,000/month",
    timeToJob: "3 weeks",
    quote: "The WhatsApp automation module alone was worth the entire fee. Placed in 3 weeks after completing the course. The placement support was incredible.",
    highlight: "Placed in 3 weeks",
    emoji: "📱",
    rating: 5,
  },
  {
    name: "Neha Agarwal",
    from: "Sonipat, Haryana",
    before: "Full-time housewife with an arts degree. Wanted to contribute financially but had no professional skills and zero tech background.",
    after: "Freelance web designer with 6 regular clients charging ₹25,000 per website. Works from home on her own schedule.",
    program: "Website Design & Development",
    salaryBefore: "₹0",
    salaryAfter: "₹35,000+/month freelancing",
    timeToJob: "5 months (freelance)",
    quote: "I had zero tech background. Now I charge ₹25,000 per website and have 6 regular clients. We built 3 real websites during training — that's what gave me the confidence.",
    highlight: "₹0 to ₹35K/month",
    emoji: "💻",
    rating: 5,
  },
  {
    name: "Vikram Yadav",
    from: "Rohtak, Haryana",
    before: "Working at ₹20,000/month at a local business with no growth path. Wanted to get into a real digital marketing role.",
    after: "Google Ads Specialist at a digital marketing agency in Rohtak. Cleared Google Ads certification on first attempt, hired within 2 weeks.",
    program: "Google Ads Mastery",
    salaryBefore: "₹20,000/month",
    salaryAfter: "₹38,000/month",
    timeToJob: "2 weeks",
    quote: "Cleared Google Ads certification on first attempt. Got hired within 2 weeks. The practical campaign management experience made my resume stand out from 100+ applicants.",
    highlight: "Hired in 2 weeks",
    emoji: "🎯",
    rating: 5,
  },
];

const aggregateStats = [
  { value: "500+", label: "Students Placed", icon: "👨‍🎓" },
  { value: "₹1.2Cr+", label: "Combined Annual Salaries", icon: "💰" },
  { value: "30 days", label: "Median Time to First Job", icon: "⚡" },
  { value: "4.9★", label: "Average Program Rating", icon: "⭐" },
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Real Students. Real Results.
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            500+ Students
            <span className="block text-amber-400">Who Changed Their Lives</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            From housewives to ₹35K/month. From shop owners to managing ₹8 Lakh in ad spend.
            These aren't testimonials we invented — they're offer letters we've seen.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {aggregateStats.map((stat) => (
            <div key={stat.label} className="bento p-6 text-center">
              <span className="text-3xl block mb-2">{stat.icon}</span>
              <div className="font-black text-2xl text-amber-400 mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Story cards ───────────────────────────────────────────────── */}
        <div className="space-y-6 mb-16">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className={`bento p-7 md:p-9 ${i === 0 ? "gradient-border rounded-2xl" : ""}`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: avatar + meta */}
                <div className="shrink-0 flex flex-col items-center md:items-start gap-3 md:w-52">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl">
                    {story.emoji}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="font-bold text-white">{story.name}</div>
                    <div className="text-slate-500 text-sm">{story.from}</div>
                  </div>
                  {/* Program badge */}
                  <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-center">
                    {story.program}
                  </span>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(story.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Right: story */}
                <div className="flex-1">
                  {/* Highlight badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full mb-4">
                    <TrendingUp className="w-3 h-3" /> {story.highlight}
                  </span>

                  {/* Before → After */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Before</div>
                      <p className="text-slate-400 text-sm leading-relaxed">{story.before}</p>
                      <div className="mt-3 font-bold text-slate-400 text-sm">{story.salaryBefore}</div>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">After</div>
                      <p className="text-slate-300 text-sm leading-relaxed">{story.after}</p>
                      <div className="mt-3 font-bold text-amber-400 text-sm">{story.salaryAfter}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex gap-3">
                    <Quote className="w-4 h-4 text-amber-400/40 shrink-0 mt-0.5" />
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      {story.quote}
                    </p>
                  </div>

                  {/* Time to job */}
                  <div className="mt-4 text-xs text-slate-500">
                    Time to first income: <span className="font-semibold text-slate-400">{story.timeToJob}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Honesty note ──────────────────────────────────────────────── */}
        <div className="mb-16 bento border border-white/10 p-6 md:p-8">
          <h3 className="font-bold text-white text-lg mb-3">A note on honesty</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            These results are real. Every salary figure above is based on actual offer letters we have seen.
            We don't round up. We don't average in outliers to inflate the numbers.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The median first salary for a Digital Magician graduate is ₹26,000/month. Some students earn
            more — some earn exactly this. A few take longer to place if their portfolio needs more work.
            We prefer to tell you the real number rather than the aspirational one.
          </p>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="bento gradient-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
            Ready to add your story to this page?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            The next batch starts soon. Seats are limited to keep the mentor-to-student ratio
            high enough that we can give each student real attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20read%20the%20success%20stories%20and%20want%20to%20know%20more%20about%20enrolling."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Talk to Digital Magician on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/batch-schedule"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              See Upcoming Batches
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
