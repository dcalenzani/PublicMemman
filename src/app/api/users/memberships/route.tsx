import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const roles_id = url.searchParams.get('roles_id');
    const users_id = url.searchParams.get('users_id');
    const date = new Date();
    const entry_date = date.toISOString().split('T')[0];

    let members;

    try {
        const client = await pool.connect();

        if (roles_id) {
            members = await client.query(`
                SELECT 
                        CONCAT(firstname, ' ', lastname) as nombre,
                        product_name as producto,
                        email,
                        phone as Tel,
                        TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
                        TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
                FROM climbing_gym.users
                        INNER JOIN climbing_gym.membership ON membership.users_id = users.id
                        INNER JOIN climbing_gym.products ON products.id = membership.products_id
                WHERE roles_id = $1`, [roles_id]);
        } else if (users_id) {
            members = await client.query(`
                SELECT 
                        CONCAT(firstname, ' ', lastname) as nombre,
                        product,
                        email,
                        phone as Tel,
                        TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
                        TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
                FROM climbing_gym.users
                        INNER JOIN climbing_gym.membership ON membership.users_id = users.id
                        INNER JOIN climbing_gym.products ON products.id = membership.products_id
                WHERE users_id = $1`, [users_id]);
        } else {
            members = await client.query(`
                SELECT 
                        CONCAT(firstname, ' ', lastname) as nombre,
                        product,
                        email,
                        phone as Tel,
                        TO_CHAR(membership.entry_date, 'YYYY-MM-DD') as Ingreso,
                        TO_CHAR(membership.end_date, 'YYYY-MM-DD') as Vencimiento
                FROM climbing_gym.users
                        INNER JOIN climbing_gym.membership ON membership.users_id = users.id,
                        INNER JOIN climbing_gym.products ON products.id = membership.products_id`);
        }

        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }

    return NextResponse.json({ members: members.rows }, { status: 200 });
}