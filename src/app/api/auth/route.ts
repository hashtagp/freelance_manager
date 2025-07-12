import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const supabase = await createClient();
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }

        return NextResponse.json({ 
            message: 'Login successful', 
            user: data.user 
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json({ message: 'An error occurred during authentication' }, { status: 500 });
    }
}