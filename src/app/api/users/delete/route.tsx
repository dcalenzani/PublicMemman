import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const url = new URL(request.url);

    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    await sql`
        DELETE FROM climbing_gym.users
        WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'user deleted successfully' }, { status: 200 });
}
