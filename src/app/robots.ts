import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private areas: the enrollment link is shared by the team, and the
        // portal and admin sections are behind a login.
        disallow: ["/api/", "/enroll", "/portal", "/admin"],
      },
    ],
    sitemap: "https://digitalmagician.in/sitemap.xml",
  };
}
