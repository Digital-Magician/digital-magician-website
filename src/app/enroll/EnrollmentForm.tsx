"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ENROLLMENT_FEE_INR,
  UPI_ID,
  amountDueNowPaise,
  enrollmentPrograms,
  formatInr,
  upiDeepLink,
  validateEnrollment,
  type BalanceMethod,
  type PaymentMethod,
  type PaymentPlan,
} from "@/lib/enrollment";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Smartphone,
  Upload,
} from "lucide-react";

interface CreatedEnrollment {
  enrollmentId: number;
  reference: string;
  claimToken: string;
  amountDuePaise: number;
  razorpay: { orderId: string; keyId: string; amount: number } | null;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const field =
  "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-white font-body text-base placeholder:text-white/30 focus:border-amber-brand/60 focus:outline-none focus:ring-2 focus:ring-amber-brand/20 transition-colors";
const labelClass = "block text-white/70 font-heading font-semibold text-sm mb-2";
const errorClass = "text-red-400 text-xs font-body mt-1.5";

export default function EnrollmentForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    studentName: "",
    fatherName: "",
    guardianPhone: "",
    contactNumber: "",
    whatsappNumber: "",
    email: "",
    address: "",
    programSlug: enrollmentPrograms[0]?.slug ?? "",
    paymentPlan: "" as PaymentPlan | "",
    balanceMethod: "" as BalanceMethod | "",
    paymentMethod: "" as PaymentMethod | "",
  });
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [aadhaar, setAadhaar] = useState<File | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [utr, setUtr] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<CreatedEnrollment | null>(null);
  const [outcome, setOutcome] = useState<"paid" | "awaiting" | "cash" | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const program = useMemo(
    () => enrollmentPrograms.find((p) => p.slug === values.programSlug),
    [values.programSlug]
  );

  const dueNow = useMemo(() => {
    if (!program || !values.paymentPlan) return 0;
    return amountDueNowPaise(values.paymentPlan, program.feeInr);
  }, [program, values.paymentPlan]);

  useEffect(() => {
    if (sameWhatsapp) {
      setValues((current) => ({ ...current, whatsappNumber: current.contactNumber }));
    }
  }, [sameWhatsapp, values.contactNumber]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function update(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validateStepOne() {
    const found = validateEnrollment({
      ...values,
      balanceMethod: values.balanceMethod || undefined,
      paymentPlan: "full",
      paymentMethod: "upi",
    });
    const relevant: Record<string, string> = {};
    for (const key of [
      "studentName",
      "fatherName",
      "guardianPhone",
      "contactNumber",
      "whatsappNumber",
      "email",
      "address",
    ]) {
      if (found[key]) relevant[key] = found[key];
    }
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  }

  function validateStepTwo() {
    const next: Record<string, string> = {};
    if (!program) next.programSlug = "Choose a course.";
    if (!aadhaar) next.aadhaar = "Attach the Aadhaar card (JPG, PNG or PDF).";
    if (aadhaar && aadhaar.size > 8 * 1024 * 1024) next.aadhaar = "File must be under 8 MB.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStepThree() {
    const next: Record<string, string> = {};
    if (!values.paymentPlan) next.paymentPlan = "Choose how much you are paying now.";
    if (values.paymentPlan === "enrollment_only" && !values.balanceMethod) {
      next.balanceMethod = "Tell us how the rest of the fee will be paid.";
    }
    if (!values.paymentMethod) next.paymentMethod = "Choose how you want to pay now.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validateStepThree() || !program) return;
    setBusy(true);
    setServerError("");

    const body = new FormData();
    body.set("studentName", values.studentName);
    body.set("fatherName", values.fatherName);
    body.set("guardianPhone", values.guardianPhone);
    body.set("contactNumber", values.contactNumber);
    body.set("whatsappNumber", sameWhatsapp ? values.contactNumber : values.whatsappNumber);
    body.set("email", values.email);
    body.set("address", values.address);
    body.set("programSlug", values.programSlug);
    body.set("paymentPlan", values.paymentPlan);
    body.set("paymentMethod", values.paymentMethod);
    body.set("balanceMethod", values.paymentPlan === "full" ? "not_applicable" : values.balanceMethod);
    body.set("company", ""); // honeypot
    if (aadhaar) body.set("aadhaar", aadhaar);

    try {
      const response = await fetch("/api/enroll", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        if (data.errors) setErrors(data.errors);
        setBusy(false);
        return;
      }
      setCreated(data as CreatedEnrollment);
      setStep(4);
      if (values.paymentMethod === "razorpay") {
        void startRazorpay(data as CreatedEnrollment);
      }
    } catch {
      setServerError("Network problem. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function loadRazorpayScript(): Promise<boolean> {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function startRazorpay(enrollment: CreatedEnrollment) {
    if (!enrollment.razorpay) return;
    const ready = await loadRazorpayScript();
    if (!ready || !window.Razorpay) {
      setServerError("Could not open the payment window. Please use UPI instead.");
      return;
    }

    const checkout = new window.Razorpay({
      key: enrollment.razorpay.keyId,
      amount: enrollment.razorpay.amount,
      currency: "INR",
      name: "Digital Magician",
      description: `${program?.shortName ?? "Course"} - ${enrollment.reference}`,
      order_id: enrollment.razorpay.orderId,
      prefill: {
        name: values.studentName,
        email: values.email || undefined,
        contact: values.contactNumber,
      },
      notes: { reference: enrollment.reference },
      theme: { color: "#F59E0B" },
      handler: async (response: Record<string, string>) => {
        setBusy(true);
        const confirm = await fetch("/api/enroll/razorpay-confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId: enrollment.enrollmentId,
            claimToken: enrollment.claimToken,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });
        const result = await confirm.json();
        setBusy(false);
        if (confirm.ok) {
          setOutcome(result.status === "paid" ? "paid" : "awaiting");
          setStep(5);
        } else {
          setServerError(result.error ?? "We could not confirm the payment. Please contact us.");
        }
      },
      modal: {
        ondismiss: () =>
          setServerError("Payment window closed. You can try again or pay by UPI."),
      },
    });
    checkout.open();
  }

  async function uploadScreenshot() {
    if (!created || !screenshot) {
      setErrors({ screenshot: "Attach the payment screenshot." });
      return;
    }
    setBusy(true);
    const body = new FormData();
    body.set("enrollmentId", String(created.enrollmentId));
    body.set("claimToken", created.claimToken);
    body.set("utr", utr);
    body.set("screenshot", screenshot);

    const response = await fetch("/api/enroll/proof", { method: "POST", body });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setServerError(data.error ?? "Upload failed. Please try again.");
      return;
    }
    setOutcome("awaiting");
    setStep(5);
  }

  const steps = ["Your details", "Course & ID", "Payment", "Pay now", "Done"];

  return (
    <div ref={topRef} className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-8">
        {steps.map((label, index) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                index + 1 <= step ? "bg-amber-brand" : "bg-white/10"
              }`}
            />
            <div
              className={`mt-2 text-[11px] font-heading font-semibold tracking-wide ${
                index + 1 === step ? "text-amber-brand" : "text-white/35"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {serverError && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 text-sm font-body">
          {serverError}
        </div>
      )}

      {/* ── Step 1: student details ─────────────────────────────────── */}
      {step === 1 && (
        <div className="bento p-6 sm:p-8 space-y-5">
          <div>
            <label className={labelClass} htmlFor="studentName">Student&apos;s full name</label>
            <input id="studentName" className={field} value={values.studentName} autoComplete="name"
              onChange={(e) => update("studentName", e.target.value)} placeholder="As printed on the Aadhaar card" />
            {errors.studentName && <p className={errorClass}>{errors.studentName}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="fatherName">Father&apos;s name</label>
            <input id="fatherName" className={field} value={values.fatherName}
              onChange={(e) => update("fatherName", e.target.value)} placeholder="Father's full name" />
            {errors.fatherName && <p className={errorClass}>{errors.fatherName}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="contactNumber">Contact number</label>
              <input id="contactNumber" className={field} inputMode="numeric" autoComplete="tel"
                value={values.contactNumber} onChange={(e) => update("contactNumber", e.target.value)}
                placeholder="10-digit mobile number" />
              {errors.contactNumber && <p className={errorClass}>{errors.contactNumber}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="guardianPhone">Guardian&apos;s phone number</label>
              <input id="guardianPhone" className={field} inputMode="numeric"
                value={values.guardianPhone} onChange={(e) => update("guardianPhone", e.target.value)}
                placeholder="Parent or guardian" />
              {errors.guardianPhone && <p className={errorClass}>{errors.guardianPhone}</p>}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2.5 mb-3 cursor-pointer">
              <input type="checkbox" checked={sameWhatsapp} onChange={(e) => setSameWhatsapp(e.target.checked)}
                className="w-4 h-4 accent-amber-brand" />
              <span className="text-white/70 font-body text-sm">WhatsApp number is the same as my contact number</span>
            </label>
            {!sameWhatsapp && (
              <>
                <label className={labelClass} htmlFor="whatsappNumber">WhatsApp number</label>
                <input id="whatsappNumber" className={field} inputMode="numeric"
                  value={values.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)}
                  placeholder="10-digit WhatsApp number" />
                {errors.whatsappNumber && <p className={errorClass}>{errors.whatsappNumber}</p>}
              </>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="email">Email address <span className="text-white/30 font-normal">(optional)</span></label>
            <input id="email" type="email" className={field} value={values.email} autoComplete="email"
              onChange={(e) => update("email", e.target.value)} placeholder="Used for your class portal login" />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="address">Full address</label>
            <textarea id="address" rows={3} className={field} value={values.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="House number, locality, city, state and PIN code" />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>

          <button type="button" className="btn-primary w-full py-4 gap-2"
            onClick={() => validateStepOne() && setStep(2)}>
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Step 2: course and Aadhaar ──────────────────────────────── */}
      {step === 2 && (
        <div className="bento p-6 sm:p-8 space-y-6">
          <div>
            <span className={labelClass}>Which course are you joining?</span>
            <div className="space-y-2.5">
              {enrollmentPrograms.map((option) => (
                <label key={option.slug}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 cursor-pointer transition-colors ${
                    values.programSlug === option.slug
                      ? "border-amber-brand/60 bg-amber-brand/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="program" value={option.slug}
                      checked={values.programSlug === option.slug}
                      onChange={() => update("programSlug", option.slug)}
                      className="w-4 h-4 accent-amber-brand" />
                    <span>
                      <span className="block text-white font-heading font-semibold text-sm">{option.shortName}</span>
                      <span className="block text-white/45 font-body text-xs">{option.duration}</span>
                    </span>
                  </span>
                  <span className="text-amber-brand font-heading font-bold text-sm whitespace-nowrap">
                    {formatInr(option.feeInr * 100)}
                  </span>
                </label>
              ))}
            </div>
            {errors.programSlug && <p className={errorClass}>{errors.programSlug}</p>}
          </div>

          <div>
            <span className={labelClass}>Aadhaar card</span>
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-8 cursor-pointer hover:border-amber-brand/40 transition-colors">
              <Upload className="w-6 h-6 text-amber-brand" />
              <span className="text-white/70 font-body text-sm text-center">
                {aadhaar ? aadhaar.name : "Tap to attach a photo or PDF of the Aadhaar card"}
              </span>
              <span className="text-white/30 font-body text-xs">JPG, PNG or PDF, up to 8 MB</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="hidden"
                onChange={(e) => {
                  setAadhaar(e.target.files?.[0] ?? null);
                  setErrors((c) => ({ ...c, aadhaar: "" }));
                }} />
            </label>
            {errors.aadhaar && <p className={errorClass}>{errors.aadhaar}</p>}
            <p className="mt-3 flex items-start gap-2 text-white/40 font-body text-xs">
              <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-brand/70" />
              Stored privately for admission records. Only the Digital Magician team can open it, and it is never shown publicly.
            </p>
          </div>

          <div className="flex gap-3">
            <button type="button" className="rounded-xl border border-white/15 px-5 py-4 text-white/70 font-heading font-semibold text-sm hover:border-white/30 transition-colors"
              onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button type="button" className="btn-primary flex-1 py-4 gap-2"
              onClick={() => validateStepTwo() && setStep(3)}>
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: payment choices ─────────────────────────────────── */}
      {step === 3 && program && (
        <div className="bento p-6 sm:p-8 space-y-6">
          <div>
            <span className={labelClass}>How much would you like to pay now?</span>
            <div className="space-y-2.5">
              <PlanOption
                selected={values.paymentPlan === "full"}
                onSelect={() => update("paymentPlan", "full")}
                title="Pay the full course fee"
                subtitle={`${program.shortName} - complete payment`}
                amount={formatInr(program.feeInr * 100)}
              />
              <PlanOption
                selected={values.paymentPlan === "enrollment_only"}
                onSelect={() => update("paymentPlan", "enrollment_only")}
                title="Pay the enrollment fee only"
                subtitle="Books your seat. The rest is payable later."
                amount={formatInr(ENROLLMENT_FEE_INR * 100)}
              />
            </div>
            {errors.paymentPlan && <p className={errorClass}>{errors.paymentPlan}</p>}
          </div>

          {values.paymentPlan === "enrollment_only" && (
            <div>
              <span className={labelClass}>
                How will you pay the remaining {formatInr((program.feeInr - ENROLLMENT_FEE_INR) * 100)}?
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <ChoiceCard
                  selected={values.balanceMethod === "cash"}
                  onSelect={() => update("balanceMethod", "cash")}
                  icon={<Banknote className="w-5 h-5" />}
                  title="Cash"
                  subtitle="At the institute"
                />
                <ChoiceCard
                  selected={values.balanceMethod === "online"}
                  onSelect={() => update("balanceMethod", "online")}
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Online"
                  subtitle="Card, UPI or netbanking"
                />
              </div>
              {errors.balanceMethod && <p className={errorClass}>{errors.balanceMethod}</p>}
            </div>
          )}

          {values.paymentPlan && (
            <div>
              <span className={labelClass}>Pay {formatInr(dueNow)} now using</span>
              <div className="grid grid-cols-2 gap-2.5">
                <ChoiceCard
                  selected={values.paymentMethod === "razorpay"}
                  onSelect={() => update("paymentMethod", "razorpay")}
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Card / UPI / Netbanking"
                  subtitle="Secure Razorpay checkout"
                />
                <ChoiceCard
                  selected={values.paymentMethod === "upi"}
                  onSelect={() => update("paymentMethod", "upi")}
                  icon={<Smartphone className="w-5 h-5" />}
                  title="UPI transfer"
                  subtitle="Pay to our UPI ID"
                />
              </div>
              {errors.paymentMethod && <p className={errorClass}>{errors.paymentMethod}</p>}
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 font-body text-sm">
            <Row label="Course" value={program.shortName} />
            <Row label="Course fee" value={formatInr(program.feeInr * 100)} />
            {values.paymentPlan && <Row label="Payable now" value={formatInr(dueNow)} highlight />}
            {values.paymentPlan === "enrollment_only" && (
              <Row label="Balance" value={formatInr((program.feeInr - ENROLLMENT_FEE_INR) * 100)} />
            )}
          </div>

          <div className="flex gap-3">
            <button type="button" className="rounded-xl border border-white/15 px-5 py-4 text-white/70 hover:border-white/30 transition-colors"
              onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button type="button" className="btn-primary flex-1 py-4 gap-2" disabled={busy} onClick={submit}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue to payment <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: pay ─────────────────────────────────────────────── */}
      {step === 4 && created && (
        <div className="bento p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-brand/25 bg-amber-brand/[0.07] px-4 py-3">
            <div>
              <div className="text-white/50 font-body text-xs">Your reference</div>
              <div className="text-white font-heading font-bold">{created.reference}</div>
            </div>
            <div className="text-right">
              <div className="text-white/50 font-body text-xs">Payable now</div>
              <div className="text-amber-brand font-heading font-bold">{formatInr(created.amountDuePaise)}</div>
            </div>
          </div>

          {values.paymentMethod === "razorpay" ? (
            <div className="space-y-4 text-center">
              <p className="text-white/70 font-body text-sm">
                The secure Razorpay window should have opened. If it did not, use the button below.
              </p>
              <button type="button" className="btn-primary w-full py-4 gap-2" disabled={busy}
                onClick={() => created && startRazorpay(created)}>
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Pay {formatInr(created.amountDuePaise)}</>}
              </button>
              <button type="button" className="text-white/45 font-body text-xs underline underline-offset-4"
                onClick={() => update("paymentMethod", "upi")}>
                Pay by UPI instead
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-white/50 font-body text-xs mb-1">Pay to this UPI ID</div>
                <div className="text-amber-brand font-heading font-bold text-xl tracking-wide select-all">{UPI_ID}</div>
                <div className="text-white/45 font-body text-xs mt-2">
                  Amount: {formatInr(created.amountDuePaise)} &middot; Add {created.reference} in the note
                </div>
                <a href={upiDeepLink(created.amountDuePaise, created.reference)}
                  className="btn-primary w-full mt-4 py-3.5 gap-2 sm:hidden">
                  <Smartphone className="w-4 h-4" /> Open UPI app
                </a>
              </div>

              <div>
                <span className={labelClass}>Upload the payment screenshot</span>
                <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-7 cursor-pointer hover:border-amber-brand/40 transition-colors">
                  <Upload className="w-5 h-5 text-amber-brand" />
                  <span className="text-white/70 font-body text-sm text-center">
                    {screenshot ? screenshot.name : "Tap to attach the payment confirmation"}
                  </span>
                  <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="hidden"
                    onChange={(e) => {
                      setScreenshot(e.target.files?.[0] ?? null);
                      setErrors((c) => ({ ...c, screenshot: "" }));
                    }} />
                </label>
                {errors.screenshot && <p className={errorClass}>{errors.screenshot}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="utr">UPI reference number <span className="text-white/30 font-normal">(optional)</span></label>
                <input id="utr" className={field} value={utr} onChange={(e) => setUtr(e.target.value)}
                  placeholder="The 12-digit UTR from your payment app" />
              </div>

              <button type="button" className="btn-primary w-full py-4 gap-2" disabled={busy} onClick={uploadScreenshot}>
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit payment proof <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Step 5: done ────────────────────────────────────────────── */}
      {step === 5 && created && (
        <div className="bento p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-brand/15 border border-amber-brand/30 flex items-center justify-center mx-auto">
            {outcome === "paid" ? (
              <CheckCircle2 className="w-8 h-8 text-amber-brand" />
            ) : (
              <BadgeCheck className="w-8 h-8 text-amber-brand" />
            )}
          </div>
          <h2 className="heading-lg text-2xl text-white">
            {outcome === "paid" ? "Payment received" : "Enrollment submitted"}
          </h2>
          <p className="text-white/65 font-body text-sm leading-relaxed">
            {outcome === "paid"
              ? "Your seat is booked. Our team will message you on WhatsApp with your batch details and portal login."
              : "We have your details and your payment proof. The team verifies UPI payments during office hours and will confirm on WhatsApp."}
          </p>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left space-y-2 font-body text-sm">
            <Row label="Reference" value={created.reference} highlight />
            <Row label="Student" value={values.studentName} />
            <Row label="Course" value={program?.shortName ?? ""} />
            <Row label="Paid now" value={formatInr(created.amountDuePaise)} />
            {values.paymentPlan === "enrollment_only" && (
              <Row
                label="Balance"
                value={
                  values.balanceMethod === "cash"
                    ? `${formatInr(((program?.feeInr ?? 0) - ENROLLMENT_FEE_INR) * 100)} in cash at the institute`
                    : `${formatInr(((program?.feeInr ?? 0) - ENROLLMENT_FEE_INR) * 100)} online, link on WhatsApp`
                }
              />
            )}
          </div>

          <p className="text-white/40 font-body text-xs">
            Save this reference. Quote it when you message us on WhatsApp.
          </p>
          <a href="https://wa.me/917988227240" target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full py-4 gap-2">
            Message the team on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/45">{label}</span>
      <span className={highlight ? "text-amber-brand font-heading font-bold" : "text-white/85 text-right"}>{value}</span>
    </div>
  );
}

function PlanOption({
  selected, onSelect, title, subtitle, amount,
}: { selected: boolean; onSelect: () => void; title: string; subtitle: string; amount: string }) {
  return (
    <button type="button" onClick={onSelect}
      className={`w-full flex items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition-colors ${
        selected ? "border-amber-brand/60 bg-amber-brand/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}>
      <span>
        <span className="block text-white font-heading font-semibold text-sm">{title}</span>
        <span className="block text-white/45 font-body text-xs mt-0.5">{subtitle}</span>
      </span>
      <span className="text-amber-brand font-heading font-bold whitespace-nowrap">{amount}</span>
    </button>
  );
}

function ChoiceCard({
  selected, onSelect, icon, title, subtitle,
}: { selected: boolean; onSelect: () => void; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button type="button" onClick={onSelect}
      className={`rounded-xl border px-4 py-4 text-left transition-colors ${
        selected ? "border-amber-brand/60 bg-amber-brand/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}>
      <span className={`inline-flex mb-2 ${selected ? "text-amber-brand" : "text-white/50"}`}>{icon}</span>
      <span className="block text-white font-heading font-semibold text-sm leading-snug">{title}</span>
      <span className="block text-white/45 font-body text-xs mt-0.5">{subtitle}</span>
    </button>
  );
}
