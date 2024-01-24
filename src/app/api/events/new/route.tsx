import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const productId = url.searchParams.get('product_id');
    const eventDate = url.searchParams.get('event_date');
    const duration = url.searchParams.get('duration');
    const description = url.searchParams.get('description');

    if (!eventDate || !productId || !duration) {
        throw new Error('All fields are required');
    }

    await sql`
        INSERT INTO climbing_gym.special_event 
        (event_date, product_id, duration, descr)
        VALUES
        (${eventDate}, ${productId}, ${duration}, ${description})`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}