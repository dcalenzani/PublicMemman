import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const product_id = url.searchParams.get('product_id');
    const amount = url.searchParams.get('amount');
    const date_of_payment = url.searchParams.get('date_of_payment');
    const payment_method = url.searchParams.get('payment_method');

    if (!users_id || !product_id || !amount || !date_of_payment || !payment_method) {
        throw new Error('Both users_id and product_id must be provided.');
    }

    await sql`INSERT INTO climbing_gym.payment (users_id, product_id, amount, date_of_payment, payment_method) VALUES (${users_id}, ${product_id}, ${amount}, ${date_of_payment}, ${payment_method})
    ;`;
    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}