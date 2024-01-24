import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    await sql`
        DELETE FROM climbing_gym.student_attendance
        WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Attendance deleted successfully' }, { status: 200 });
}
