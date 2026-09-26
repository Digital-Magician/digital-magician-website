"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/portal/logout", { method: "POST" });
        router.replace("/portal/login");
        router.refresh();
      }}
      className={`inline-flex items-center gap-2 text-white/50 hover:text-amber-brand font-heading font-semibold text-sm transition-colors ${className}`}
    >
      <LogOut className="w-4 h-4" />
      {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
