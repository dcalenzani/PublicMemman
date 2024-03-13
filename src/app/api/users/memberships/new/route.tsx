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
        const product_id = url.searchParams.get('product_id');
        const entry_date = url.searchParams.get('entry_date');
        const end_date = url.searchParams.get('end_date');

        let products;

        if (!users_id || !product_id || !entry_date || !end_date) {
            throw new Error('All fields are required');
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                `INSERT INTO climbing_gym.membership (users_id, product_id, entry_date, end_date)
                 VALUES ($1, $2, $3, $4)`,
                [users_id, product_id, entry_date, end_date]
            );

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
