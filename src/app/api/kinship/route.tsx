import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const parent_id = url.searchParams.get('parent_id');
    let children;

    try {
        const client = await pool.connect();

        if (parent_id) {
            children = await client.query(`SELECT * FROM climbing_gym.children WHERE parent_id = $1;`, [parent_id]);
        } else {
            children = await client.query(`SELECT * FROM climbing_gym.children;`);
        }

        client.release();
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ children: children.rows }, { status: 200 });
}