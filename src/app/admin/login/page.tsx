import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import { isDbConfigured } from "@/lib/server/db";
import LoginForm from "@/components/portal/LoginForm";

export const metadata: Metadata = {
  title: { absolute: "Team Login | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (isDbConfigured()) {
    const user = await currentUser();
    if (user?.role === "admin") redirect("/admin");
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-60" />
      <div className="relative z-10 max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-xs font-heading font-bold tracking-wide">Team access</span>
          </span>
          <h1 className="heading-lg text-3xl text-white mb-3">Admin sign in</h1>
          <p className="text-white/55 font-body text-sm">
            For Digital Magician staff. Students sign in at /portal.
          </p>
        </div>

        <LoginForm expect="admin" redirectTo="/admin" />
      </div>
    </section>
  );
}
