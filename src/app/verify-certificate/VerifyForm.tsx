"use client";

import { useState } from "react";
import { AlertCircle, BadgeCheck, Loader2, Search, ShieldX } from "lucide-react";

interface Certificate {
  number: string;
  studentName: string;
  programName: string;
  issuedOn: string;
  grade: string | null;
}

type Outcome =
  | { result: "valid" | "revoked"; certificate: Certificate }
  | { result: "not_found" }
  | null;

export default function VerifyForm() {
  const [number, setNumber] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<Outcome>(null);

  async function check(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setOutcome(null);

    try {
      const response = await fetch("/api/certificates/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not check that number right now.");
      } else {
        setOutcome(data as Outcome);
      }
    } catch {
      setError("Network problem. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // The API returns YYYY-MM-DD, so it is rendered without timezone maths:
  // an employer abroad must see the same issue date as the student in India.
  const formatDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={check} className="bento p-6 sm:p-8">
        <label htmlFor="certificate" className="block text-white/70 font-heading font-semibold text-sm mb-2">
          Certificate number
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="certificate"
            value={number}
            onChange={(e) => setNumber(e.target.value.toUpperCase())}
            placeholder="DM-2026-00184"
            autoComplete="off"
            className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-white font-body tracking-wide placeholder:text-white/25 focus:border-amber-brand/60 focus:outline-none focus:ring-2 focus:ring-amber-brand/20"
          />
          <button type="submit" disabled={busy || number.trim().length < 4} className="btn-primary px-7 py-3.5 gap-2 disabled:opacity-50">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Verify</>}
          </button>
        </div>
        <p className="text-white/35 font-body text-xs mt-3">
          The number is printed at the bottom of every Digital Magician certificate.
        </p>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-red-200 font-body text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {outcome?.result === "valid" && (
        <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-6">
          <div className="flex items-center gap-3 mb-5">
            <BadgeCheck className="w-7 h-7 text-emerald-400" />
            <div>
              <div className="text-emerald-300 font-heading font-bold text-lg">Certificate verified</div>
              <div className="text-white/50 font-body text-xs">Issued by Digital Magician, Sonipat</div>
            </div>
          </div>
          <dl className="space-y-3 font-body text-sm">
            <Detail label="Student" value={outcome.certificate.studentName} />
            <Detail label="Programme" value={outcome.certificate.programName} />
            <Detail label="Issued on" value={formatDate(outcome.certificate.issuedOn)} />
            {outcome.certificate.grade && <Detail label="Grade" value={outcome.certificate.grade} />}
            <Detail label="Certificate number" value={outcome.certificate.number} />
          </dl>
        </div>
      )}

      {outcome?.result === "revoked" && (
        <div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.08] p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldX className="w-7 h-7 text-amber-brand" />
            <div className="text-amber-brand font-heading font-bold text-lg">This certificate was withdrawn</div>
          </div>
          <p className="text-white/65 font-body text-sm">
            Certificate {outcome.certificate.number} was issued to {outcome.certificate.studentName} and has since
            been withdrawn by Digital Magician. Contact us on +91 79882 27240 for details.
          </p>
        </div>
      )}

      {outcome?.result === "not_found" && (
        <div className="mt-5 rounded-2xl border border-white/15 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-white/50" />
            <div className="text-white font-heading font-bold text-lg">No certificate with that number</div>
          </div>
          <p className="text-white/60 font-body text-sm">
            Check for typing mistakes, including the year and any dashes. If it still does not match, the
            certificate was not issued by Digital Magician. You can confirm with us on WhatsApp at +91 79882 27240.
          </p>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/[0.06] pb-2.5 last:border-0">
      <dt className="text-white/45">{label}</dt>
      <dd className="text-white font-heading font-semibold text-right">{value}</dd>
    </div>
  );
}
