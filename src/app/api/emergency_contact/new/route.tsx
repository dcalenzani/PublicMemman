import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const fullname = url.searchParams.get('fullname');
    const phone = url.searchParams.get('phone');
    const users_id = url.searchParams.get('users_id');

    if (!fullname || !users_id || !phone) {
        throw new Error('All fields are required');
    }

    await sql`INSERT INTO climbing_gym.emergency_contact (fullname, phone, users_id) VALUES (${fullname}, ${phone}, ${users_id});`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}