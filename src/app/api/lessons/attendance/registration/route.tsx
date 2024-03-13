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
        const id = url.searchParams.get('id');
        const justification = url.searchParams.get('justification');
        const attendance = url.searchParams.get('attendance');

        if (!attendance || !justification || !id) {
            throw new Error('Attendance is required');
        }

        const client = await pool.connect();
        await client.query('BEGIN');
        await client.query('UPDATE climbing_gym.student_attendance SET attendance = $1, justification = $2 WHERE id = $3', [attendance, justification, id]);
        await client.query('COMMIT');
        client.release();

        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}