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
        const parent_id = url.searchParams.get('parent_id');
        const users_id = url.searchParams.get('users_id');

        if (!parent_id || !users_id) {
            throw new Error('Both parent_id and users_id must be provided.');
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query('INSERT INTO climbing_gym.children (parent_id, users_id) VALUES ($1, $2)', [parent_id, users_id]);

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