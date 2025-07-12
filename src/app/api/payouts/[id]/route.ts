import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: payoutId } = await params;

        const payout = await prisma.payout.findUnique({
            where: {
                id: payoutId
            },
            include: {
                creator: true,
                project: true,
                members: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!payout) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Payout not found' 
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: payout
        });
    } catch (error) {
        console.error('Failed to fetch payout:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch payout' 
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
        const { id: payoutId } = await params;
        const { title, description, payoutDate, status, members } = await request.json();

        // Update payout
        const updateData: any = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (payoutDate) updateData.payoutDate = new Date(payoutDate);
        if (status) updateData.status = status;

        // If members are provided, calculate new total
        if (members && Array.isArray(members)) {
            updateData.totalAmount = members.reduce((sum: number, member: any) => sum + (member.amount || 0), 0);

            // Delete existing members and create new ones
            await prisma.payoutMember.deleteMany({
                where: { payoutId }
            });

            updateData.members = {
                create: members.map((member: any) => ({
                    userId: member.userId,
                    amount: member.amount,
                    notes: member.notes || null
                }))
            };
        }

        const updatedPayout = await prisma.payout.update({
            where: {
                id: payoutId
            },
            data: updateData,
            include: {
                creator: true,
                project: true,
                members: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            data: updatedPayout
        });
    } catch (error) {
        console.error('Failed to update payout:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to update payout' 
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
        const { id: payoutId } = await params;

        await prisma.payout.delete({
            where: {
                id: payoutId
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Payout deleted successfully'
        });
    } catch (error) {
        console.error('Failed to delete payout:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to delete payout' 
            },
            { status: 500 }
        );
    }
}
