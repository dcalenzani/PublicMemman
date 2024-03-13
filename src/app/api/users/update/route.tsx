import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const firstName = url.searchParams.get('firstName');
    const lastName = url.searchParams.get('lastName');
    const email = url.searchParams.get('email');
    const phone = url.searchParams.get('phone');
    const birth_date = url.searchParams.get('birth_date');
    const roles_id = url.searchParams.get('roles_id');

    if (!id || !firstName || !lastName || !email || !phone || !birth_date || !roles_id) {
      throw new Error('All fields are required');
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE climbing_gym.users
        SET first_name = $1,
            last_name = $2,
            email = $3,
            phone = $4,
            birth_date = $5,
            roles_id = $6
        WHERE id = $7`,
        [firstName, lastName, email, phone, birth_date, roles_id, id]
      );

      await client.query('COMMIT');

      return NextResponse.json({ message: 'Update successful' }, { status: 200 });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}