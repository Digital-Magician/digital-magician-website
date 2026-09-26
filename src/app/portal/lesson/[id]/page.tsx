import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import { courseLessons, lessonForStudent } from "@/lib/server/portal";
import LessonComplete from "@/components/portal/LessonComplete";

export const metadata: Metadata = {
  title: { absolute: "Class Recording | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = Number(id);
  if (!Number.isFinite(lessonId)) notFound();

  const user = await currentUser();
  if (!user) redirect("/portal/login");
  if (user.must_change_password) redirect("/portal/password");

  const lesson = await lessonForStudent(user.id, lessonId);
  if (!lesson) notFound();

  const siblings = await courseLessons(user.id, lesson.course_id);
  const index = siblings.findIndex((item) => item.id === lesson.id);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <Link href={`/portal/course/${lesson.course_slug}`}
          className="inline-flex items-center gap-2 text-white/45 hover:text-amber-brand font-body text-sm mb-5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {lesson.course_title}
        </Link>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video mb-6">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${lesson.youtube_id}?rel=0&modestbranding=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="text-amber-brand font-heading font-bold text-xs tracking-widest uppercase mb-2">
          {lesson.module_title}
        </div>
        <h1 className="heading-lg text-2xl sm:text-3xl text-white mb-4">{lesson.title}</h1>

        {lesson.description && (
          <p className="text-white/60 font-body leading-relaxed whitespace-pre-line mb-6">{lesson.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <LessonComplete lessonId={lesson.id} initial={lesson.completed} />
          {lesson.resource_url && (
            <a href={lesson.resource_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-white/70 hover:border-amber-brand/40 hover:text-amber-brand font-heading font-semibold text-sm transition-colors">
              <Download className="w-4 h-4" /> Class notes
            </a>
          )}
        </div>

        <div className="flex items-stretch gap-3">
          {previous ? (
            <Link href={`/portal/lesson/${previous.id}`}
              className="flex-1 bento p-4 hover:border-amber-brand/30 transition-colors group">
              <span className="flex items-center gap-2 text-white/40 font-body text-xs mb-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </span>
              <span className="block text-white/80 group-hover:text-amber-brand font-heading font-semibold text-sm line-clamp-2 transition-colors">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link href={`/portal/lesson/${next.id}`}
              className="flex-1 bento p-4 text-right hover:border-amber-brand/30 transition-colors group">
              <span className="flex items-center justify-end gap-2 text-white/40 font-body text-xs mb-1">
                Next <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="block text-white/80 group-hover:text-amber-brand font-heading font-semibold text-sm line-clamp-2 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </section>
  );
}
