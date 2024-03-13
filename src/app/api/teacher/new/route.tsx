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
        const users_id = url.searchParams.get('users_id');
        const payment_method = url.searchParams.get('payment_method');

        if (!users_id) {
            throw new Error('Users_id must be provided.');
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            await client.query(
                `INSERT INTO climbing_gym.worker (roles_id, users_id, payment_method)
                 VALUES (3, $1, $2)`,
                [users_id, payment_method]
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