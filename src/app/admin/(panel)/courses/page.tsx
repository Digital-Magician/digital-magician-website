import { Trash2 } from "lucide-react";
import { query } from "@/lib/server/db";
import { createCourse, createLesson, createModule, deleteLesson } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface ModuleRow {
  id: number;
  title: string;
  course_id: number;
  course_title: string;
  lessons: { id: number; title: string; duration_label: string | null }[] | null;
}

const field =
  "w-full rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-white font-body text-sm placeholder:text-white/30 focus:border-amber-brand/50 focus:outline-none";

export default async function CoursesPage() {
  const courses = await query<{ id: number; title: string; slug: string }>`
    SELECT id, title, slug FROM courses ORDER BY position, title
  `;

  const modules = await query<ModuleRow>`
    SELECT m.id, m.title, m.course_id, c.title AS course_title,
           coalesce(
             json_agg(json_build_object('id', l.id, 'title', l.title, 'duration_label', l.duration_label)
                      ORDER BY l.position, l.id) FILTER (WHERE l.id IS NOT NULL), '[]'
           ) AS lessons
    FROM modules m
    JOIN courses c ON c.id = m.course_id
    LEFT JOIN lessons l ON l.module_id = m.id
    GROUP BY m.id, c.id
    ORDER BY c.position, c.title, m.position, m.id
  `;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-4">
        <form action={createCourse} className="bento p-5 space-y-3">
          <h2 className="font-heading font-bold text-white text-sm">New course</h2>
          <input name="title" required placeholder="Course name, e.g. Full Stack Batch, Oct 2026" className={field} />
          <input name="description" placeholder="Short description (optional)" className={field} />
          <button type="submit" className="btn-primary w-full py-2.5 text-sm justify-center">Create course</button>
        </form>

        <form action={createModule} className="bento p-5 space-y-3">
          <h2 className="font-heading font-bold text-white text-sm">New module</h2>
          <select name="courseId" required className={field} defaultValue="">
            <option value="" disabled>Choose the course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          <input name="title" required placeholder="Module name, e.g. Month 1: Foundations" className={field} />
          <button type="submit" className="btn-primary w-full py-2.5 text-sm justify-center">Add module</button>
        </form>
      </div>

      <form action={createLesson} className="bento p-5 space-y-3">
        <h2 className="font-heading font-bold text-white text-sm">Add a class recording</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <select name="moduleId" required className={field} defaultValue="">
            <option value="" disabled>Choose the module</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.course_title} · {module.title}
              </option>
            ))}
          </select>
          <input name="title" required placeholder="Class title, e.g. Day 4: Meta Pixel setup" className={field} />
          <input name="youtube" required placeholder="YouTube link or video id" className={field} />
          <input name="duration" placeholder="Length, e.g. 1 hr 20 min (optional)" className={field} />
          <input name="resource" placeholder="Notes or slides link (optional)" className={field} />
          <input name="description" placeholder="What this class covers (optional)" className={field} />
        </div>
        <p className="text-white/35 font-body text-xs">
          Upload the recording to YouTube as Unlisted, then paste the link here. Unlisted videos do not
          appear in search or on your channel, but anyone with the link can watch, so keep the link inside the portal.
        </p>
        <button type="submit" className="btn-primary w-full py-2.5 text-sm justify-center">Add class</button>
      </form>

      {modules.length === 0 ? (
        <div className="bento p-8 text-center text-white/45 font-body text-sm">
          Create a course, then a module, then add your recordings.
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="bento p-5">
              <div className="text-white/40 font-heading font-semibold text-xs tracking-widest uppercase mb-1">
                {module.course_title}
              </div>
              <h3 className="text-white font-heading font-bold mb-3">{module.title}</h3>

              {(module.lessons ?? []).length === 0 ? (
                <p className="text-white/35 font-body text-sm">No classes in this module yet.</p>
              ) : (
                <ul className="space-y-1.5">
                  {(module.lessons ?? []).map((lesson, index) => (
                    <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.03]">
                      <span className="text-white/75 font-body text-sm">
                        <span className="text-white/30 mr-2">{String(index + 1).padStart(2, "0")}</span>
                        {lesson.title}
                        {lesson.duration_label && (
                          <span className="text-white/30 text-xs ml-2">{lesson.duration_label}</span>
                        )}
                      </span>
                      <form action={deleteLesson}>
                        <input type="hidden" name="id" value={lesson.id} />
                        <button type="submit" title="Delete class"
                          className="text-white/30 hover:text-red-300 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
