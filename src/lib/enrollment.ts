import { programs } from "@/lib/data/programs";

/** Booking amount when a student does not pay the whole fee up front. */
export const ENROLLMENT_FEE_INR = 5000;
export const ENROLLMENT_FEE_PAISE = ENROLLMENT_FEE_INR * 100;

/**
 * Paying the whole fee up front earns a discount on the Full Stack programme.
 * Paying only the booking fee keeps the full price, with the balance due on the
 * first day of class.
 */
export const INSTANT_PAYMENT_DISCOUNTS: Record<string, number> = {
  "full-stack-digital-marketing": 5000,
};

export const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "GARVFENCER@YBL";
export const UPI_PAYEE_NAME = "Digital Magician";

export type PaymentPlan = "full" | "enrollment_only";
export type PaymentMethod = "razorpay" | "upi" | "cash";
export type BalanceMethod = "cash" | "online" | "not_applicable";

export interface ProgramOption {
  slug: string;
  name: string;
  shortName: string;
  feeInr: number;
  duration: string;
  /** Taken off the fee when the whole amount is paid at enrollment. */
  instantDiscountInr: number;
}

export const enrollmentPrograms: ProgramOption[] = programs.map((program) => ({
  slug: program.slug,
  name: program.name,
  shortName: program.shortName,
  feeInr: program.fee,
  duration: program.duration,
  instantDiscountInr: INSTANT_PAYMENT_DISCOUNTS[program.slug] ?? 0,
}));

export function findProgram(slug: string): ProgramOption | undefined {
  return enrollmentPrograms.find((program) => program.slug === slug);
}

/** The discount applies only to paying everything at once. */
export function discountPaise(plan: PaymentPlan, program: ProgramOption): number {
  return plan === "full" ? program.instantDiscountInr * 100 : 0;
}

export function amountDueNowPaise(plan: PaymentPlan, program: ProgramOption): number {
  if (plan !== "full") return ENROLLMENT_FEE_PAISE;
  return program.feeInr * 100 - discountPaise(plan, program);
}

/** What is left to pay on the first day of class after the booking fee. */
export function balanceDuePaise(program: ProgramOption): number {
  return program.feeInr * 100 - ENROLLMENT_FEE_PAISE;
}

/** Everything the student pays under the chosen plan. */
export function payableTotalPaise(plan: PaymentPlan, program: ProgramOption): number {
  return plan === "full"
    ? amountDueNowPaise(plan, program)
    : ENROLLMENT_FEE_PAISE + balanceDuePaise(program);
}

export function formatInr(paise: number): string {
  return "₹" + (paise / 100).toLocaleString("en-IN");
}

/** UPI deep link so a phone can open GPay/PhonePe/Paytm with the amount filled. */
export function upiDeepLink(amountPaise: number, reference: string): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: (amountPaise / 100).toFixed(2),
    cu: "INR",
    tn: `Digital Magician ${reference}`,
  });
  return `upi://pay?${params.toString()}`;
}

/** DM-2609-4821 style reference shown to the student and used by the team. */
export function buildReference(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DM-${day}${month}-${random}`;
}

export interface EnrollmentInput {
  studentName: string;
  fatherName: string;
  guardianPhone: string;
  contactNumber: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  programSlug: string;
  paymentPlan: PaymentPlan;
  paymentMethod: PaymentMethod;
  balanceMethod: BalanceMethod;
}

const phonePattern = /^[6-9]\d{9}$/;

export function normalisePhone(value: string): string {
  return value.replace(/[^0-9]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
}

/** Server and browser share these rules so the messages always match. */
export function validateEnrollment(input: Partial<EnrollmentInput>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.studentName || input.studentName.trim().length < 3) {
    errors.studentName = "Enter the student's full name.";
  }
  if (!input.fatherName || input.fatherName.trim().length < 3) {
    errors.fatherName = "Enter the father's name.";
  }
  if (!phonePattern.test(normalisePhone(input.guardianPhone ?? ""))) {
    errors.guardianPhone = "Enter a valid 10-digit guardian number.";
  }
  if (!phonePattern.test(normalisePhone(input.contactNumber ?? ""))) {
    errors.contactNumber = "Enter a valid 10-digit contact number.";
  }
  if (!phonePattern.test(normalisePhone(input.whatsappNumber ?? ""))) {
    errors.whatsappNumber = "Enter a valid 10-digit WhatsApp number.";
  }
  if (input.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) {
    errors.email = "Enter a valid email address, or leave it blank.";
  }
  if (!input.address || input.address.trim().length < 10) {
    errors.address = "Enter the full address, including city and PIN code.";
  }
  if (!input.programSlug || !findProgram(input.programSlug)) {
    errors.programSlug = "Choose a course.";
  }
  if (input.paymentPlan !== "full" && input.paymentPlan !== "enrollment_only") {
    errors.paymentPlan = "Choose how much you are paying now.";
  }
  if (!["razorpay", "upi", "cash"].includes(input.paymentMethod ?? "")) {
    errors.paymentMethod = "Choose a payment method.";
  }
  if (
    input.paymentPlan === "enrollment_only" &&
    !["cash", "online"].includes(input.balanceMethod ?? "")
  ) {
    errors.balanceMethod = "Tell us how the remaining course fee will be paid.";
  }
  return errors;
}
