import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: 'your_connection_string_here',
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const event_id = url.searchParams.get('event_id');
    let teachers;

    const client = await pool.connect();
    try {
        if (event_id) {
            teachers = await client.query(`
                SELECT
                    event_teachers.id,
                    event_teachers.event_id,
                    CONCAT(users.firstname, ' ', users.lastname) AS profesor,
                    payment_method.descr AS "metodo de pago"
                FROM 
                    climbing_gym.event_teachers
                JOIN 
                    climbing_gym.worker ON climbing_gym.event_teachers.teacher_id = worker.users_id 
                JOIN 
                    climbing_gym.users ON climbing_gym.worker.users_id = users.id
                JOIN 
                    climbing_gym.special_event ON climbing_gym.event_teachers.event_id = special_event.id
                JOIN 
                    climbing_gym.payment_method ON climbing_gym.worker.payment_method = payment_method.id
                WHERE event_id = $1;
            `, [event_id]);
        } else {
            teachers = await client.query('SELECT * FROM climbing_gym.event_teachers;');
        }
        return NextResponse.json({ teachers: teachers.rows }, { status: 200 });
    } finally {
        client.release();
    }
}
