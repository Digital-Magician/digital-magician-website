import { NextResponse } from "next/server";
import { query, queryOne, isDbConfigured } from "@/lib/server/db";
import { storePrivateFile } from "@/lib/server/uploads";
import { rateLimit, clientIp } from "@/lib/server/ratelimit";
import { issueClaimToken } from "@/lib/server/claim";
import {
  createOrder,
  liveKeysBlockedHere,
  razorpayConfigured,
  razorpayKeyId,
} from "@/lib/server/razorpay";
import {
  amountDueNowPaise,
  balanceDuePaise,
  buildReference,
  discountPaise,
  findProgram,
  normalisePhone,
  validateEnrollment,
  type BalanceMethod,
  type PaymentMethod,
  type PaymentPlan,
} from "@/lib/enrollment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Enrollment is not available yet. Please contact the team on WhatsApp." },
      { status: 503 }
    );
  }

  const ip = clientIp(request.headers);
  // Staff often fill this in for several students from one office connection,
  // so the limit is set well above normal use but still far below bot traffic.
  const limit = await rateLimit(`enroll:${ip}`, 20, 60 * 60);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions from this device. Please contact us on WhatsApp." },
      { status: 429 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Could not read the form." }, { status: 400 });
  }

  // Bots fill hidden fields; humans never see this one.
  if ((form.get("company") as string)?.trim()) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  const input = {
    studentName: String(form.get("studentName") ?? "").trim(),
    fatherName: String(form.get("fatherName") ?? "").trim(),
    guardianPhone: String(form.get("guardianPhone") ?? "").trim(),
    contactNumber: String(form.get("contactNumber") ?? "").trim(),
    whatsappNumber: String(form.get("whatsappNumber") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    address: String(form.get("address") ?? "").trim(),
    programSlug: String(form.get("programSlug") ?? "").trim(),
    paymentPlan: String(form.get("paymentPlan") ?? "") as PaymentPlan,
    paymentMethod: String(form.get("paymentMethod") ?? "") as PaymentMethod,
    balanceMethod: (String(form.get("balanceMethod") ?? "not_applicable") || "not_applicable") as BalanceMethod,
  };

  const errors = validateEnrollment(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  // Amounts are always recomputed here; the browser only says which plan it wants.
  const program = findProgram(input.programSlug)!;
  const dueNow = amountDueNowPaise(input.paymentPlan, program);
  const discount = discountPaise(input.paymentPlan, program);

  // Cash is only offered for the remaining course fee, never for money due now.
  if (input.paymentMethod === "cash") {
    return NextResponse.json(
      { error: "Choose Razorpay or UPI for the amount payable now." },
      { status: 400 }
    );
  }

  const aadhaar = form.get("aadhaar");
  let aadhaarPath: string | null = null;
  if (aadhaar instanceof File && aadhaar.size > 0) {
    try {
      const stored = await storePrivateFile("aadhaar", aadhaar);
      aadhaarPath = stored.pathname;
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Could not store the Aadhaar file." },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Attach the Aadhaar card to continue.", errors: { aadhaar: "Attach the Aadhaar card." } },
      { status: 400 }
    );
  }

  const reference = buildReference();
  const balanceMethod: BalanceMethod =
    input.paymentPlan === "full" ? "not_applicable" : input.balanceMethod;

  const row = await queryOne<{ id: number }>`
    INSERT INTO enrollments (
      reference, student_name, father_name, guardian_phone, contact_number, whatsapp_number,
      email, address, program_slug, program_name, course_fee_paise, payment_plan,
      amount_due_now_paise, discount_paise, payment_method, balance_method, payment_status, aadhaar_path
    ) VALUES (
      ${reference}, ${input.studentName}, ${input.fatherName},
      ${normalisePhone(input.guardianPhone)}, ${normalisePhone(input.contactNumber)},
      ${normalisePhone(input.whatsappNumber)}, ${input.email || null}, ${input.address},
      ${program.slug}, ${program.name}, ${program.feeInr * 100}, ${input.paymentPlan},
      ${dueNow}, ${discount}, ${input.paymentMethod}, ${balanceMethod}, 'pending', ${aadhaarPath}
    )
    RETURNING id
  `;

  if (!row) {
    return NextResponse.json({ error: "Could not save the enrollment." }, { status: 500 });
  }

  const claimToken = issueClaimToken(row.id, reference);
  let razorpay: { orderId: string; keyId: string; amount: number } | null = null;

  if (input.paymentMethod === "razorpay") {
    if (liveKeysBlockedHere()) {
      return NextResponse.json(
        {
          error:
            "This is the test server and it holds live payment keys, so card payment is switched off here. Use UPI, or try this on the live site.",
        },
        { status: 503 }
      );
    }
    if (!razorpayConfigured()) {
      return NextResponse.json(
        {
          error:
            "Card payment is not switched on yet. Choose UPI, or ask the team for a payment link.",
        },
        { status: 503 }
      );
    }
    try {
      const order = await createOrder({
        amountPaise: dueNow,
        receipt: reference,
        notes: { reference, program: program.shortName, student: input.studentName },
      });
      await query`UPDATE enrollments SET razorpay_order_id = ${order.id} WHERE id = ${row.id}`;
      razorpay = { orderId: order.id, keyId: razorpayKeyId(), amount: order.amount };
    } catch (error) {
      console.error("razorpay order failed", error);
      return NextResponse.json(
        { error: "Payment gateway did not respond. Try UPI, or contact the team." },
        { status: 502 }
      );
    }
  }

  await query`
    INSERT INTO audit_log (action, entity, entity_id, meta)
    VALUES ('enrollment.created', 'enrollment', ${String(row.id)}, ${JSON.stringify({
      reference,
      program: program.slug,
      plan: input.paymentPlan,
      method: input.paymentMethod,
    })})
  `;

  return NextResponse.json({
    enrollmentId: row.id,
    reference,
    claimToken,
    amountDuePaise: dueNow,
    discountPaise: discount,
    balanceDuePaise: input.paymentPlan === "enrollment_only" ? balanceDuePaise(program) : 0,
    razorpay,
  });
}
