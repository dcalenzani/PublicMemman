import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id');
    let emergency_contact;
    if (user_id) {
        emergency_contact = await pool.query('SELECT * FROM climbing_gym.emergency_contact WHERE users_id=$1', [user_id]);
    } else {
        emergency_contact = await pool.query('SELECT * FROM climbing_gym.emergency_contact');
    }
    return Response.json({ emergency_contact: emergency_contact.rows }, { status: 200 });
}