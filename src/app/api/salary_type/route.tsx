import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const salary_type = await sql`SELECT * FROM climbing_gym.salary_type;`;
    return NextResponse.json({ salary_type: salary_type.rows }, { status: 200 });
}