import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const lesson_id = url.searchParams.get('lesson_id');
    const student_id = url.searchParams.get('student_id');

    if (!lesson_id || !student_id) {
        throw new Error('Both lesson_id and student_id must be provided.');
    }

    await sql`INSERT INTO climbing_gym.student_attendance (lesson_id, student_id) VALUES (${lesson_id}, ${student_id});`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}