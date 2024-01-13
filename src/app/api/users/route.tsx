import { sql } from '@vercel/postgres';
import { NextResponse, userAgent } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const roles_id = url.searchParams.get('roles_id');
    const users_id = url.searchParams.get('users_id');
    let members;
    if (roles_id) {
        members = await sql`SELECT fullname as Nombre, email, phone as Tel, birth_date as Nac, roles.descr as Rol, users.id as dni
        FROM climbing_gym.users
        INNER JOIN climbing_gym.roles ON roles.id = users.roles_id
        WHERE roles_id = ${roles_id};`;
    } else if (users_id) {
        members = await sql`SELECT fullname as Nombre, email, phone as Tel, birth_date as Nac, roles.descr as Rol
        FROM climbing_gym.users
        INNER JOIN climbing_gym.roles ON roles.id = users.roles_id
        WHERE users.id = ${users_id};`;
    } else {
        members = await sql`SELECT *
        FROM climbing_gym.users`;
    }
    return NextResponse.json({ members: members.rows }, { status: 200 });
}