import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
        const url = new URL(request.url);
        const users_id = url.searchParams.get('users_id');
        const product_id = url.searchParams.get('product_id');
        const entry_date = url.searchParams.get('entry_date');
        const end_date = url.searchParams.get('end_date');
        
        let products;
        
        if (!users_id || !product_id || !entry_date || !end_date){
            throw new Error('All fields are required');
        }
        await sql`
            INSERT INTO climbing_gym.membership (users_id, product_id, entry_date, end_date)
            VALUES (${users_id}, ${product_id}, ${entry_date}, ${end_date})`;    
            return NextResponse.json({ message: 'Insert successful' }, { status: 200 });
        } catch (error) {
            console.error('Error:', (error as Error).message);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}
