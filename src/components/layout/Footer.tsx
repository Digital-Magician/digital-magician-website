import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const footerLinks = {
  Programs: [
    { label: "Full Stack Digital Marketing", href: "/programs/full-stack-digital-marketing" },
    { label: "Performance Marketing", href: "/programs/performance-marketing" },
    { label: "Google Ads Mastery", href: "/programs/google-ads-mastery" },
    { label: "Meta Ads Mastery", href: "/programs/meta-ads-mastery" },
    { label: "SEO Mastery", href: "/programs/seo-mastery" },
    { label: "Website Development", href: "/programs/website-development" },
  ],
  Resources: [
    { label: "Free Demo Class", href: "/free-demo" },
    { label: "Scholarship Test", href: "/scholarship-test" },
    { label: "Batch Schedule", href: "/batch-schedule" },
    { label: "Blog", href: "/blog" },
    { label: "Free Resources", href: "/free-resources" },
    { label: "Write for Us", href: "/write-for-us" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Placement", href: "/placement" },
    { label: "Alumni Wall", href: "/alumni" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Hire From Us", href: "/hire-from-us" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const locationLinks = [
  { label: "Sonipat", href: "/digital-marketing-course/sonipat" },
  { label: "Panipat", href: "/digital-marketing-course/panipat" },
  { label: "Karnal", href: "/digital-marketing-course/karnal" },
  { label: "Rohtak", href: "/digital-marketing-course/rohtak" },
  { label: "Faridabad", href: "/digital-marketing-course/faridabad" },
  { label: "Gurugram", href: "/digital-marketing-course/gurugram" },
  { label: "Delhi", href: "/digital-marketing-course/delhi" },
  { label: "Hisar", href: "/digital-marketing-course/hisar" },
  { label: "Ambala", href: "/digital-marketing-course/ambala" },
  { label: "Kurukshetra", href: "/digital-marketing-course/kurukshetra" },
  { label: "South Delhi", href: "/digital-marketing-course/south-delhi" },
  { label: "North Delhi", href: "/digital-marketing-course/north-delhi" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080618] border-t border-white/8">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Digital Magician logo"
                width={40}
                height={44}
                className="h-10 w-auto"
              />
              <div>
                <span className="font-heading font-black text-white text-xl">Digital</span>
                <span className="font-heading font-black text-amber-brand text-xl"> Magician</span>
              </div>
            </Link>

            <p className="text-white/60 text-sm font-body leading-relaxed mb-6">
              Haryana&apos;s #1 digital marketing institute. We don&apos;t just teach — we transform careers with live campaigns, real clients, and a 100% placement guarantee.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+917988227240"
                className="flex items-center gap-3 text-white/70 hover:text-amber-brand transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-amber-brand flex-shrink-0" />
                +91-79882-27240
              </a>
              <a
                href="mailto:Hello@digitalmagician.in"
                className="flex items-center gap-3 text-white/70 hover:text-amber-brand transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-amber-brand flex-shrink-0" />
                Hello@digitalmagician.in
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                <span>Above Dr. Batra&apos;s Clinic, Model Town, Sonipat, Haryana — 131001</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com/digitalmagician.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Digital Magician on Instagram"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-amber-brand transition-colors"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/digitalmagician.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Digital Magician on Facebook"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-amber-brand transition-colors"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              {/* h2: footer columns are top-level page sections. Using h4 here
                  skipped a level on every page whose last heading was an h2. */}
              <h2 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">
                {category}
              </h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-amber-brand transition-colors text-sm font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Location Links */}
      <div className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/60 text-[10px] font-heading font-bold tracking-[0.2em] uppercase mb-4">
            Courses Available Across North India
          </p>
          <div className="flex flex-wrap gap-2">
            {locationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.05] text-white/60 text-xs font-body hover:border-amber-brand/25 hover:text-amber-brand/70 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/digital-marketing-course/all"
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-amber-brand/20 text-amber-brand/50 text-xs font-body hover:border-amber-brand/40 hover:text-amber-brand transition-all"
            >
              View all locations →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-body text-center sm:text-left">
              © {new Date().getFullYear()} Digital Magician. All rights reserved.
              North India&apos;s Most Results-Driven Digital Marketing Institute.
            </p>
            <div className="flex items-center gap-1 text-white/40 text-sm font-body">
              <span>Made with</span>
              <span className="text-amber-brand">♥</span>
              <span>in Sonipat, Haryana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
