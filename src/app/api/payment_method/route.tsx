import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM climbing_gym.payment_method');
        return NextResponse.json({ payment_method: result.rows }, { status: 200 });
    } finally {
        client.release();
    }
}