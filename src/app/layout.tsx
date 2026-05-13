import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalmagician.in"),
  title: {
    default: "Digital Magician | #1 Digital Marketing Course in Sonipat — 100% Job Guarantee",
    template: "%s | Digital Magician",
  },
  description:
    "North India's most results-driven digital marketing institute. 127 students placed. 100% placement guarantee. Master Google Ads, SEO, Meta Ads & AI Tools. Online & offline — Sonipat campus serving Haryana & Delhi NCR.",
  keywords: [
    "digital marketing course Sonipat",
    "digital marketing institute Haryana",
    "digital marketing course Delhi NCR",
    "best digital marketing institute North India",
    "Google Ads course Sonipat",
    "SEO course Haryana",
    "performance marketing course",
    "digital marketing training Sonipat",
    "best digital marketing course Haryana",
    "digital marketing course Delhi",
    "online digital marketing course Haryana",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://digitalmagician.in",
    siteName: "Digital Magician",
    title: "Digital Magician | #1 Digital Marketing Course in Sonipat",
    description:
      "100% job placement guarantee. Master Google Ads, SEO, Meta Ads & AI Tools. Haryana's most trusted digital marketing institute.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Magician — Digital Marketing Institute Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Magician | #1 Digital Marketing Course in Sonipat",
    description: "100% job placement guarantee. Haryana's most trusted digital marketing institute.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Digital Magician",
  url: "https://digitalmagician.in",
  logo: "https://digitalmagician.in/logo.png",
  description: "North India's most results-driven digital marketing institute. 127+ students placed. 100% placement guarantee. Haryana & Delhi NCR.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Above Dr. Batra's Clinic, Near Mittal Nursing Home, 8 Marla, Model Town",
    addressLocality: "Sonipat",
    addressRegion: "Haryana",
    postalCode: "131001",
    addressCountry: "IN",
  },
  telephone: "+91-79882-27240",
  email: "Hello@digitalmagician.in",
  sameAs: [
    "https://www.instagram.com/digitalmagician.in",
    "https://www.facebook.com/digitalmagician.in",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "105",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-midnight text-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1031452278434941');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1031452278434941&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel */}
      </body>
    </html>
  );
}
