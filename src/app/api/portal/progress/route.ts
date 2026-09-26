import { NextResponse } from "next/server";
import { currentUser } from "@/lib/server/auth";
import { lessonForStudent, setLessonProgress } from "@/lib/server/portal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    lessonId?: number;
    completed?: boolean;
  } | null;

  if (!body?.lessonId) {
    return NextResponse.json({ error: "Missing lesson." }, { status: 400 });
  }

  // Confirms the lesson belongs to a course this student can open.
  const lesson = await lessonForStudent(user.id, body.lessonId);
  if (!lesson) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });

  await setLessonProgress(user.id, body.lessonId, body.completed !== false);
  return NextResponse.json({ ok: true });
}
