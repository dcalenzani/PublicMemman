import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const users_id = url.searchParams.get('users_id');
    const entry_date = url.searchParams.get('entry_date');


    if (!users_id || !entry_date) {
      throw new Error('All fields are required');
    }

    await sql`
      UPDATE climbing_gym.membership 
      SET entry_date = ${entry_date}
      WHERE users_id = ${users_id};
    `;

    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
  } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Example URL: localhost:3000/api/users/new?id=1&fullname=Jane%20Doe&email=janedoe%40example.com&phone=123456789&birth_date=1990-01-01&roles_id=2
