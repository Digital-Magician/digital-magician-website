import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, PlayCircle } from "lucide-react";
import { currentUser } from "@/lib/server/auth";
import { studentCourses } from "@/lib/server/portal";
import LogoutButton from "@/components/portal/LogoutButton";

export const metadata: Metadata = {
  title: { absolute: "My Classes | Digital Magician" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const user = await currentUser();
  if (!user) redirect("/portal/login");
  if (user.must_change_password) redirect("/portal/password");

  const courses = await studentCourses(user.id);
  const firstName = user.full_name.split(" ")[0];

  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-midnight">
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="heading-lg text-3xl sm:text-4xl text-white mb-2">
              Hello, <span className="text-gradient-amber">{firstName}</span>
            </h1>
            <p className="text-white/55 font-body text-sm">
              Your class recordings, in the order we taught them.
            </p>
          </div>
          <LogoutButton className="mt-2 flex-shrink-0" />
        </div>

        {courses.length === 0 ? (
          <div className="bento p-8 text-center">
            <BookOpen className="w-10 h-10 text-amber-brand mx-auto mb-4" />
            <h2 className="font-heading font-bold text-white text-lg mb-2">No classes yet</h2>
            <p className="text-white/55 font-body text-sm">
              Your course will appear here as soon as the team adds you to a batch. If you have just
              enrolled, message us on WhatsApp at +91 79882 27240.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const percent =
                course.lesson_count > 0
                  ? Math.round((course.completed_count / course.lesson_count) * 100)
                  : 0;
              return (
                <Link key={course.id} href={`/portal/course/${course.slug}`} className="block bento p-6 hover:border-amber-brand/30 transition-colors group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="font-heading font-bold text-white text-lg group-hover:text-amber-brand transition-colors">
                        {course.title}
                      </h2>
                      {course.description && (
                        <p className="text-white/50 font-body text-sm mt-1.5 line-clamp-2">{course.description}</p>
                      )}
                    </div>
                    <PlayCircle className="w-6 h-6 text-amber-brand flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-white/[0.07] overflow-hidden">
                      <div className="h-full rounded-full bg-amber-brand transition-all" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-white/45 font-body text-xs whitespace-nowrap">
                      {course.completed_count} of {course.lesson_count} watched
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/portal/password" className="text-white/40 hover:text-amber-brand font-body text-xs underline underline-offset-4">
            Change my password
          </Link>
        </div>
      </div>
    </section>
  );
}
