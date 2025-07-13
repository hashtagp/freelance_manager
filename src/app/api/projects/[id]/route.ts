import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        user:users(*),
        client:clients(*),
        teamMembers:project_team_members(
          *,
          user:users(*)
        ),
        teams:project_teams(
          *,
          team:teams(*)
        ),
        payments(*),
        deadlines(*)
      `)
      .eq('id', id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Transform the data to match the expected Project interface
    const transformedProject = {
      ...project,
      // Ensure teams data is properly mapped
      teams: project.teams || [],
      // Ensure teamMembers data is properly mapped
      teamMembers: project.teamMembers || []
    };

    return NextResponse.json(transformedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, status, budget, startDate, deadline, clientId } = body;

    const supabase = await createClient();
    const { data: updatedProject, error: updateError } = await supabase
      .from('projects')
      .update({
        title,
        description,
        status,
        budget,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        deadline: deadline ? new Date(deadline).toISOString() : null,
        clientId,
      })
      .eq('id', id)
      .select(`
        *,
        users(*),
        clients(*),
        project_team_members(
          users(*)
        ),
        payments(*),
        deadlines(*)
      `)
      .single();

    if (updateError || !updatedProject) {
      console.error('Error updating project:', updateError);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting project:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
