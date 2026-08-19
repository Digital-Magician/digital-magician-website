"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Compressed clips (≤5MB each) served from /public with a 1-year immutable
// cache header (see next.config.ts). Set NEXT_PUBLIC_TESTIMONIALS_BASE to an
// external origin (e.g. a Cloudflare R2 public URL) to serve them from there
// instead — no code change needed.
const VIDEO_BASE = process.env.NEXT_PUBLIC_TESTIMONIALS_BASE?.replace(/\/$/, "") || "/testimonials";
const VIDEOS = Array.from({ length: 9 }, (_, i) => `${VIDEO_BASE}/testimonial-${i + 1}.mp4`);

function VideoCard({
  src,
  idx,
  active,
  setActive,
  canHover,
}: {
  src: string;
  idx: number;
  active: number | null;
  setActive: (v: number | null | ((p: number | null) => number | null)) => void;
  canHover: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isActive = active === idx;

  // Play only while on-screen (saves CPU/bandwidth across many clips).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Sound follows the active card; everything else stays muted.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = !isActive;
    if (isActive) {
      v.volume = 1;
      v.play().catch(() => {});
    }
  }, [isActive]);

  // Desktop: hover to unmute. Touch: tap to toggle.
  const handlers = canHover
    ? {
        onMouseEnter: () => setActive(idx),
        onMouseLeave: () => setActive((p) => (p === idx ? null : p)),
      }
    : {
        onClick: () => setActive((p) => (p === idx ? null : idx)),
      };

  return (
    <div
      {...handlers}
      className="group/v relative mr-3 sm:mr-4 shrink-0 w-[190px] sm:w-[230px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer hover:border-amber-brand/40 transition-colors"
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-center"
      />
      {/* state badge */}
      {isActive ? (
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-amber-brand/95 text-midnight px-3 py-1 text-[11px] font-heading font-bold">
          <Volume2 className="w-3.5 h-3.5" /> Playing
        </div>
      ) : (
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-3 py-1 text-white text-[11px] font-heading font-semibold">
          <VolumeX className="w-3.5 h-3.5" /> {canHover ? "Hover" : "Tap"} to unmute
        </div>
      )}
    </div>
  );
}

export default function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#07051a] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <span className="tag mb-4 inline-block">Student Testimonials</span>
        <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
          Hear It Straight From Our Students
        </h2>
        <p className="text-white/50 font-body mt-3 text-sm sm:text-base">
          Real results, in their own words. {canHover ? "Hover" : "Tap"} any clip to unmute and listen.
        </p>
      </div>

      {/* Scrolling video carousel (pauses while a clip is active / hovered) */}
      <div className="overflow-hidden">
        <div
          className="marquee-track"
          style={{
            animationDuration: "80s",
            animationPlayState: active !== null ? "paused" : undefined,
          }}
        >
          {VIDEOS.map((src, i) => (
            <VideoCard key={`a-${i}`} src={src} idx={i} active={active} setActive={setActive} canHover={canHover} />
          ))}
          {VIDEOS.map((src, i) => (
            <VideoCard key={`b-${i}`} src={src} idx={i + 9} active={active} setActive={setActive} canHover={canHover} />
          ))}
        </div>
      </div>
    </section>
  );
}
