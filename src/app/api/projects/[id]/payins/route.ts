import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/projects/[id]/payins
 * Fetch all payins for a project
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const payins = await prisma.payin.findMany({
            where: { projectId },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { payinDate: 'desc' }
        });

        return NextResponse.json({
            success: true,
            data: payins
        });
    } catch (error) {
        console.error('Failed to fetch project payins:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch project payins' 
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/projects/[id]/payins
 * Create a new payin for a project
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const { title, description, amount, payinDate, status, createdBy } = await request.json();

        if (!title || !amount || amount <= 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Title and amount (greater than 0) are required' 
                },
                { status: 400 }
            );
        }

        // Get a user ID for createdBy - similar logic to payout
        let actualCreatedBy = createdBy;
        
        if (!actualCreatedBy || actualCreatedBy === 'system') {
            // Find any user from the database
            const anyUser = await prisma.user.findFirst();
            if (anyUser) {
                actualCreatedBy = anyUser.id;
            } else {
                return NextResponse.json(
                    { error: 'No users found in the system. Cannot create payin.' },
                    { status: 400 }
                );
            }
        }

        // Create payin
        const newPayin = await prisma.payin.create({
            data: {
                title,
                description: description || null,
                amount: parseFloat(amount),
                status: status || 'PENDING',
                payinDate: payinDate ? new Date(payinDate) : new Date(),
                projectId,
                createdBy: actualCreatedBy,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            data: newPayin
        }, { status: 201 });

    } catch (error) {
        console.error('Failed to create project payin:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to create project payin' 
            },
            { status: 500 }
        );
    }
}
