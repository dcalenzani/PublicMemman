import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const timestamp = url.searchParams.get('timestamp');
    const id = url.searchParams.get('id');
    let lessons;

    const client = await pool.connect();

    if (date) {
      lessons = await client.query(`
      SELECT 
        lesson.id as id,
        lesson.lesson_date::TIME as hora, 
        TO_CHAR(lesson.duration, 'HH24:MI') AS duracion,
        CONCAT(users.firstname, ' ', users.lastname) AS Profesor,
        COUNT(DISTINCT student_attendance.student_id) AS Alumnos
      FROM 
        climbing_gym.lesson
      INNER JOIN 
        climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
        climbing_gym.users ON worker.users_id = users.id
      LEFT JOIN
        climbing_gym.student_attendance ON lesson.id = student_attendance.lesson_id
      WHERE lesson.lesson_date::DATE = $1
      GROUP BY
        lesson.id,
        hora,
        duracion,
        Profesor;
      `, [date]);
    } else if (timestamp) { 
      lessons = await client.query(`
      SELECT 
        lesson.id as id,
        lesson.lesson_date::TIME as lesson_time, 
        lesson.lesson_date::DATE as lesson_date,
        TO_CHAR(lesson.duration, 'HH24:MI') AS duration,
        CONCAT(users.firstname, ' ', users.lastname) AS Profesor
      FROM 
        climbing_gym.lesson
      INNER JOIN 
          climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
      climbing_gym.users ON worker.users_id = users.id
      WHERE lesson.lesson_date = $1;
      `, [timestamp]);
    } else if (id){
      lessons = await client.query(`
      SELECT
      lesson.id,
      TO_CHAR(lesson.lesson_date::DATE, 'DD-MM-YYYY') as lesson_date,
      lesson.lesson_date::TIME as lesson_time,
      TO_CHAR(lesson.duration, 'HH24:MI') AS duration,
      CONCAT(users.firstname, ' ', users.lastname) AS teacher
      FROM climbing_gym.lesson
      INNER JOIN climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN climbing_gym.users ON worker.users_id = users.id
      WHERE lesson.id = $1;
      `, [id]);
    } else {
      lessons = await client.query(`
      SELECT 
      lesson.id as id,
      lesson.lesson_date::DATE as fecha,
      lesson.lesson_date::TIME as hora, 
      TO_CHAR(lesson.duration, 'HH24:MI') AS duracion,
      CONCAT(users.firstname, ' ', users.lastname) AS Profesor
      FROM 
          climbing_gym.lesson
      INNER JOIN 
          climbing_gym.worker ON lesson.teacher_id = worker.users_id
      INNER JOIN 
      climbing_gym.users ON worker.users_id = users.id
      `);
    }

    client.release();

    return NextResponse.json({ lessons: lessons.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}