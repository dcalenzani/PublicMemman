import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const timestamp = url.searchParams.get('timestamp');
    const id = url.searchParams.get('id');
    let lessons;

    if (date) {
      lessons = await sql`
      SELECT 
      lesson.id as id,
      lesson.lesson_date::TIME as hora, 
      TO_CHAR(lesson.duration, 'HH24:MI') AS duracion,
      users.fullname AS Profesor
      FROM 
          climbing_gym.lesson
      INNER JOIN 
          climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
      climbing_gym.users ON worker.users_id = users.id
      WHERE lesson.lesson_date::DATE = ${date};
      `;
    } else if (timestamp) { 
      lessons = await sql`
      SELECT 
      lesson.id as id,
      lesson.lesson_date::TIME as lesson_time, 
      lesson.lesson_date::DATE as lesson_date,
      TO_CHAR(lesson.duration, 'HH24:MI') AS duration,
      users.fullname AS Profesor
      FROM 
          climbing_gym.lesson
      INNER JOIN 
          climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
      climbing_gym.users ON worker.users_id = users.id
      WHERE lesson.lesson_date = ${timestamp};
      `;
    } else if (id){
      lessons = await sql 
      `SELECT
      lesson.id,
      lesson.lesson_date::DATE as lesson_date,
      lesson.lesson_date::TIME as lesson_time,
      TO_CHAR(lesson.duration, 'HH24:MI') AS duration,
      users.fullname as teacher
      FROM climbing_gym.lesson
      INNER JOIN climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN climbing_gym.users ON worker.users_id = users.id
      WHERE lesson.id = ${id};`;
    } else {
      lessons = await sql`
      SELECT 
      lesson.id as id,
      lesson.lesson_date::DATE as fecha,
      lesson.lesson_date::TIME as hora, 
      TO_CHAR(lesson.duration, 'HH24:MI') AS duracion,
      users.fullname AS Profesor
      FROM 
          climbing_gym.lesson
      INNER JOIN 
          climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
      climbing_gym.users ON worker.users_id = users.id
      `;
    }
    return NextResponse.json({ lessons: lessons.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}