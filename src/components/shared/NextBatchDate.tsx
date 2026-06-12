"use client";

import { useEffect, useState } from "react";
import { getComingMonday } from "@/lib/date";

// Renders the coming Monday's date (computed client-side to stay current and
// avoid SSR/hydration mismatch). Falls back to a neutral label until mounted.
export default function NextBatchDate({
  format = "long",
  fallback = "Coming Monday",
}: {
  format?: "long" | "short";
  fallback?: string;
}) {
  const [date, setDate] = useState<{ long: string; short: string } | null>(null);

  useEffect(() => {
    setDate(getComingMonday());
  }, []);

  if (!date) return <>{fallback}</>;
  return <>{format === "short" ? date.short : date.long}</>;
}
