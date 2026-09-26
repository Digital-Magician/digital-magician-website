import { query } from "@/lib/server/db";
import CreateStudent from "@/components/admin/CreateStudent";
import ResetPassword from "@/components/admin/ResetPassword";
import { grantCourseAccess, revokeCourseAccess, setStudentActive } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface StudentRow {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  must_change_password: boolean;
  last_login_at: string | null;
  created_at: string;
  courses: { id: number; title: string }[] | null;
}

export default async function StudentsPage() {
  const courses = await query<{ id: number; title: string }>`
    SELECT id, title FROM courses ORDER BY position, title
  `;

  const students = await query<StudentRow>`
    SELECT u.id, u.full_name, u.email, u.phone, u.is_active, u.must_change_password,
           u.last_login_at, u.created_at,
           coalesce(
             json_agg(json_build_object('id', c.id, 'title', c.title))
               FILTER (WHERE c.id IS NOT NULL), '[]'
           ) AS courses
    FROM users u
    LEFT JOIN course_access ca ON ca.user_id = u.id
    LEFT JOIN courses c ON c.id = ca.course_id
    WHERE u.role = 'student'
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `;

  return (
    <div>
      <CreateStudent courses={courses} />

      {students.length === 0 ? (
        <div className="bento p-8 text-center text-white/45 font-body text-sm">
          No students yet. Add one above, then share the login on WhatsApp.
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="bento p-5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-white font-heading font-bold">{student.full_name}</h2>
                    {!student.is_active && (
                      <span className="rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[11px] text-red-300 font-heading font-semibold">
                        disabled
                      </span>
                    )}
                    {student.must_change_password && (
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/50 font-heading font-semibold">
                        temporary password
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 font-body text-sm mt-1">
                    {student.email}{student.phone ? ` · ${student.phone}` : ""}
                  </p>
                  <p className="text-white/30 font-body text-xs mt-0.5">
                    {student.last_login_at
                      ? `Last signed in ${new Date(student.last_login_at).toLocaleDateString("en-IN")}`
                      : "Has not signed in yet"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <ResetPassword userId={student.id} />
                  <form action={setStudentActive}>
                    <input type="hidden" name="id" value={student.id} />
                    <input type="hidden" name="active" value={String(!student.is_active)} />
                    <button type="submit"
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-white/60 font-heading font-semibold text-xs hover:border-amber-brand/40 hover:text-amber-brand transition-colors">
                      {student.is_active ? "Disable" : "Enable"}
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
                {(student.courses ?? []).map((course) => (
                  <form key={course.id} action={revokeCourseAccess} className="inline-flex">
                    <input type="hidden" name="userId" value={student.id} />
                    <input type="hidden" name="courseId" value={course.id} />
                    <button type="submit" title="Remove access"
                      className="rounded-full border border-amber-brand/30 bg-amber-brand/10 px-3 py-1 text-amber-brand font-heading font-semibold text-xs hover:border-red-400/40 hover:text-red-300 transition-colors">
                      {course.title} &times;
                    </button>
                  </form>
                ))}

                {courses.length > 0 && (
                  <form action={grantCourseAccess} className="inline-flex items-center gap-2">
                    <input type="hidden" name="userId" value={student.id} />
                    <select name="courseId" required
                      className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 text-white/70 font-body text-xs focus:border-amber-brand/50 focus:outline-none">
                      <option value="">Give access to…</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-lg border border-white/15 px-3 py-1.5 text-white/60 font-heading font-semibold text-xs hover:border-amber-brand/40 hover:text-amber-brand transition-colors">
                      Add
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
