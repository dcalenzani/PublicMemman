import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const roles_id = url.searchParams.get('roles_id');
    const users_id = url.searchParams.get('users_id');
    const date = new Date();
    const entry_date = date.toISOString().split('T')[0];

    let members;
    
    if (roles_id) {
        members = await sql`
        SELECT 
            fullname as nombre,
            users_id as DNI,
            email,
            phone as Tel,
            TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
            TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
        FROM climbing_gym.users
            INNER JOIN climbing_gym.membership ON membership.users_id = users.id
        WHERE roles_id = ${roles_id}`;
    } else if (users_id) {
        members = await sql`
        SELECT 
            fullname as nombre,
            users_id as DNI,
            email,
            phone as Tel,
            TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
            TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
        FROM climbing_gym.users
            INNER JOIN climbing_gym.membership ON membership.users_id = users.id
        WHERE users_id = ${users_id}`;
    } else {
        members = await sql`
        SELECT 
            fullname as nombre,
            users_id as DNI,
            email,
            phone as Tel,
            TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
            TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
        FROM climbing_gym.users
            INNER JOIN climbing_gym.membership ON membership.users_id = users.id`;
    }
    return NextResponse.json({ members: members.rows }, { status: 200 });
}