import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

// Auto-generated branded social/OG image, one per post.
export const alt = "Digital Magician — Digital Marketing Institute, Sonipat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Embed the gold DM logo once (read at build, inlined as data URI).
const logoSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logo.png")
).toString("base64")}`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Digital Marketing Guides";
  const category = post?.category ?? "Digital Marketing";
  const author = post?.author ?? "Gaurav Malik";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0b0a1f 0%, #09071c 55%, #140b05 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* amber glow accent */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "rgba(245,158,11,0.18)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={62} height={62} style={{ borderRadius: 12 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#F59E0B", fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
              Digital Magician
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 19 }}>
              Digital Marketing Institute · Sonipat, Haryana
            </span>
          </div>
        </div>

        {/* Category + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex" }}>
            <span
              style={{
                color: "#F59E0B",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.32)",
                borderRadius: 9999,
                padding: "8px 24px",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {category}
            </span>
          </div>
          <div
            style={{
              color: "white",
              fontSize: title.length > 70 ? 52 : 62,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1,
              maxWidth: 1010,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 24 }}>
            digitalmagician.in/blog
          </span>
          <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 22 }}>
            {author} · 100% Placement Guarantee
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
