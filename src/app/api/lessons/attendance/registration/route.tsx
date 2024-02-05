import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const justification = url.searchParams.get('justification');
        const attendance = url.searchParams.get('attendance');
        
        if (!attendance || !justification || !id ) {
            throw new Error('Attendance is required');
        }
        await sql`UPDATE climbing_gym.student_attendance SET attendance = ${attendance}, justification = ${justification} WHERE id= ${id};`;
        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
        } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}