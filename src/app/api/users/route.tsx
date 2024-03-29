import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const roles_id = url.searchParams.get('roles_id');
    const users_id = url.searchParams.get('users_id');
    let members;
    if (roles_id) {
        members = await pool.query(`
        SELECT
            CONCAT(firstname, ' ', lastname) as nombre,
            email, 
            phone as Tel,
            TO_CHAR(birth_date, 'DD-MM-YYYY') as Nac,
            roles.descr as Rol,
            users.id as dni,
            TO_CHAR(membership.entry_date, 'DD-MM-YYYY') as Ingreso,
            TO_CHAR(membership.end_date, 'DD-MM-YYYY') as Vencimiento,
            product.descr as Tipo
        FROM climbing_gym.users
            LEFT JOIN climbing_gym.roles ON roles.id = users.roles_id
            LEFT JOIN climbing_gym.membership ON membership.users_id = users.id
            LEFT JOIN climbing_gym.product ON product.id = membership.product_id
        WHERE roles_id = ${roles_id};
        `);
    } else if (users_id) {
        members = await pool.query(`
        SELECT
            CONCAT(firstname, ' ', lastname) as nombre,
            email,
            phone as Tel,
            TO_CHAR(birth_date, 'DD-MM-YYYY') as Nac,
            roles.descr as Rol
            users.id as dni
        FROM climbing_gym.users
            LEFT JOIN climbing_gym.roles ON roles.id = users.roles_id
        WHERE users.id = ${users_id};
        `);
    } else {
        members = await pool.query(
        `SELECT
            CONCAT(firstname, ' ', lastname) as nombre,
            email,
            phone as Tel,
            TO_CHAR(birth_date, 'DD-MM-YYYY') as Nac,
            roles.descr as Rol,
            users.id as dni
        FROM climbing_gym.users
            LEFT JOIN climbing_gym.roles ON roles.id = users.roles_id
        `);
    }
    return Response.json({ members: members.rows }, { status: 200 });
}