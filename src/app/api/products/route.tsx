import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const product_id = url.searchParams.get('product_id');
    const entry_date = url.searchParams.get('entry_date');
    const end_date = url.searchParams.get('end_date');

    let products;
    try {
        const client = await pool.connect();
        products = await client.query('SELECT * FROM climbing_gym.product');
        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ product: products.rows }, { status: 200 });
}
