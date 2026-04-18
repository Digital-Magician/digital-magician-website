import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  redirects: async () => [
    // WordPress → Next.js 301 redirects
    { source: "/about-us",                               destination: "/about",                          permanent: true },
    { source: "/contact-us",                             destination: "/contact",                        permanent: true },
    { source: "/courses/web-designing-developement-mastery", destination: "/programs/website-development", permanent: true },
    { source: "/courses/google-ads-program",             destination: "/programs/google-ads-mastery",    permanent: true },
    { source: "/courses/facebook-marketing-program",     destination: "/programs/meta-ads-mastery",      permanent: true },
    { source: "/courses/search-engine-mastery-program",  destination: "/programs/seo-mastery",           permanent: true },
    { source: "/courses/performance-marketing-program",  destination: "/programs/performance-marketing", permanent: true },
    { source: "/digital-marketing-institutes-in-sonipat/", destination: "/blog/top-digital-marketing-institutes-sonipat-2026", permanent: true },
  ],
};

export default nextConfig;
