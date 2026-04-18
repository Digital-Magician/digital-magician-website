"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

const speedMap = { slow: "40s", normal: "28s", fast: "18s" };

export default function Marquee({
  children,
  reverse = false,
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{
          animationDuration: speedMap[speed],
          ...(pauseOnHover ? {} : {}),
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
