import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const pricing = await prisma.projectTeamMemberPricing.findMany({
            where: {
                projectId
            },
            include: {
                user: true,
                team: true
            }
        });

        return NextResponse.json({
            success: true,
            data: pricing
        });
    } catch (error) {
        console.error('Failed to fetch project pricing:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch project pricing' 
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
        const { teamId, pricingData } = await request.json();

        if (!teamId || !Array.isArray(pricingData)) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Team ID and pricing data are required' 
                },
                { status: 400 }
            );
        }

        // Delete existing pricing for this project and team
        await prisma.projectTeamMemberPricing.deleteMany({
            where: {
                projectId,
                teamId
            }
        });

        // Create new pricing records
        const newPricing = await Promise.all(
            pricingData.map(async (data: any) => {
                return prisma.projectTeamMemberPricing.create({
                    data: {
                        projectId,
                        teamId,
                        userId: data.userId,
                        fixedRate: data.fixedRate,
                        currency: data.currency || 'USD',
                        notes: data.notes || null
                    },
                    include: {
                        user: true,
                        team: true
                    }
                });
            })
        );

        return NextResponse.json({
            success: true,
            data: newPricing
        });
    } catch (error) {
        console.error('Failed to save project pricing:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to save project pricing' 
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const { pricingId, fixedRate, currency, notes } = await request.json();

        if (!pricingId) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Pricing ID is required' 
                },
                { status: 400 }
            );
        }

        const updatedPricing = await prisma.projectTeamMemberPricing.update({
            where: {
                id: pricingId,
                projectId // Ensure the pricing belongs to this project
            },
            data: {
                fixedRate,
                currency: currency || 'USD',
                notes: notes || null
            },
            include: {
                user: true,
                team: true
            }
        });

        return NextResponse.json({
            success: true,
            data: updatedPricing
        });
    } catch (error) {
        console.error('Failed to update project pricing:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to update project pricing' 
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const { searchParams } = new URL(request.url);
        const pricingId = searchParams.get('pricingId');
        const teamId = searchParams.get('teamId');
        const userId = searchParams.get('userId');

        if (pricingId) {
            // Delete specific pricing record
            await prisma.projectTeamMemberPricing.delete({
                where: {
                    id: pricingId,
                    projectId
                }
            });
        } else if (teamId && userId) {
            // Delete pricing for specific user in team
            await prisma.projectTeamMemberPricing.deleteMany({
                where: {
                    projectId,
                    teamId,
                    userId
                }
            });
        } else if (teamId) {
            // Delete all pricing for team
            await prisma.projectTeamMemberPricing.deleteMany({
                where: {
                    projectId,
                    teamId
                }
            });
        } else {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Pricing ID, Team ID, or User ID is required' 
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Pricing deleted successfully'
        });
    } catch (error) {
        console.error('Failed to delete project pricing:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to delete project pricing' 
            },
            { status: 500 }
        );
    }
}
