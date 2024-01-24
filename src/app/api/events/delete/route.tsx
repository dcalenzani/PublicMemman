import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            throw new Error('ID is required');
        }

        await sql`
            DELETE FROM climbing_gym.special_event
            WHERE id = ${id}`;

        return NextResponse.json({ message: 'Delete successful' }, { status: 200 });
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}