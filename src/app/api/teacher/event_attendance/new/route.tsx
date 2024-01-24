import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const event_id = url.searchParams.get('event_id');
    const teacher_id = url.searchParams.get('event_date');

    if (!event_id || !teacher_id) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await sql`
        INSERT INTO climbing_gym.event_teachers (event_id, teacher_id) VALUES (${event_id}, ${teacher_id});
    `;

    return NextResponse.json({ message: 'Event creation succesfull' }, { status: 200 });
}