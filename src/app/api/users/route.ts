import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/users - Get all users
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: users, error } = await supabase
            .from('User')
            .select('id, name, email, avatar, createdAt')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching users:', error);
            return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
        }

        return NextResponse.json(users || []);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
