"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2, UserPlus } from "lucide-react";

interface CourseOption {
  id: number;
  title: string;
}

export default function CreateStudent({ courses }: { courses: CourseOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", courseId: "" });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, courseId: form.courseId ? Number(form.courseId) : undefined }),
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setError(data.error ?? "Could not create the student.");
      return;
    }
    setCreated({ email: data.email, password: data.password });
    setForm({ fullName: "", email: "", phone: "", courseId: "" });
    router.refresh();
  }

  const field =
    "w-full rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-white font-body text-sm placeholder:text-white/30 focus:border-amber-brand/50 focus:outline-none";

  const shareText = created
    ? `Your Digital Magician class portal is ready.\n\nOpen: https://digitalmagician.in/portal\nEmail: ${created.email}\nPassword: ${created.password}\n\nPlease change the password after your first login.`
    : "";

  return (
    <div className="bento p-5 mb-6">
      <button type="button" onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 text-amber-brand font-heading font-semibold text-sm">
        <UserPlus className="w-4 h-4" /> {open ? "Close" : "Add a student"}
      </button>

      {open && (
        <form onSubmit={submit} className="mt-5 grid sm:grid-cols-2 gap-3">
          <input className={field} placeholder="Full name" required value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input className={field} type="email" placeholder="Email (their login)" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className={field} placeholder="Phone (optional)" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <select className={field} value={form.courseId}
            onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
            <option value="">Give access to a class later</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>

          {error && <p className="sm:col-span-2 text-red-300 font-body text-xs">{error}</p>}

          <button type="submit" disabled={busy}
            className="sm:col-span-2 btn-primary py-3 text-sm gap-2 disabled:opacity-60">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create student and password"}
          </button>
        </form>
      )}

      {created && (
        <div className="mt-5 rounded-xl border border-amber-brand/30 bg-amber-brand/[0.07] p-4">
          <p className="text-white/70 font-body text-xs mb-3">
            Share these once. The password is not stored in readable form and cannot be shown again.
          </p>
          <div className="font-body text-sm space-y-1">
            <div className="text-white/80">Email: <span className="text-white font-heading font-semibold">{created.email}</span></div>
            <div className="text-white/80">Password: <span className="text-amber-brand font-heading font-bold tracking-wide">{created.password}</span></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button type="button" onClick={() => navigator.clipboard?.writeText(shareText)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-white/70 font-heading font-semibold text-xs hover:border-amber-brand/40">
              <Copy className="w-3.5 h-3.5" /> Copy message
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-amber-brand/40 bg-amber-brand/10 px-3 py-1.5 text-amber-brand font-heading font-semibold text-xs">
              Send on WhatsApp
            </a>
            <button type="button" onClick={() => setCreated(null)}
              className="rounded-lg px-3 py-1.5 text-white/40 font-heading font-semibold text-xs hover:text-white/70">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
