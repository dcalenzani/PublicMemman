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
    let teachers;

    if (id) {
      teachers = await pool.query(`
        SELECT 
          users.id as DNI,
          CONCAT(users.firstname, ' ', users.lastname) as Nombre,
          TO_CHAR(users.birth_date, 'DD-MM-YYYY') as "Fecha de nacimiento",
          users.phone as Telefono,
          users.email as Email,
          payment_method.descr as "Metodo de pago",
          comments as Comentarios
        FROM climbing_gym.worker 
          LEFT JOIN climbing_gym.users 
            ON worker.users_id = users.id 
          LEFT JOIN climbing_gym.payment_method
            ON worker.payment_method = payment_method.id
        WHERE users_id = $1;
      `, [id]);
    } else {
      teachers = await pool.query(`
        SELECT 
          users.id as DNI,
          CONCAT(users.firstname, ' ', users.lastname) as Nombre,
          TO_CHAR(users.birth_date, 'DD-MM-YYYY') as "Fecha de nacimiento",
          users.phone as Telefono,
          users.email as Email,
          payment_method.descr as "Metodo de pago"
        FROM climbing_gym.worker 
          LEFT JOIN climbing_gym.users 
            ON worker.users_id = users.id 
          LEFT JOIN climbing_gym.payment_method
            ON worker.payment_method = payment_method.id;
      `);
    }
    return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}