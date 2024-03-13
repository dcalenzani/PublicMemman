import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const event_date = url.searchParams.get('event_date');
    let special_event;
    const client = await pool.connect();
    try {
        if (id) {
            const query = `
                SELECT             
                id,
                descr as Evento,
                TO_CHAR(event_date::DATE, 'DD-MM-YYYY') as Dia,
                TO_CHAR(event_date::TIME, 'HH24:MM') as Hora,
                TO_CHAR(duration, 'HH24:MM') as Duracion
                FROM climbing_gym.special_event 
                WHERE id=$1`;
            const values = [id];
            const result = await client.query(query, values);
            special_event = result.rows;
        } else if (event_date) {
            const query = `
                SELECT 
                id,
                descr as Evento,
                TO_CHAR(event_date::TIME, 'HH24:MM') as Fecha,
                TO_CHAR(duration, 'HH24:MM') as Duracion
                FROM climbing_gym.special_event
                WHERE event_date::DATE=$1`;
            const values = [event_date];
            const result = await client.query(query, values);
            special_event = result.rows;
        } else {
            const query = 'SELECT * FROM climbing_gym.special_event';
            const result = await client.query(query);
            special_event = result.rows;
        }
        return NextResponse.json({ special_event }, { status: 200 });
    } finally {
        client.release();
    }
}