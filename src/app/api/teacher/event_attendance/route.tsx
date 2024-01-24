import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const url = new URL(request.url);
    const teacher_id = url.searchParams.get('teacher_id');
    const event_id = url.searchParams.get('event_id');
    let teachers;
        
    if (event_id) {
    teachers = await sql`
        SELECT 
            users.fullname as Profesor,
            worker.payment_method as 'Forma de Pago',
            TOCHAR(event_date::TIME, 'HH24:MI') as Hora,
            TOCHAR(duration, 'HH24:MI') as Duracion,
        FROM climbing_gym.event_teachers
        INNER JOIN climbing_gym.worker ON event_teachers.worker_id = worker.id
        INNER JOIN climbing_gym.users ON worker.users_id = users.id
        WHERE event_teachers.event_id = ${event_id};
        `;
    } else if (teacher_id && event_id) {
        teachers = await sql`
        INSERT INTO climbing_gym.event_teachers (event_id, worker_id)
        VALUES (${event_id}, ${teacher_id});
    `;
    } else {
        teachers = await sql`
        SELECT * FROM climbing_gym.event_teachers;
        `;
    }
    return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
}
