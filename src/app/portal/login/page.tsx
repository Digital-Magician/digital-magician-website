import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import { isDbConfigured } from "@/lib/server/db";
import LoginForm from "@/components/portal/LoginForm";

export const metadata: Metadata = {
  title: { absolute: "Student Login | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalLoginPage() {
  if (isDbConfigured()) {
    const user = await currentUser();
    if (user) redirect(user.role === "admin" ? "/admin" : "/portal");
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-60" />
      <div className="relative z-10 max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-1.5 mb-5">
            <GraduationCap className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-xs font-heading font-bold tracking-wide">
              Student portal
            </span>
          </span>
          <h1 className="heading-lg text-3xl text-white mb-3">Welcome back</h1>
          <p className="text-white/55 font-body text-sm">
            Sign in to watch your class recordings. Use the email and password the team sent you.
          </p>
        </div>

        <LoginForm expect="student" redirectTo="/portal" />

        <p className="text-center text-white/40 font-body text-xs mt-6">
          Forgot your password? Message us on WhatsApp at +91 79882 27240 and we will reset it.
        </p>
      </div>
    </section>
  );
}
