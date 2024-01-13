import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const payment_method = await sql`SELECT * FROM climbing_gym.payment_method;`;
    return NextResponse.json({ payment_method: payment_method.rows }, { status: 200 });
}