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
  const url = new URL(request.url);
  const student_id = url.searchParams.get('student_id');
  const lesson_id = url.searchParams.get('lesson_id');
  let attendee;

  const client = await pool.connect();

  try {
    if (lesson_id) {
      attendee = await client.query(`
        SELECT 
          student_attendance.id as id,
          CONCAT(users.firstname, ' ', users.lastname) as Estudiante,
          CASE 
            WHEN student_attendance.attendance THEN 'asistio'
            ELSE 'no asistio'
          END as Asistencia,
          student_attendance.justification as Observaciones
        FROM climbing_gym.student_attendance 
        INNER JOIN 
          climbing_gym.users ON student_attendance.student_id = users.id
        WHERE lesson_id = $1;
      `, [lesson_id]);
    } else {
      attendee = await client.query('SELECT * FROM climbing_gym.student_attendance;');
    }

    return NextResponse.json({ attendee: attendee.rows }, { status: 200 });
  } finally {
    client.release();
  }
}
