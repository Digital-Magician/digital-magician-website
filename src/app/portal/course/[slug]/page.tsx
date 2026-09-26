import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import { courseForStudent, courseLessons, type LessonRow } from "@/lib/server/portal";

export const metadata: Metadata = {
  title: { absolute: "Course | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await currentUser();
  if (!user) redirect("/portal/login");
  if (user.must_change_password) redirect("/portal/password");

  const course = await courseForStudent(user.id, slug);
  if (!course) notFound();

  const lessons = await courseLessons(user.id, course.id);
  const completed = lessons.filter((lesson) => lesson.completed).length;
  const nextLesson = lessons.find((lesson) => !lesson.completed) ?? lessons[0];

  // Lessons arrive ordered, so grouping keeps the taught sequence.
  const modules: { id: number; title: string; lessons: LessonRow[] }[] = [];
  for (const lesson of lessons) {
    const last = modules[modules.length - 1];
    if (last && last.id === lesson.module_id) last.lessons.push(lesson);
    else modules.push({ id: lesson.module_id, title: lesson.module_title, lessons: [lesson] });
  }

  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/portal" className="inline-flex items-center gap-2 text-white/45 hover:text-amber-brand font-body text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> My classes
        </Link>

        <h1 className="heading-lg text-3xl sm:text-4xl text-white mb-3">{course.title}</h1>
        {course.description && <p className="text-white/55 font-body mb-6">{course.description}</p>}

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <span className="text-white/45 font-body text-sm">
            {completed} of {lessons.length} classes watched
          </span>
          {nextLesson && (
            <Link href={`/portal/lesson/${nextLesson.id}`} className="btn-primary px-6 py-3 text-sm gap-2">
              <PlayCircle className="w-4 h-4" />
              {completed === 0 ? "Start the first class" : completed === lessons.length ? "Rewatch" : "Continue"}
            </Link>
          )}
        </div>

        {lessons.length === 0 ? (
          <div className="bento p-8 text-center text-white/55 font-body text-sm">
            Recordings for this course have not been uploaded yet.
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module, index) => (
              <div key={module.id} className="bento p-5 sm:p-6">
                <h2 className="font-heading font-bold text-white text-sm tracking-widest uppercase text-white/50 mb-4">
                  {String(index + 1).padStart(2, "0")} &middot; {module.title}
                </h2>
                <ul className="space-y-1.5">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link href={`/portal/lesson/${lesson.id}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/[0.04] transition-colors group">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-amber-brand flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-white/25 flex-shrink-0" />
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-white/85 group-hover:text-white font-body text-sm truncate">
                            {lesson.title}
                          </span>
                        </span>
                        {lesson.duration_label && (
                          <span className="text-white/35 font-body text-xs flex-shrink-0">{lesson.duration_label}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
