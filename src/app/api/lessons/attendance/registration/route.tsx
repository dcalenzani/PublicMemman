import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const lesson_id = url.searchParams.get('lesson_id');
        const student_id = url.searchParams.get('student_id');
        const attendance = url.searchParams.get('attendance');
        const justification = url.searchParams.get('justification');
        
        if (!attendance || !justification || !lesson_id || !student_id) {
            throw new Error('lesson_id and student_id are required');
        }
        await sql`UPDATE climbing_gym.student_attendance SET attendance = ${attendance}, justification = ${justification} WHERE lesson_id = ${lesson_id} AND student_id = ${student_id};`;
        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
        } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}