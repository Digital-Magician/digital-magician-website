import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import PasswordForm from "@/components/portal/PasswordForm";

export const metadata: Metadata = {
  title: { absolute: "Change Password | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PasswordPage() {
  const user = await currentUser();
  if (!user) redirect("/portal/login");

  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-60" />
      <div className="relative z-10 max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 glass-amber rounded-full px-4 py-1.5 mb-5">
            <KeyRound className="w-3.5 h-3.5 text-amber-brand" />
            <span className="text-amber-brand text-xs font-heading font-bold tracking-wide">
              Account security
            </span>
          </span>
          <h1 className="heading-lg text-3xl text-white mb-3">
            {user.must_change_password ? "Set your own password" : "Change your password"}
          </h1>
          <p className="text-white/55 font-body text-sm">
            {user.must_change_password
              ? "You are signed in with a temporary password. Choose your own before you continue."
              : "Choose a new password. You will stay signed in on this device only."}
          </p>
        </div>

        <PasswordForm redirectTo={user.role === "admin" ? "/admin" : "/portal"} />
      </div>
    </section>
  );
}
