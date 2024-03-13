import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: 'your_connection_string_here',
});

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const event_id = url.searchParams.get('event_id');
        const teacher_id = url.searchParams.get('teacher_id');

        if (!event_id || !teacher_id) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query('INSERT INTO climbing_gym.event_teachers (event_id, teacher_id) VALUES ($1, $2)', [event_id, teacher_id]);

            await client.query('COMMIT');

            return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error:', (error as Error).message);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}