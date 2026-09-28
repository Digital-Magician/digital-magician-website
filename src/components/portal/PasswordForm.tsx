"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export default function PasswordForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword !== confirm) {
      setError("The two new passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");

    const response = await fetch("/api/portal/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Could not change the password.");
      setBusy(false);
      return;
    }
    router.replace(redirectTo);
    router.refresh();
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
        <label htmlFor="current" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          Current password
        </label>
        <input id="current" type="password" autoComplete="current-password" required className={field}
          value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="The password you were given" />
      </div>

      <div>
        <label htmlFor="new" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          New password
        </label>
        <input id="new" type="password" autoComplete="new-password" required minLength={8} className={field}
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters" />
      </div>

      <div>
        <label htmlFor="confirm" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          Confirm new password
        </label>
        <input id="confirm" type="password" autoComplete="new-password" required className={field}
          value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type it again" />
      </div>

      <button type="submit" disabled={busy} className="btn-primary w-full py-4 gap-2 disabled:opacity-60 justify-center">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> Save new password</>}
      </button>
    </form>
  );
}
