import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; teamId: string }> }
) {
  try {
    const { id: projectId, teamId } = await params;
    
    // Delete the project-team relationship
    const deletedCount = await prisma.projectTeam.deleteMany({
      where: {
        projectId,
        teamId,
      },
    });

    if (deletedCount.count === 0) {
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
