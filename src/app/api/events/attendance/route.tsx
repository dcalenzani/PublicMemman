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
            event_teachers.id,
            users.fullname AS profesor,
            payment_method.descr AS metodo_pago,
        FROM climbing_gym.event_teachers
            LEFT JOIN climbing_gym.users ON event_teachers.teacher_id = users.id
            LEFT JOIN climbing_gym.worker ON event_teachers.teacher_id = worker.users_id 
            LEFT JOIN climbing_gym.special_event ON event_teachers.event_id = special_event.id
            LEFT JOIN climbing_gym.payment_method ON worker.payment_method = payment_method.id
        WHERE event_id = ${event_id};
        `;
    } else {
        teachers = await sql`
        SELECT * FROM climbing_gym.event_teachers;
        `;
    }
    return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
}
