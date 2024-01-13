import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const product_id = url.searchParams.get('product_id');
    const date_of_payment = url.searchParams.get('date_of_payment');
    const payment_method = url.searchParams.get('payment_method');
    const roles_id = url.searchParams.get('roles_id');

    let payments;

    if (users_id) {
        payments = await sql`SELECT * FROM climbing_gym.payment WHERE users_id = ${users_id};`;
    } else if (product_id) {
        payments = await sql`SELECT * FROM climbing_gym.payment WHERE product_id = ${product_id};`;
    } else if (date_of_payment) {
        payments = await sql`SELECT * FROM climbing_gym.payment WHERE date_of_payment = ${date_of_payment};`;
    } else if (payment_method) {
        payments = await sql`SELECT * FROM climbing_gym.payment WHERE payment_method = ${payment_method};`;
    } else if (roles_id) {
        payments = await sql`SELECT * FROM climbing_gym.payment WHERE roles_id = ${roles_id};`;
    } else {
        payments = await sql`SELECT * FROM climbing_gym.payment;`;
    }
    return NextResponse.json({ payments: payments.rows }, { status: 200 });
}
