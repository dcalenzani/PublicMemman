import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    let teachers;

    if (id) {
    teachers = await sql`
    SELECT 
    users.id as DNI,
    users.fullname as Nombre,
    users.birth_date as "Fecha de nacimiento",
    users.phone as Telefono, email as Email,
    payment_method.descr as "Metodo de pago",
    salary_type.descr as "Tipo de salario"
    FROM climbing_gym.worker 
    INNER JOIN climbing_gym.users 
        ON worker.users_id = users.id 
    INNER JOIN climbing_gym.payment_method
        ON worker.payment_method = payment_method.id
    INNER JOIN climbing_gym.salary_type
        ON worker.salary_type = salary_type.id
    WHERE users_id = ${id}
    ;
      `;
    } else {
    teachers = await sql`
    SELECT 
        users.id as DNI,
        users.fullname as Nombre,
        users.birth_date as "Fecha de nacimiento",
        users.phone as Telefono, email as Email,
        payment_method.descr as "Metodo de pago",
        salary_type.descr as "Tipo de salario"
    FROM climbing_gym.worker 
    INNER JOIN climbing_gym.users 
        ON worker.users_id = users.id 
    INNER JOIN climbing_gym.payment_method
        ON worker.payment_method = payment_method.id
    INNER JOIN climbing_gym.salary_type
        ON worker.salary_type = salary_type.id;
      `;
    }
    return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}