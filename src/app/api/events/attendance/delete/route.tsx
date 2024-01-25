import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const teacher_id = url.searchParams.get('teacher_id');
    const event_id = url.searchParams.get('event_id');

    if (!teacher_id) {
        return NextResponse.json({ error: 'Missing teacher_id parameter' }, { status: 400 });
    }

    await sql`
        DELETE FROM climbing_gym.event_teachers
        WHERE teacher_id = ${teacher_id} AND event_id = ${event_id};
    `;

    return NextResponse.json({ message: 'Attendance deleted successfully' }, { status: 200 });
}
