import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const user = await authenticateUser(email, password);
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Here you would typically set a session or a JWT token
        return NextResponse.json({ message: 'Login successful', user });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred during authentication' }, { status: 500 });
    }
}