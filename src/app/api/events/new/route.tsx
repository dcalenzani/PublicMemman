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
        const eventDate = url.searchParams.get('event_date');
        const duration = url.searchParams.get('duration');
        const description = url.searchParams.get('description');

        if (!eventDate || !duration) {
            throw new Error('All fields are required');
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            await client.query(
                `INSERT INTO climbing_gym.special_event 
                (event_date, product_id, duration, descr)
                VALUES
                ($1, 4, $2, $3)`,
                [eventDate, duration, description]
            );

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