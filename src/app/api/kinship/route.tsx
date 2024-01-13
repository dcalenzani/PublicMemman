import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const parent_id = url.searchParams.get('parent_id');
    let children;

    if (parent_id) {
        children = await sql`SELECT * FROM climbing_gym.children WHERE parent_id = ${parent_id};`;
    } else {
        children = await sql`SELECT * FROM climbing_gym.children;`;
    }

    return NextResponse.json({ children: children.rows }, { status: 200 });
}