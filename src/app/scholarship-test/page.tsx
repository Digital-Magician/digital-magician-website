import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Award, Zap, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scholarship Test — 50% Fee Waiver",
  description:
    "Take Digital Magician's free scholarship test at our Sonipat centre and win up to 50% fee waiver. 30 questions, 30 minutes, results on the spot.",
  openGraph: {
    title: "Scholarship Test — Win 50% Off | Digital Magician",
    description: "Visit our Sonipat centre, answer 30 questions in 30 minutes, and score 70%+ to claim a 50% fee waiver.",
    url: "https://digitalmagician.in/scholarship-test",
  },
};

const slabs = [
  { score: "90–100%", award: "50% Fee Waiver", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { score: "80–89%", award: "35% Fee Waiver", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  { score: "70–79%", award: "20% Fee Waiver", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  { score: "Below 70%", award: "No Waiver (attempt again in 7 days)", color: "text-slate-400", bg: "bg-white/5 border-white/10" },
];

const topics = [
  { area: "Digital Marketing Basics", questions: 8, desc: "What is digital marketing, marketing funnel, consumer behaviour" },
  { area: "Search & SEO Concepts", questions: 7, desc: "How Google works, keywords, organic vs paid results" },
  { area: "Social Media & Ads", questions: 7, desc: "Facebook, Instagram, ad formats, targeting basics" },
  { area: "Analytics & Data", questions: 5, desc: "Metrics that matter: CTR, CPA, ROAS, bounce rate" },
  { area: "AI & Marketing Tools", questions: 3, desc: "ChatGPT, Canva AI, and current marketing technology" },
];

const faqs = [
  { q: "Can I take the scholarship test online?", a: "No. The test is taken in person at our Model Town centre in Sonipat. We do not share a test link, because taking it here is what keeps the scholarship fair for everyone. Message us on WhatsApp and we will book you a slot." },
  { q: "Is the scholarship test really free?", a: "Yes, 100% free. No registration fee, nothing to pay to attempt it. All it costs you is 30 minutes and a visit to our Sonipat centre." },
  { q: "Where do I take the test?", a: "At our office above Dr. Batra's Clinic, near Mittal Nursing Home, 8 Marla, Model Town, Sonipat, Haryana 131001. Book a slot on WhatsApp first so a seat and a system are free when you arrive." },
  { q: "How many times can I attempt the test?", a: "Once per 7-day period. If you score below 70%, you can retake it after 7 days. Your best score is used." },
  { q: "Is the waiver applicable to all programs?", a: "Yes — all 6 programs at Digital Magician. Full Stack, Performance Marketing, Google Ads, Meta Ads, SEO Mastery, and Web Development." },
  { q: "Do I need to know digital marketing to attempt?", a: "No. The test is designed for aspiring students, not professionals. Basic awareness of the internet and marketing is enough to attempt." },
  { q: "How do I claim the waiver after passing?", a: "We record your score against your name the same day you take the test. When you enrol, the waiver is already applied to your fee. Nothing for you to keep track of." },
  { q: "Can I combine the scholarship with EMI?", a: "Yes. The fee waiver applies to the total fee, and you can pay the reduced amount in 3 EMIs." },
];

export default function ScholarshipTestPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Limited Seats Per Batch
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Score High.
            <span className="block text-amber-400">Save Up to 50%.</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Take our free 30-question scholarship test at the Sonipat centre and earn a fee waiver on any
            Digital Magician program. Takes 30 minutes, and you get your result before you leave.
          </p>

          {/* Quick stats */}
          <div className="hero-item hero-item-4 flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" /> 30 minutes</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> 30 questions</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Taken at our centre</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400" /> Free to attempt</span>
          </div>

          {/* CTA */}
          <div className="hero-item hero-item-5 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20book%20a%20slot%20for%20the%20scholarship%20test%20at%20your%20Sonipat%20centre."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Book Your Test Slot
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              View Programs First
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── Scholarship slabs ─────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">
            Scholarship Slabs
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {slabs.map((slab) => (
              <div key={slab.score} className={`bento border p-6 flex items-center gap-5 ${slab.bg}`}>
                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Award className={`w-6 h-6 ${slab.color}`} />
                </div>
                <div>
                  <div className={`font-black text-xl ${slab.color}`}>{slab.award}</div>
                  <div className="text-slate-400 text-sm mt-0.5">Score: {slab.score}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            Waivers apply to the full program fee across all 6 programs.
          </p>
        </div>

        {/* ── What's tested ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">
            What the Test Covers
          </h2>
          <div className="space-y-3">
            {topics.map((t, i) => (
              <div key={t.area} className="bento p-5 flex items-start gap-5">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center font-bold text-amber-400 text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-sm">{t.area}</span>
                    <span className="text-xs text-amber-400 font-semibold">{t.questions} questions</span>
                  </div>
                  <p className="text-slate-400 text-sm">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bento border border-amber-500/20 bg-amber-500/5 p-5 mt-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="font-semibold text-amber-400">No prior knowledge required.</span> The test is designed for aspiring students.
              If you can browse the internet and have basic awareness of brands advertising online, you have everything you need to attempt it.
            </p>
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Book your slot", desc: "Message us on WhatsApp and we will fix a time for you to come in." },
              { step: "02", title: "Visit the centre", desc: "Come to our Model Town office in Sonipat and take the test there. 30 questions, 30 minutes." },
              { step: "03", title: "Get your score", desc: "We check it while you wait and tell you your waiver before you leave." },
              { step: "04", title: "Claim your waiver", desc: "The waiver is recorded against your name and applied when you enrol." },
            ].map((s) => (
              <div key={s.step} className="bento p-6 text-center">
                <div className="text-3xl font-black text-amber-400/30 mb-3">{s.step}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="bento overflow-hidden group">
                <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4">
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                  <span className="text-amber-400 text-lg font-bold shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-5 pt-1">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <div className="bento gradient-border rounded-2xl p-8 md:p-10 text-center">
          <span className="text-4xl block mb-4">🎓</span>
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
            Ready to save up to ₹22,500?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            A 50% waiver on our Full Stack program saves you ₹22,500. The test takes 30 minutes at our
            Sonipat centre, and you can see a class while you are here.
          </p>
          <a
            href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20book%20a%20slot%20for%20the%20scholarship%20test%20at%20your%20Sonipat%20centre."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Book My Test Slot
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
