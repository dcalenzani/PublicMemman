import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const fullname = url.searchParams.get('fullname');
        const phone = url.searchParams.get('phone');
        const users_id = url.searchParams.get('users_id');

        if (!fullname || !users_id || !phone) {
            throw new Error('All fields are required');
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                'INSERT INTO climbing_gym.emergency_contact (fullname, phone, users_id) VALUES ($1, $2, $3)',
                [fullname, phone, users_id]
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}