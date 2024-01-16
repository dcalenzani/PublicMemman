import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const teacher_id = url.searchParams.get('teacher_id');
    const lesson_date = url.searchParams.get('lesson_date');
    const duration = url.searchParams.get('duration');

    if (!teacher_id || !lesson_date) {
        throw new Error('Both teacher_id and lesson_date must be provided.');
    }

    await sql`INSERT INTO climbing_gym.lesson (teacher_id, lesson_date, duration) VALUES (${teacher_id}, ${lesson_date}, ${duration});`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/* http://localhost:3000/api/lessons/new?teacher_id=743333333&lesson_date=2024-01-19+15%3A30&duration= */