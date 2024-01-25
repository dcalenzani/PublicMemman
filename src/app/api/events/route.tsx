import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const event_date = url.searchParams.get('event_date');
    let special_event;
    if (id) {
        special_event = await sql`
            SELECT             
            id,
            descr as Evento,
            TO_CHAR(event_date::DATE, 'DD-MM-YYYY') as Dia,
            TO_CHAR(event_date::TIME, 'HH24:MM') as Hora,
            TO_CHAR(duration, 'HH24:MM') as Duracion
            FROM climbing_gym.special_event 
            WHERE id=${id}`;
    } else if (event_date) {
        special_event = await sql`
            SELECT 
            id,
            descr as Evento,
            TO_CHAR(event_date::TIME, 'HH24:MM') as Fecha,
            TO_CHAR(duration, 'HH24:MM') as Duracion
            FROM climbing_gym.special_event
            WHERE event_date::DATE=${event_date};
            `
    } else {
        special_event = await sql`SELECT * FROM climbing_gym.special_event`;
    }
    return NextResponse.json({ special_event: special_event.rows }, { status: 200 });
}