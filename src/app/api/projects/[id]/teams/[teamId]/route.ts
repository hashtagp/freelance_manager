import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; teamId: string }> }
) {
  try {
    const { id: projectId, teamId } = await params;
    const supabase = createAdminClient();
    
    // Delete the project-team relationship
    const { data: deletedRows, error } = await supabase
      .from('project_teams')
      .delete()
      .eq('projectId', projectId)
      .eq('teamId', teamId)
      .select();

    if (error) {
      console.error('Delete project team error:', error);
      return NextResponse.json(
        { error: 'Failed to remove team from project' },
        { status: 500 }
      );
    }

    if (!deletedRows || deletedRows.length === 0) {
      return NextResponse.json(
        { error: 'Team assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Team removed from project successfully' });
  } catch (error) {
    console.error('Error removing team from project:', error);
    return NextResponse.json(
      { error: 'Failed to remove team from project' },
      { status: 500 }
    );
  }
}
