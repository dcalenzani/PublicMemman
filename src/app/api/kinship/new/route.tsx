import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const parent_id = url.searchParams.get('parent_id');
    const users_id = url.searchParams.get('users_id');

    if (!parent_id || !users_id) {
        throw new Error('Both parent_id and users_id must be provided.');
    }

    await sql`INSERT INTO climbing_gym.children (parent_id, users_id) VALUES (${parent_id}, ${users_id});`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}