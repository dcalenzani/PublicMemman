import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default async function AuthHandler(req: { method: string; body: { email: any; password: any; }; }, res: any) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await sql`SELECT * FROM climbing_gym.users WHERE email = ${email} AND pass = ${password}`;
        if (user) {
            return NextResponse.redirect('/Dashboard');
        }
    }
    return NextResponse.redirect('/');
}