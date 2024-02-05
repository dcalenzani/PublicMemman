import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const firstName = url.searchParams.get('firstname');
    const lastName = url.searchParams.get('lastname');
    const email = url.searchParams.get('email');
    const phone = url.searchParams.get('phone');
    const birth_date = url.searchParams.get('birth_date');
    const roles_id = url.searchParams.get('roles_id');

    if (!id || !firstName || !lastName || !email || !phone || !birth_date || !roles_id) {
      throw new Error('All fields are required');
    }

    await sql`
      INSERT INTO climbing_gym.users (id, firstname, lastname, email, phone, birth_date, roles_id) 
      VALUES (${id}, ${firstName}, ${lastName}, ${email}, ${phone}, ${birth_date}, ${roles_id});
    `;

    return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
  } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Example URL: localhost:3000/api/users/new?id=1&firstName=Jane&lastName=Doe&email=janedoe%40example.com&phone=123456789&birth_date=1990-01-01&roles_id=2
