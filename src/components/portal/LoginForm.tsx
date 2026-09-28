"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, LogIn } from "lucide-react";

export default function LoginForm({
  expect,
  redirectTo,
}: {
  expect: "student" | "admin";
  redirectTo: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, expect }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not sign you in.");
        setBusy(false);
        return;
      }
      router.replace(data.mustChangePassword ? "/portal/password" : redirectTo);
      router.refresh();
    } catch {
      setError("Network problem. Please try again.");
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-white font-body placeholder:text-white/30 focus:border-amber-brand/60 focus:outline-none focus:ring-2 focus:ring-amber-brand/20";

  return (
    <form onSubmit={submit} className="bento p-6 sm:p-8 space-y-5">
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 font-body text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" required className={field}
          value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="password" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          Password
        </label>
        <input id="password" type="password" autoComplete="current-password" required className={field}
          value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
      </div>

      <button type="submit" disabled={busy} className="btn-primary w-full py-4 gap-2 disabled:opacity-60 justify-center">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Sign in</>}
      </button>
    </form>
  );
}
