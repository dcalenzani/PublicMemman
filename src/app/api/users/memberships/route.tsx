import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const roles_id = url.searchParams.get('roles_id');
    const users_id = url.searchParams.get('users_id');
    const date = new Date();
    const entry_date = date.toISOString().split('T')[0];

    let members;
    
    if (users_id) {
        try {
        if (!users_id || !date) {
            throw new Error('All fields are required');
        }
        members = await sql`
        UPDATE climbing_gym.membership
        SET entry_date = ${entry_date}
        WHERE users_id = ${users_id}
        `;
        return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } } else if (roles_id) {
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