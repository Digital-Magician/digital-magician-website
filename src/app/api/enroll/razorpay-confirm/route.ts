import { NextResponse } from "next/server";
import { query, queryOne, isDbConfigured } from "@/lib/server/db";
import { verifyClaimToken } from "@/lib/server/claim";
import { fetchPayment, verifyCheckoutSignature } from "@/lib/server/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Called by the browser right after Razorpay Checkout succeeds. */
export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Not available." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    enrollmentId?: number;
    claimToken?: string;
    orderId?: string;
    paymentId?: string;
    signature?: string;
  } | null;

  if (!body?.enrollmentId || !body.orderId || !body.paymentId || !body.signature) {
    return NextResponse.json({ error: "Incomplete payment details." }, { status: 400 });
  }

  const enrollment = await queryOne<{
    id: number;
    reference: string;
    razorpay_order_id: string | null;
    amount_due_now_paise: number;
  }>`
    SELECT id, reference, razorpay_order_id, amount_due_now_paise
    FROM enrollments WHERE id = ${body.enrollmentId}
  `;

  if (!enrollment || !verifyClaimToken(enrollment.id, enrollment.reference, body.claimToken)) {
    return NextResponse.json({ error: "This payment could not be matched." }, { status: 403 });
  }
  if (enrollment.razorpay_order_id !== body.orderId) {
    return NextResponse.json({ error: "Order does not match this enrollment." }, { status: 400 });
  }
  if (
    !verifyCheckoutSignature({
      orderId: body.orderId,
      paymentId: body.paymentId,
      signature: body.signature,
    })
  ) {
    return NextResponse.json({ error: "Payment signature failed verification." }, { status: 400 });
  }

  // The signature proves the handoff; the API call proves the money was captured.
  let amountPaid = 0;
  let captured = false;
  try {
    const payment = await fetchPayment(body.paymentId);
    captured = payment.status === "captured" || payment.status === "authorized";
    amountPaid = payment.amount;
  } catch (error) {
    console.error("razorpay payment lookup failed", error);
  }

  await query`
    UPDATE enrollments SET
      razorpay_payment_id = ${body.paymentId},
      amount_paid_paise = ${amountPaid || enrollment.amount_due_now_paise},
      payment_status = ${captured ? "paid" : "awaiting_verification"}
    WHERE id = ${enrollment.id}
  `;

  await query`
    INSERT INTO audit_log (action, entity, entity_id, meta)
    VALUES ('payment.razorpay', 'enrollment', ${String(enrollment.id)}, ${JSON.stringify({
      paymentId: body.paymentId,
      captured,
    })})
  `;

  return NextResponse.json({ ok: true, status: captured ? "paid" : "awaiting_verification" });
}
