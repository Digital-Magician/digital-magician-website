import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/server/auth";
import { isDbConfigured } from "@/lib/server/db";
import LogoutButton from "@/components/portal/LogoutButton";

export const metadata: Metadata = {
  title: { absolute: "Admin | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enrollments", label: "Enrollments" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/courses", label: "Classes" },
  { href: "/admin/certificates", label: "Certificates" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isDbConfigured()) {
    return (
      <div className="min-h-screen pt-32 px-4 bg-midnight text-center">
        <p className="text-white/70 font-body">
          The database is not connected yet. Add the Neon integration and pull the environment variables.
        </p>
      </div>
    );
  }

  const user = await requireRole("admin");
  if (!user) redirect("/admin/login");
  if (user.must_change_password) redirect("/portal/password");

  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="heading-lg text-2xl text-white">Digital Magician admin</h1>
            <p className="text-white/45 font-body text-xs mt-1">Signed in as {user.email}</p>
          </div>
          <LogoutButton />
        </div>

        <nav className="flex flex-wrap gap-2 mb-8 border-b border-white/[0.08] pb-4">
          {tabs.map((tab) => (
            <Link key={tab.href} href={tab.href}
              className="rounded-lg px-4 py-2 text-sm font-heading font-semibold text-white/60 hover:text-amber-brand hover:bg-white/[0.04] transition-colors">
              {tab.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </div>
  );
}
