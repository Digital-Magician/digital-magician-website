"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { getComingMonday } from "@/lib/date";

/**
 * Short-lived notice shown in the top bar alongside the next-batch line.
 * It stops showing by itself after `showUntil` (end of that day, IST), so an
 * out-of-date announcement cannot sit on the site. To retire it early, set
 * `text` to an empty string.
 */
const batchNotice = {
  text: "Please note: today's 9 PM batch will now begin tomorrow.",
  shortText: "Today's 9 PM batch begins tomorrow.",
  showUntil: "2026-09-28",
};

function noticeIsCurrent(): boolean {
  if (!batchNotice.text) return false;
  const todayInIndia = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  todayInIndia.setHours(0, 0, 0, 0);
  return new Date(`${batchNotice.showUntil}T00:00:00`) >= todayInIndia;
}

const navLinks = [
  { label: "Programs", href: "/programs", hasDropdown: true,
    items: [
      { label: "Full Stack Digital Marketing", href: "/programs/full-stack-digital-marketing", badge: "Most Popular" },
      { label: "Performance Marketing Mastery", href: "/programs/performance-marketing" },
      { label: "Google Ads Mastery", href: "/programs/google-ads-mastery" },
      { label: "Meta Ads Mastery", href: "/programs/meta-ads-mastery" },
      { label: "SEO Mastery", href: "/programs/seo-mastery" },
      { label: "Website Development", href: "/programs/website-development" },
    ],
  },
  { label: "Placement", href: "/placement", hasDropdown: false },
  { label: "Alumni", href: "/alumni", hasDropdown: false },
  { label: "About", href: "/about", hasDropdown: false },
  { label: "Blog", href: "/blog", hasDropdown: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [nextBatch, setNextBatch] = useState<{ long: string; short: string } | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNextBatch(getComingMonday());
  }, []);

  // Alternate the two headlines, fading between them. Runs on the client only,
  // so the server-rendered bar always carries the next-batch line.
  useEffect(() => {
    if (!noticeIsCurrent()) return;
    setShowNotice(true);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setNoticeVisible((current) => !current);
        setFading(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-midnight/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-amber-brand text-midnight py-2 text-center text-sm font-semibold font-heading">
        <span
          className={`transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
        >
          {!(showNotice && noticeVisible) && (
            <>
              <span className="hidden sm:inline">
                🎓 Next Batch Starting {nextBatch ? nextBatch.long : "Coming Monday"} — Only 4 Seats Left!
              </span>
              <span className="sm:hidden">
                Next Batch: {nextBatch ? nextBatch.short : "Mon"} — 4 Seats Left!
              </span>
              <Link href="/free-demo" className="ml-3 underline underline-offset-2 hover:opacity-80">
                Book a Free Demo →
              </Link>
            </>
          )}
          {showNotice && noticeVisible && (
            <>
              <span className="hidden sm:inline">{batchNotice.text}</span>
              <span className="sm:hidden">{batchNotice.shortText}</span>
              <Link href="/batch-schedule" className="ml-3 underline underline-offset-2 hover:opacity-80">
                See the schedule →
              </Link>
            </>
          )}
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Digital Magician logo"
              width={36}
              height={40}
              priority
              className="h-9 w-auto group-hover:opacity-90 transition-opacity"
            />
            <div className="hidden sm:block">
              <span className="font-heading font-black text-white text-lg leading-none">Digital</span>
              <span className="font-heading font-black text-amber-brand text-lg leading-none"> Magician</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setProgramsOpen(true)}
                  onMouseLeave={() => setProgramsOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-white/80 hover:text-white text-sm font-medium font-body transition-colors duration-200">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {programsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 rounded-xl bg-midnight/95 backdrop-blur-md border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                      {link.items?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all duration-150 border-b border-white/5 last:border-0"
                        >
                          <span>{item.label}</span>
                          {"badge" in item && item.badge && (
                            <span className="text-xs bg-amber-brand text-midnight px-2 py-0.5 rounded-full font-bold font-heading">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium font-body transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/free-demo"
              className="text-sm font-heading font-semibold text-amber-brand hover:text-amber-400 transition-colors"
            >
              Free Demo Class
            </Link>
            <Link
              href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20know%20more%20about%20your%20digital%20marketing%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber px-5 py-2.5 rounded-lg text-sm font-heading font-bold"
            >
              Talk to a Mentor
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-midnight/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-white/80 hover:text-white font-medium text-sm rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
                {link.hasDropdown && link.items?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-2 text-white/60 hover:text-white text-sm rounded-lg hover:bg-white/5 transition-all"
                  >
                    — {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                href="/free-demo"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center btn-outline px-5 py-3 rounded-lg text-sm font-heading font-bold"
              >
                Free Demo Class
              </Link>
              <Link
                href="https://wa.me/917988227240?text=Hi%20Digital%20Magician!%20I%20want%20to%20know%20more%20about%20your%20digital%20marketing%20courses."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center btn-amber px-5 py-3 rounded-lg text-sm font-heading font-bold"
              >
                Talk to a Mentor on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
