import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const product_id = url.searchParams.get('product_id');
    const entry_date = url.searchParams.get('entry_date');
    const end_date = url.searchParams.get('end_date');

    let products;
    products = await sql`
    SELECT * FROM climbing_gym.product`;
    return NextResponse.json({ product: products.rows }, { status: 200 });
}
