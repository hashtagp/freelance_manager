import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

// GET /api/teams/[id]/members - Get team members
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: teamId } = await params;
        const supabase = createAdminClient();

        const { data: team, error } = await supabase
            .from('teams')
            .select(`
                *,
                members:team_members(
                    *,
                    user:users(
                        id,
                        name,
                        email,
                        avatar
                    )
                )
            `)
            .eq('id', teamId)
            .single();

        if (error || !team) {
            return NextResponse.json(
                { error: 'Team not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(team.members);
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team members' },
            { status: 500 }
        );
    }
}

// POST /api/teams/[id]/members - Add member to team
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: teamId } = await params;
        const { userId, role } = await request.json();

        if (!userId || !role) {
            return NextResponse.json(
                { error: 'User ID and role are required' },
                { status: 400 }
            );
        }

        // Check if user is already a member of this team
        const supabase = createAdminClient();
        const { data: existingMember, error: checkError } = await supabase
            .from('team_members')
            .select('id')
            .eq('teamId', teamId)
            .eq('userId', userId)
            .single();

        if (existingMember && !checkError) {
            return NextResponse.json(
                { error: 'User is already a member of this team' },
                { status: 400 }
            );
        }

        // Add member to team
        const { data: teamMember, error: createError } = await supabase
            .from('team_members')
            .insert({
                teamId,
                userId,
                role,
                joinedAt: new Date().toISOString()
            })
            .select(`
                *,
                user:users(
                    id,
                    name,
                    email,
                    avatar
                )
            `)
            .single();

        if (createError || !teamMember) {
            console.error('Create team member error:', createError);
            return NextResponse.json(
                { error: 'Failed to add member to team' },
                { status: 500 }
            );
        }

        return NextResponse.json(teamMember, { status: 201 });
    } catch (error) {
        console.error('Error adding team member:', error);
        return NextResponse.json(
            { error: 'Failed to add team member' },
            { status: 500 }
        );
    }
}

// DELETE /api/teams/[id]/members - Remove member from team
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: teamId } = await params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Remove member from team
        const supabase = createAdminClient();
        const { error: deleteError } = await supabase
            .from('team_members')
            .delete()
            .eq('teamId', teamId)
            .eq('userId', userId);

        if (deleteError) {
            console.error('Delete team member error:', deleteError);
            return NextResponse.json(
                { error: 'Failed to remove member from team' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error removing team member:', error);
        return NextResponse.json(
            { error: 'Failed to remove team member' },
            { status: 500 }
        );
    }
}
