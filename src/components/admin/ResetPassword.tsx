"use client";

import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";

export default function ResetPassword({ userId }: { userId: number }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ email: string; password: string } | null>(null);
  const [error, setError] = useState("");

  async function reset() {
    if (!confirm("Issue a new temporary password? The student will be signed out everywhere.")) return;
    setBusy(true);
    setError("");

    const response = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setError(data.error ?? "Could not reset the password.");
      return;
    }
    setResult({ email: data.email, password: data.password });
  }

  if (result) {
    return (
      <span className="text-amber-brand font-heading font-semibold text-xs">
        New password: <span className="tracking-wide">{result.password}</span>
      </span>
    );
  }

  return (
    <>
      <button type="button" onClick={reset} disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-white/60 font-heading font-semibold text-xs hover:border-amber-brand/40 hover:text-amber-brand transition-colors">
        {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
        Reset password
      </button>
      {error && <span className="text-red-300 font-body text-xs ml-2">{error}</span>}
    </>
  );
}
