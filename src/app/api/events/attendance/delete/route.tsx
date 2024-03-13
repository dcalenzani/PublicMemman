import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: 'your_connection_string_here',
});

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing teacher_id parameter' }, { status: 400 });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM climbing_gym.event_teachers WHERE id = $1', [id]);

        await client.query('COMMIT');

        return NextResponse.json({ message: 'Teacher attendance deleted successfully' }, { status: 200 });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
