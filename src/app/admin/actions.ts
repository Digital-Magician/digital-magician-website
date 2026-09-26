"use server";

import { revalidatePath } from "next/cache";
import { query, queryOne } from "@/lib/server/db";
import { requireRole } from "@/lib/server/auth";
import { parseYouTubeId } from "@/lib/server/portal";

async function admin() {
  const user = await requireRole("admin");
  if (!user) throw new Error("Not authorised.");
  return user;
}

async function log(actorId: number, action: string, entity: string, entityId: string, meta?: unknown) {
  await query`
    INSERT INTO audit_log (actor_user_id, action, entity, entity_id, meta)
    VALUES (${actorId}, ${action}, ${entity}, ${entityId}, ${meta ? JSON.stringify(meta) : null})
  `;
}

// ── Enrollments ──────────────────────────────────────────────────────────────

export async function setEnrollmentStatus(formData: FormData) {
  const user = await admin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  const note = String(formData.get("note") ?? "").trim();

  if (!id || !["new", "verified", "rejected"].includes(status)) return;

  await query`
    UPDATE enrollments SET
      status = ${status},
      admin_notes = CASE WHEN ${note || null}::text IS NULL THEN admin_notes ELSE ${note} END,
      verified_by = ${status === "verified" ? user.id : null},
      verified_at = ${status === "verified" ? new Date().toISOString() : null}
    WHERE id = ${id}
  `;
  await log(user.id, `enrollment.${status}`, "enrollment", String(id));
  revalidatePath("/admin/enrollments");
  revalidatePath("/admin");
}

export async function markPaymentReceived(formData: FormData) {
  const user = await admin();
  const id = Number(formData.get("id"));
  if (!id) return;

  await query`
    UPDATE enrollments SET
      payment_status = 'paid',
      amount_paid_paise = GREATEST(amount_paid_paise, amount_due_now_paise)
    WHERE id = ${id}
  `;
  await log(user.id, "enrollment.payment_marked_paid", "enrollment", String(id));
  revalidatePath("/admin/enrollments");
}

// ── Students ─────────────────────────────────────────────────────────────────

export async function setStudentActive(formData: FormData) {
  const user = await admin();
  const id = Number(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  if (!id || id === user.id) return;

  await query`
    UPDATE users SET is_active = ${active}, token_version = token_version + 1
    WHERE id = ${id} AND role = 'student'
  `;
  await log(user.id, active ? "student.activated" : "student.deactivated", "user", String(id));
  revalidatePath("/admin/students");
}

export async function grantCourseAccess(formData: FormData) {
  const user = await admin();
  const userId = Number(formData.get("userId"));
  const courseId = Number(formData.get("courseId"));
  if (!userId || !courseId) return;

  await query`
    INSERT INTO course_access (user_id, course_id) VALUES (${userId}, ${courseId})
    ON CONFLICT (user_id, course_id) DO NOTHING
  `;
  await log(user.id, "student.course_granted", "user", String(userId), { courseId });
  revalidatePath("/admin/students");
}

export async function revokeCourseAccess(formData: FormData) {
  const user = await admin();
  const userId = Number(formData.get("userId"));
  const courseId = Number(formData.get("courseId"));
  if (!userId || !courseId) return;

  await query`DELETE FROM course_access WHERE user_id = ${userId} AND course_id = ${courseId}`;
  await log(user.id, "student.course_revoked", "user", String(userId), { courseId });
  revalidatePath("/admin/students");
}

// ── Courses, modules, lessons ────────────────────────────────────────────────

export async function createCourse(formData: FormData) {
  const user = await admin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (title.length < 3) return;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  await query`
    INSERT INTO courses (slug, title, description) VALUES (${slug}, ${title}, ${description || null})
    ON CONFLICT (slug) DO NOTHING
  `;
  await log(user.id, "course.created", "course", slug);
  revalidatePath("/admin/courses");
}

export async function createModule(formData: FormData) {
  const user = await admin();
  const courseId = Number(formData.get("courseId"));
  const title = String(formData.get("title") ?? "").trim();
  if (!courseId || title.length < 2) return;

  const next = await queryOne<{ position: number }>`
    SELECT coalesce(max(position), 0) + 1 AS position FROM modules WHERE course_id = ${courseId}
  `;
  await query`
    INSERT INTO modules (course_id, title, position)
    VALUES (${courseId}, ${title}, ${next?.position ?? 1})
  `;
  await log(user.id, "module.created", "course", String(courseId), { title });
  revalidatePath("/admin/courses");
}

export async function createLesson(formData: FormData) {
  const user = await admin();
  const moduleId = Number(formData.get("moduleId"));
  const title = String(formData.get("title") ?? "").trim();
  const youtube = String(formData.get("youtube") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = String(formData.get("duration") ?? "").trim();
  const resource = String(formData.get("resource") ?? "").trim();

  const youtubeId = parseYouTubeId(youtube);
  if (!moduleId || title.length < 2 || !youtubeId) return;

  const next = await queryOne<{ position: number }>`
    SELECT coalesce(max(position), 0) + 1 AS position FROM lessons WHERE module_id = ${moduleId}
  `;
  await query`
    INSERT INTO lessons (module_id, title, youtube_id, description, duration_label, resource_url, position)
    VALUES (${moduleId}, ${title}, ${youtubeId}, ${description || null}, ${duration || null},
            ${resource || null}, ${next?.position ?? 1})
  `;
  await log(user.id, "lesson.created", "module", String(moduleId), { title, youtubeId });
  revalidatePath("/admin/courses");
}

export async function deleteLesson(formData: FormData) {
  const user = await admin();
  const id = Number(formData.get("id"));
  if (!id) return;

  await query`DELETE FROM lessons WHERE id = ${id}`;
  await log(user.id, "lesson.deleted", "lesson", String(id));
  revalidatePath("/admin/courses");
}

// ── Certificates ─────────────────────────────────────────────────────────────

export async function issueCertificate(formData: FormData) {
  const user = await admin();
  const number = String(formData.get("number") ?? "").trim().toUpperCase();
  const studentName = String(formData.get("studentName") ?? "").trim();
  const programName = String(formData.get("programName") ?? "").trim();
  const issuedOn = String(formData.get("issuedOn") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim();

  if (number.length < 4 || studentName.length < 3 || programName.length < 3 || !issuedOn) return;

  await query`
    INSERT INTO certificates (certificate_number, student_name, program_name, issued_on, grade, created_by)
    VALUES (${number}, ${studentName}, ${programName}, ${issuedOn}::date, ${grade || null}, ${user.id})
    ON CONFLICT (certificate_number) DO UPDATE SET
      student_name = EXCLUDED.student_name,
      program_name = EXCLUDED.program_name,
      issued_on = EXCLUDED.issued_on,
      grade = EXCLUDED.grade,
      status = 'valid',
      revoked_reason = NULL
  `;
  await log(user.id, "certificate.issued", "certificate", number);
  revalidatePath("/admin/certificates");
}

export async function setCertificateStatus(formData: FormData) {
  const user = await admin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  const reason = String(formData.get("reason") ?? "").trim();
  if (!id || !["valid", "revoked"].includes(status)) return;

  await query`
    UPDATE certificates SET
      status = ${status},
      revoked_reason = ${status === "revoked" ? reason || "Withdrawn by the institute" : null}
    WHERE id = ${id}
  `;
  await log(user.id, `certificate.${status}`, "certificate", String(id));
  revalidatePath("/admin/certificates");
}
