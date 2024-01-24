import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id');
    let emergency_contact;
    if (user_id) {
        emergency_contact = await sql`SELECT * FROM climbing_gym.emergency_contact WHERE users_id=${user_id}`;
    } else {
        emergency_contact = await sql`SELECT * FROM climbing_gym.emergency_contact`;
    }
    return NextResponse.json({ emergency_contact: emergency_contact.rows }, { status: 200 });
}