import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const url = new URL(request.url);
    const event_id = url.searchParams.get('event_id');
    let teachers;
        
    if (event_id) {
    teachers = await sql`
    SELECT
        event_teachers.id,
        event_teachers.event_id,
        users.fullname AS profesor,
        payment_method.descr AS "metodo de pago"
    FROM 
        climbing_gym.event_teachers
    JOIN 
        climbing_gym.worker ON climbing_gym.event_teachers.teacher_id = worker.users_id 
    JOIN 
        climbing_gym.users ON climbing_gym.worker.users_id = users.id
    JOIN 
        climbing_gym.special_event ON climbing_gym.event_teachers.event_id = special_event.id
    JOIN 
        climbing_gym.payment_method ON climbing_gym.worker.payment_method = payment_method.id
        WHERE event_id = ${event_id};
        `;
    } else {
        teachers = await sql`
        SELECT * FROM climbing_gym.event_teachers;
        `;
    }
    return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
}
