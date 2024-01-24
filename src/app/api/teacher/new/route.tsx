import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const payment_method = url.searchParams.get('payment_method');

    if (!users_id) {
        throw new Error('Users_id must be provided.');
    }

    await sql`
        INSERT INTO climbing_gym.worker
            (roles_id, users_id, payment_method)
        VALUES
            (3, ${users_id}, ${payment_method});`;

    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}