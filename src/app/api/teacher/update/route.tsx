import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const fullname = url.searchParams.get('fullname');
        const birth_date = url.searchParams.get('birth_date');
        const phone = url.searchParams.get('phone');
        const email = url.searchParams.get('email');
        const payment_method = url.searchParams.get('payment_method');

        let teachers;

        if (!id || !fullname || !birth_date || !phone || !email || !payment_method) {
            throw new Error('Users_id must be provided.');
        }
        await sql`
            UPDATE climbing_gym.users
            SET
                fullname = ${fullname},
                birth_date = ${birth_date},
                phone = ${phone},
                email = ${email}
            WHERE
                id = ${id};
            UPDATE climbing_gym.worker
            SET
                payment_method = ${payment_method}
            WHERE
                users_id = ${id};
            `;
        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}