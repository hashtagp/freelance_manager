import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/teams/[id]/members - Get team members
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: teamId } = await params;

        const team = await prisma.team.findUnique({
            where: { id: teamId },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        });

        if (!team) {
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
        const existingMember = await prisma.teamMember.findFirst({
            where: {
                teamId,
                userId
            }
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'User is already a member of this team' },
                { status: 400 }
            );
        }

        // Add member to team
        const teamMember = await prisma.teamMember.create({
            data: {
                teamId,
                userId,
                role,
                joinedAt: new Date()
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

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
        await prisma.teamMember.deleteMany({
            where: {
                teamId,
                userId
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error removing team member:', error);
        return NextResponse.json(
            { error: 'Failed to remove team member' },
            { status: 500 }
        );
    }
}
