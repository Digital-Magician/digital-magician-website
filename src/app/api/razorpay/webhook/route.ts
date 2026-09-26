import { NextResponse } from "next/server";
import { query, isDbConfigured } from "@/lib/server/db";
import { verifyWebhookSignature } from "@/lib/server/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay's own record of truth. The browser can close before the confirm
 * call lands, so the webhook is what keeps the database correct.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }
  if (!isDbConfigured()) return NextResponse.json({ ok: true });

  const event = JSON.parse(raw) as {
    event: string;
    payload?: { payment?: { entity?: { id: string; order_id: string; amount: number; status: string } } };
  };
  const payment = event.payload?.payment?.entity;

  if (payment?.order_id && (event.event === "payment.captured" || event.event === "order.paid")) {
    await query`
      UPDATE enrollments SET
        razorpay_payment_id = ${payment.id},
        amount_paid_paise = ${payment.amount},
        payment_status = 'paid'
      WHERE razorpay_order_id = ${payment.order_id}
    `;
  } else if (payment?.order_id && event.event === "payment.failed") {
    await query`
      UPDATE enrollments SET payment_status = 'failed'
      WHERE razorpay_order_id = ${payment.order_id} AND payment_status = 'pending'
    `;
  }

  await query`
    INSERT INTO audit_log (action, entity, entity_id, meta)
    VALUES ('razorpay.webhook', 'payment', ${payment?.id ?? null}, ${JSON.stringify({ event: event.event })})
  `;

  return NextResponse.json({ ok: true });
}
