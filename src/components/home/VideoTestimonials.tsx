"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEOS = Array.from({ length: 9 }, (_, i) => `/testimonials/testimonial-${i + 1}.mp4`);

function VideoCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Only play while on-screen (saves CPU/bandwidth with many videos).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else {
          v.pause();
          v.muted = true; // re-mute anything that scrolls away
        }
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const unmute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {});
  };
  const mute = () => {
    const v = ref.current;
    if (v) v.muted = true;
  };

  return (
    <div
      className="group/v relative mr-4 sm:mr-5 shrink-0 w-[280px] sm:w-[340px] aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-amber-brand/40 transition-colors"
      onMouseEnter={unmute}
      onMouseLeave={mute}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      {/* Muted state hint (hidden while hovering = unmuted) */}
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-white text-[11px] font-heading font-semibold group-hover/v:opacity-0 transition-opacity">
        <VolumeX className="w-3.5 h-3.5" /> Hover to unmute
      </div>
      {/* Unmuted indicator (shown on hover) */}
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-amber-brand/90 text-midnight px-2.5 py-1 text-[11px] font-heading font-bold opacity-0 group-hover/v:opacity-100 transition-opacity">
        <Volume2 className="w-3.5 h-3.5" /> Playing
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  return (
    <section className="py-16 sm:py-20 bg-[#07051a] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <span className="tag mb-4 inline-block">Student Testimonials</span>
        <h2 className="heading-lg text-3xl sm:text-4xl text-white mt-4">
          Hear It Straight From Our Students
        </h2>
        <p className="text-white/50 font-body mt-3 text-sm sm:text-base">
          Real results, in their own words. Hover any clip to unmute and listen.
        </p>
      </div>

      {/* Scrolling video carousel (pauses on hover) */}
      <div className="overflow-hidden" aria-label="Student video testimonials">
        <div className="marquee-track" style={{ animationDuration: "70s" }}>
          {VIDEOS.map((src, i) => (
            <VideoCard key={`a-${i}`} src={src} />
          ))}
          {VIDEOS.map((src, i) => (
            <VideoCard key={`b-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
