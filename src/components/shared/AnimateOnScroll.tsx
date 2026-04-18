"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "reveal" | "reveal-left" | "reveal-right" | "reveal-scale";
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  type = "reveal",
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${type} ${delay > 0 ? `delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}
