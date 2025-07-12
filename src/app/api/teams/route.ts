import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: teams, error } = await supabase
            .from('Team')
            .select(`
                *,
                TeamMember(
                    User(*)
                ),
                ProjectTeam(
                    Project(*)
                )
            `);

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
        }

        return NextResponse.json(teams || []);
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: newTeam, error: createError } = await supabase
            .from('Team')
            .insert({
                name,
                description,
            })
            .select(`
                *,
                TeamMember(
                    User(*)
                ),
                ProjectTeam(
                    Project(*)
                )
            `)
            .single();

        if (createError || !newTeam) {
            console.error('Team creation error:', createError);
            return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
        }

        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        console.error('Error creating team:', error);
        return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }
}