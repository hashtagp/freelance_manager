import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Get authenticated user
        const user = getUserFromRequest(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get projects for the authenticated user using Supabase
        const supabase = await createClient();
        const { data: projects, error } = await supabase
            .from('projects')
            .select(`
                *,
                clients(*),
                project_team_members(
                    users(*)
                )
            `)
            .eq('userId', user.userId);
        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch projects' },
                { status: 500 }
            );
        }

        return NextResponse.json(projects || [], { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get authenticated user
        const user = getUserFromRequest(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, description } = body;

        // Validate input
        if (!name) {
            return NextResponse.json(
                { error: 'Project name is required' },
                { status: 400 }
            );
        }

        // Create new project using Supabase
        const supabase = await createClient();
        const { data: newProject, error: createError } = await supabase
            .from('projects')
            .insert({
                title: name,
                description,
                userId: user.userId,
            })
            .select(`
                *,
                clients(*),
                project_team_members(
                    users(*)
                )
            `)
            .single();

        if (createError || !newProject) {
            console.error('Project creation error:', createError);
            return NextResponse.json(
                { error: 'Failed to create project' },
                { status: 500 }
            );
        }

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
