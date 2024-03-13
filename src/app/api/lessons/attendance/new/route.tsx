import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const lesson_id = url.searchParams.get('lesson_id');
        const student_id = url.searchParams.get('student_id');

        if (!lesson_id || !student_id) {
            throw new Error('Both lesson_id and student_id must be provided.');
        }

        const client = await pool.connect();
        await client.query('BEGIN');

        try {
            await client.query('INSERT INTO climbing_gym.student_attendance (lesson_id, student_id) VALUES ($1, $2)', [lesson_id, student_id]);
            await client.query('COMMIT');
            return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}