import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const payouts = await prisma.payout.findMany({
            where: {
                projectId
            },
            include: {
                creator: true,
                members: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: payouts
        });
    } catch (error) {
        console.error('Failed to fetch project payouts:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch project payouts' 
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const { title, description, payoutDate, status, members, createdBy } = await request.json();

        if (!title || !Array.isArray(members) || members.length === 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Title and members are required' 
                },
                { status: 400 }
            );
        }

        // Calculate total amount
        const totalAmount = members.reduce((sum: number, member: any) => sum + (member.amount || 0), 0);

        // Get a user ID for createdBy - for now, get the first user from the project's team
        // TODO: Replace this with actual authenticated user ID
        const projectWithUsers = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                teams: {
                    include: {
                        team: {
                            include: {
                                members: {
                                    include: { user: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        let actualCreatedBy = createdBy;
        
        if (!actualCreatedBy || actualCreatedBy === 'system') {
            // Find the first available user from the project's teams
            const firstUser = projectWithUsers?.teams?.[0]?.team?.members?.[0]?.user?.id;
            if (firstUser) {
                actualCreatedBy = firstUser;
            } else {
                // If no users in project teams, get any user from the database
                const anyUser = await prisma.user.findFirst();
                if (anyUser) {
                    actualCreatedBy = anyUser.id;
                } else {
                    return NextResponse.json(
                        { error: 'No users found in the system. Cannot create payout.' },
                        { status: 400 }
                    );
                }
            }
        }

        // Create payout with members
        const newPayout = await prisma.payout.create({
            data: {
                title,
                description: description || null,
                totalAmount,
                status: status || 'PENDING',
                payoutDate: payoutDate ? new Date(payoutDate) : new Date(),
                projectId,
                createdBy: actualCreatedBy,
                members: {
                    create: members.map((member: any) => ({
                        userId: member.userId,
                        amount: member.amount,
                        notes: member.notes || null
                    }))
                }
            },
            include: {
                creator: true,
                members: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            data: newPayout
        });
    } catch (error) {
        console.error('Failed to create payout:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to create payout' 
            },
            { status: 500 }
        );
    }
}
