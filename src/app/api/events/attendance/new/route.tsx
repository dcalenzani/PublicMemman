import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const event_id = url.searchParams.get('event_id');
    const teacher_id = url.searchParams.get('teacher_id');

    if (!event_id || !teacher_id) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await sql`
        INSERT INTO climbing_gym.event_teachers (event_id, teacher_id) VALUES (${event_id}, ${teacher_id});
    `;

    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}