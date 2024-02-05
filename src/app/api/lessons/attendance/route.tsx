import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const url = new URL(request.url);
  const student_id = url.searchParams.get('student_id');
  const lesson_id = url.searchParams.get('lesson_id');
  let attendee;
    
  if (lesson_id) {
    attendee = await sql`
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
     WHERE lesson_id = ${lesson_id};
    `;
  } else {
    attendee = await sql`
    SELECT * FROM climbing_gym.student_attendance;
    `;
  }

  return NextResponse.json({ attendee: attendee.rows }, { status: 200 });

}
