import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    
    const { data: projectTeams, error } = await supabase
      .from('project_teams')
      .select(`
        *,
        team:teams(
          *,
          members:team_members(
            *,
            user:users(*)
          )
        )
      `)
      .eq('projectId', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch project teams' },
        { status: 500 }
      );
    }

    return NextResponse.json(projectTeams || []);
  } catch (error) {
    console.error('Error fetching project teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project teams' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const body = await request.json();
    const { teamId } = body;

    if (!teamId) {
      return NextResponse.json({ error: 'Team ID is required' }, { status: 400 });
    }

    // Check if the team is already assigned to this project
    const supabase = createAdminClient();
    const { data: existingAssignment, error: checkError } = await supabase
      .from('project_teams')
      .select('id')
      .eq('projectId', projectId)
      .eq('teamId', teamId)
      .single();

    if (existingAssignment && !checkError) {
      return NextResponse.json({ error: 'Team is already assigned to this project' }, { status: 400 });
    }

    const { data: projectTeam, error: createError } = await supabase
      .from('project_teams')
      .insert({
        projectId,
        teamId
      })
      .select(`
        *,
        team:teams(
          *,
          members:team_members(
            *,
            user:users(*)
          )
        ),
        project:projects(*)
      `)
      .single();

    if (createError || !projectTeam) {
      console.error('Create project team error:', createError);
      return NextResponse.json(
        { error: 'Failed to assign team to project' },
        { status: 500 }
      );
    }

    return NextResponse.json(projectTeam, { status: 201 });
  } catch (error) {
    console.error('Error assigning team to project:', error);
    return NextResponse.json(
      { error: 'Failed to assign team to project' },
      { status: 500 }
    );
  }
}
