import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const projectTeams = await prisma.projectTeam.findMany({
      where: { projectId: id },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(projectTeams);
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
    const existingAssignment = await prisma.projectTeam.findUnique({
      where: {
        projectId_teamId: {
          projectId,
          teamId,
        },
      },
    });

    if (existingAssignment) {
      return NextResponse.json({ error: 'Team is already assigned to this project' }, { status: 400 });
    }

    const projectTeam = await prisma.projectTeam.create({
      data: {
        projectId,
        teamId,
      },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        },
        project: true,
      },
    });

    return NextResponse.json(projectTeam, { status: 201 });
  } catch (error) {
    console.error('Error assigning team to project:', error);
    return NextResponse.json(
      { error: 'Failed to assign team to project' },
      { status: 500 }
    );
  }
}
