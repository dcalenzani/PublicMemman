import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const product_id = url.searchParams.get('product_id');
    const event_date = url.searchParams.get('event_date');
    let special_event;
    if (product_id) {
        special_event = await sql`
            SELECT descr as Evento,
            event_date as Fecha,
            duration as Duracion,
            product_id as Producto
            FROM climbing_gym.special_event 
            WHERE product_id=${product_id}`;
    } else if (event_date) {
        special_event = await sql`
            SELECT descr as Evento,
            event_date as Fecha,
            duration as Duracion,
            product_id as Producto
            FROM climbing_gym.special_event
            WHERE event_date=${event_date}
            `
    } else {
        special_event = await sql`SELECT * FROM climbing_gym.special_event`;
    }
    return NextResponse.json({ special_event: special_event.rows }, { status: 200 });
}