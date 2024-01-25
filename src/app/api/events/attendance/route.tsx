import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const url = new URL(request.url);
    const teacher_id = url.searchParams.get('teacher_id');
    const event_id = url.searchParams.get('event_id');
    let teachers;
        
    if (event_id) {
    teachers = await sql`
        SELECT * FROM climbing_gym.event_teachers;
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
