import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Contact Us — Sonipat",
  description:
    "Reach Digital Magician in Sonipat. Call, WhatsApp, or visit us. We respond to every inquiry within 2 hours — no bots, no call centres.",
};

const contactMethods = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp (Fastest)",
    value: "+91 79882 27240",
    sub: "Reply in under 30 minutes",
    href: "https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20about%20the%20digital%20marketing%20course%20at%20Digital%20Magician.",
    cta: "Chat Now",
    highlight: true,
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    value: "+91 79882 27240",
    sub: "Mon – Sat, 9 AM to 8 PM",
    href: "tel:+917988227240",
    cta: "Call Now",
    highlight: false,
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "hello@digitalmagician.in",
    sub: "We reply within 2 hours",
    href: "mailto:hello@digitalmagician.in",
    cta: "Send Email",
    highlight: false,
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    value: "Sonipat, Haryana",
    sub: "Share location on WhatsApp for directions",
    href: "https://wa.me/917988227240?text=Hi!%20Can%20you%20share%20the%20exact%20address%20for%20Digital%20Magician%3F",
    cta: "Get Directions",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How quickly will you respond?",
    a: "WhatsApp messages are replied to in under 30 minutes during business hours. Email within 2 hours. We don't use bots or virtual assistants — you speak directly with someone from the team.",
  },
  {
    q: "Can I visit the institute before enrolling?",
    a: "Absolutely. We encourage it. Visit us any weekday between 10 AM and 6 PM. You'll see the classroom, meet Gaurav if available, and get a full walkthrough of the program — no pressure, no sales script.",
  },
  {
    q: "I'm not from Sonipat. Can I still attend?",
    a: "Yes. We have students from Panipat, Delhi, Rohtak, Karnal, and beyond. Our online mode offers the identical live class experience — same Gaurav, same curriculum, same Q&A. Many students do hybrid.",
  },
  {
    q: "What if I have questions after enrolling?",
    a: "Students get direct access to Gaurav via our private WhatsApp group. Post-class doubts are resolved within 24 hours. We also schedule one-on-one sessions for complex questions.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#09071c]" />
        <div className="absolute inset-0 z-[1] pattern-dots opacity-20" />
        <div className="orb orb-amber w-[400px] h-[400px] -top-20 -right-20 opacity-25 z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-item hero-item-1 inline-flex items-center gap-2 glass-amber rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
            <span className="text-amber-brand text-sm font-heading font-bold tracking-wide">We reply in under 30 minutes</span>
          </div>
          <h1 className="hero-item hero-item-2 heading-xl text-5xl sm:text-6xl text-white mb-5">
            No Bots. No Call Centres.<br />
            <em className="not-italic text-gradient-amber">Just Real People.</em>
          </h1>
          <p className="hero-item hero-item-3 text-white/60 text-lg max-w-xl mx-auto font-body">
            Every message goes directly to someone on the Digital Magician team.
            Pick the method that works best for you.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ─────────────────────────────────────────── */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((method, i) => (
              <AnimateOnScroll key={method.title} delay={i * 80}>
                <div className={`bento p-6 h-full flex flex-col ${method.highlight ? "border-amber-brand/30 bg-amber-brand/[0.04]" : ""}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${method.highlight ? "bg-amber-brand/20 border border-amber-brand/40 text-amber-brand" : "bg-white/5 border border-white/10 text-white/60"}`}>
                    {method.icon}
                  </div>
                  <div className="text-white/40 text-xs font-heading font-bold tracking-widest uppercase mb-1">{method.title}</div>
                  <div className={`font-heading font-bold text-base mb-1 ${method.highlight ? "text-amber-brand" : "text-white"}`}>{method.value}</div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-body mb-6">
                    <Clock className="w-3 h-3" />
                    {method.sub}
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`inline-flex items-center gap-2 text-sm font-heading font-semibold transition-all group ${method.highlight ? "text-amber-brand hover:gap-3" : "text-white/50 hover:text-amber-brand hover:gap-3"}`}
                    >
                      {method.cta}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Office Info + Map ──────────────────────────────────────── */}
      <section className="py-24 bg-[#07051a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <AnimateOnScroll type="reveal-left">
              <div>
                <span className="tag mb-4 inline-block">Find Us</span>
                <h2 className="heading-lg text-4xl text-white mb-8 mt-4">
                  Come Say <span className="text-gradient-amber">Hello</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-amber-brand" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white mb-1">Address</div>
                      <div className="text-white/55 font-body text-sm leading-relaxed">
                        Digital Magician Institute<br />
                        Sonipat, Haryana — 131001
                      </div>
                      <Link
                        href="https://wa.me/917988227240?text=Hi!%20Can%20you%20share%20the%20exact%20address%20for%20Digital%20Magician%3F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-brand text-xs font-heading font-semibold mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Get exact directions on WhatsApp <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-amber-brand" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white mb-1">Office Hours</div>
                      <div className="text-white/55 font-body text-sm leading-relaxed">
                        Monday – Saturday: 9 AM – 8 PM<br />
                        Sunday: Closed (WhatsApp open)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-amber-brand" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white mb-1">Class Timings</div>
                      <div className="text-white/55 font-body text-sm leading-relaxed">
                        Mon / Wed / Fri: 7 PM – 9 PM<br />
                        Weekend batches available on request
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* WhatsApp CTA Card */}
            <AnimateOnScroll type="reveal-right">
              <div className="glass-amber rounded-3xl p-8 sm:p-10">
                <div className="text-4xl mb-5">💬</div>
                <h3 className="font-heading font-bold text-white text-2xl mb-3">
                  The Fastest Way to Reach Us
                </h3>
                <p className="text-white/60 font-body text-sm mb-6 leading-relaxed">
                  Skip the form. Just WhatsApp Gaurav directly. Get answers about fees, batches,
                  placement, and the curriculum in a real conversation — not a PDF.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Response in under 30 minutes",
                    "Talk directly to Gaurav or his team",
                    "No automated replies",
                    "Free 30-min counselling call included",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-white/70 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="https://wa.me/917988227240?text=Hi%20Gaurav!%20I%20want%20to%20know%20about%20the%20digital%20marketing%20course%20at%20Digital%20Magician."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center px-6 py-4 text-base gap-2 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Gaurav Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Quick FAQs ────────────────────────────────────────────── */}
      <section className="py-24 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="heading-lg text-4xl text-white">
              Common <span className="text-gradient-amber">Questions</span>
            </h2>
          </AnimateOnScroll>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 80}>
                <details className="group bento p-0 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-heading font-semibold text-white text-sm">{faq.q}</span>
                    <svg className="w-4 h-4 text-amber-brand flex-shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-white/55 text-sm font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
