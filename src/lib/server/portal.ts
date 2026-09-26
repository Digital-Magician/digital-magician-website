import "server-only";
import { query, queryOne } from "./db";

export interface CourseSummary {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  lesson_count: number;
  completed_count: number;
}

export interface LessonRow {
  id: number;
  title: string;
  youtube_id: string;
  description: string | null;
  duration_label: string | null;
  resource_url: string | null;
  position: number;
  module_id: number;
  module_title: string;
  completed: boolean;
}

/** Courses a student has been given access to, with their progress. */
export async function studentCourses(userId: number): Promise<CourseSummary[]> {
  return query<CourseSummary>`
    SELECT c.id, c.slug, c.title, c.description,
           count(l.id)::int AS lesson_count,
           count(lp.lesson_id)::int AS completed_count
    FROM courses c
    JOIN course_access ca ON ca.course_id = c.id AND ca.user_id = ${userId}
    LEFT JOIN modules m ON m.course_id = c.id
    LEFT JOIN lessons l ON l.module_id = m.id AND l.is_published
    LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = ${userId}
    WHERE c.is_published
      AND (ca.expires_at IS NULL OR ca.expires_at > now())
    GROUP BY c.id
    ORDER BY c.position, c.title
  `;
}

export async function courseForStudent(userId: number, slug: string) {
  return queryOne<{ id: number; slug: string; title: string; description: string | null }>`
    SELECT c.id, c.slug, c.title, c.description
    FROM courses c
    JOIN course_access ca ON ca.course_id = c.id AND ca.user_id = ${userId}
    WHERE c.slug = ${slug}
      AND c.is_published
      AND (ca.expires_at IS NULL OR ca.expires_at > now())
  `;
}

/** Every published lesson of a course, in order, with completion flags. */
export async function courseLessons(userId: number, courseId: number): Promise<LessonRow[]> {
  return query<LessonRow>`
    SELECT l.id, l.title, l.youtube_id, l.description, l.duration_label, l.resource_url,
           l.position, m.id AS module_id, m.title AS module_title,
           (lp.lesson_id IS NOT NULL) AS completed
    FROM lessons l
    JOIN modules m ON m.id = l.module_id
    LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = ${userId}
    WHERE m.course_id = ${courseId} AND l.is_published
    ORDER BY m.position, m.id, l.position, l.id
  `;
}

/** A single lesson, only if the student's access covers its course. */
export async function lessonForStudent(userId: number, lessonId: number) {
  return queryOne<LessonRow & { course_id: number; course_slug: string; course_title: string }>`
    SELECT l.id, l.title, l.youtube_id, l.description, l.duration_label, l.resource_url,
           l.position, m.id AS module_id, m.title AS module_title,
           c.id AS course_id, c.slug AS course_slug, c.title AS course_title,
           (lp.lesson_id IS NOT NULL) AS completed
    FROM lessons l
    JOIN modules m ON m.id = l.module_id
    JOIN courses c ON c.id = m.course_id
    JOIN course_access ca ON ca.course_id = c.id AND ca.user_id = ${userId}
    LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = ${userId}
    WHERE l.id = ${lessonId}
      AND l.is_published
      AND c.is_published
      AND (ca.expires_at IS NULL OR ca.expires_at > now())
  `;
}

export async function setLessonProgress(userId: number, lessonId: number, completed: boolean) {
  if (completed) {
    await query`
      INSERT INTO lesson_progress (user_id, lesson_id) VALUES (${userId}, ${lessonId})
      ON CONFLICT (user_id, lesson_id) DO NOTHING
    `;
  } else {
    await query`DELETE FROM lesson_progress WHERE user_id = ${userId} AND lesson_id = ${lessonId}`;
  }
}

/** Accepts a full YouTube URL or a bare id and returns the 11-character id. */
export function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  return null;
}
