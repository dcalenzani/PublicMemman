import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            throw new Error('ID is required');
        }

        const client = await pool.connect();
        await client.query('BEGIN');

        await client.query('DELETE FROM climbing_gym.special_event WHERE id = $1', [id]);

        await client.query('COMMIT');
        client.release();

        return NextResponse.json({ message: 'Delete successful' }, { status: 200 });
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}