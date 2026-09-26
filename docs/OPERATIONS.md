# Running the enrollment form, student portal and certificate checks

Three features share one database and one admin panel.

| What | Address | Who can open it |
|---|---|---|
| Enrollment form | `/enroll` | Anyone with the link. Not indexed, not linked from the site. |
| Student portal | `/portal` | Students, with the email and password you issue. |
| Certificate check | `/verify-certificate` | Public, and listed in the sitemap. |
| Admin panel | `/admin` | Staff accounts only. |

## First-time setup

1. **Database.** Install the Neon integration on the Vercel project, then pull the
   variables and create the tables:
   ```bash
   npx vercel env pull .env.local
   node scripts/db-migrate.mjs
   ```
2. **Secrets.** Add these to the Vercel project (Settings, Environment Variables):
   - `SESSION_SECRET` — signs portal logins. At least 32 characters.
   - `DOCUMENT_ENCRYPTION_KEY` — 32 bytes, base64. Encrypts Aadhaar cards and screenshots.
     **If this key is lost, stored documents cannot be read again.**
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
   - `BLOB_PRIVATE_STORE=1` once the Blob store is a **private** one.
3. **Blob store.** Identity documents need a private store. A public store refuses the
   upload, which is deliberate: an Aadhaar card must never sit on a public URL.
4. **First admin.**
   ```bash
   node scripts/db-seed-admin.mjs "you@digitalmagician.in" "Your Name"
   ```
   It prints a temporary password. Sign in at `/admin/login` and change it at once.
5. **Razorpay webhook.** In the Razorpay dashboard add
   `https://digitalmagician.in/api/razorpay/webhook` for `payment.captured`,
   `payment.failed` and `order.paid`, using the same secret as `RAZORPAY_WEBHOOK_SECRET`.

## Taking an enrollment

Share `https://digitalmagician.in/enroll` with the student on WhatsApp. They fill in
their details, attach the Aadhaar card, and choose:

- **Full fee** or **enrollment fee only** (₹5,000).
- If they pay the enrollment fee only, they say how the balance will come: **cash** at the
  institute, or **online** later.
- To pay now: **Razorpay** (card, UPI, netbanking; verified automatically) or **UPI** to
  GARVFENCER@YBL followed by a screenshot your team checks.

In **Admin → Enrollments** you then:

1. Open the Aadhaar card and, for UPI payers, the screenshot.
2. Press **Payment received** for UPI or cash money that has actually arrived.
   Razorpay payments mark themselves.
3. Press **Mark verified** with a note, so the next person knows who checked it.

## Adding class recordings

1. Upload the recording to YouTube and set it to **Unlisted**. Unlisted videos stay off
   search and off your channel page, but anyone holding the link can watch, so keep links
   inside the portal.
2. In **Admin → Classes**, create the course once, then a module per month, then add each
   class with its YouTube link. A full URL or a bare video id both work.

## Giving a student access

In **Admin → Students**, use *Add a student*. The system generates a password and offers a
ready-made WhatsApp message. It is shown once and cannot be shown again; use *Reset
password* if it is lost. Students must set their own password at first sign-in, and a
password change signs out every other device.

## Certificates

**Admin → Certificates** issues a certificate against its printed number. Anyone can then
check it at `/verify-certificate`, which shows only the name, programme, issue date and
grade. *Withdraw* marks a certificate revoked without deleting the record, and the public
page then says it was withdrawn.

## Handling personal data

- Aadhaar cards and payment screenshots are encrypted before storage and are readable only
  through `/api/admin/file`, which checks the admin session and records every view in
  `audit_log`.
- Delete documents you no longer need. The helper is `deletePrivateFile()` in
  `src/lib/server/uploads.ts`; the enrollment row keeps its history either way.
- Never forward these files over WhatsApp or email.
