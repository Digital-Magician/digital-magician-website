"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function LessonComplete({
  lessonId,
  initial,
}: {
  lessonId: number;
  initial: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const next = !completed;
    setBusy(true);
    setCompleted(next);

    const response = await fetch("/api/portal/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, completed: next }),
    });

    setBusy(false);
    if (!response.ok) {
      setCompleted(!next); // put the tick back if the save failed
      return;
    }
    router.refresh();
  }

  return (
    <button type="button" onClick={toggle} disabled={busy}
      className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-heading font-semibold text-sm transition-colors ${
        completed
          ? "border-amber-brand/40 bg-amber-brand/10 text-amber-brand"
          : "border-white/15 text-white/70 hover:border-white/30"
      }`}>
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      {completed ? "Watched" : "Mark as watched"}
    </button>
  );
}
