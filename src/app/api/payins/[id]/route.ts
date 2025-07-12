import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/payins/[id]
 * Get a single payin by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: payinId } = await params;

        const payin = await prisma.payin.findUnique({
            where: { id: payinId },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                        budget: true
                    }
                }
            }
        });

        if (!payin) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Payin not found' 
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: payin
        });
    } catch (error) {
        console.error('Failed to fetch payin:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch payin' 
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/payins/[id]
 * Update a payin
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: payinId } = await params;
        const { title, description, amount, payinDate, status } = await request.json();

        if (!title || !amount || amount <= 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Title and amount (greater than 0) are required' 
                },
                { status: 400 }
            );
        }

        const updatedPayin = await prisma.payin.update({
            where: { id: payinId },
            data: {
                title,
                description: description || null,
                amount: parseFloat(amount),
                status: status || 'PENDING',
                payinDate: payinDate ? new Date(payinDate) : undefined,
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
            data: updatedPayin
        });

    } catch (error) {
        console.error('Failed to update payin:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to update payin' 
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/payins/[id]
 * Delete a payin
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: payinId } = await params;

        await prisma.payin.delete({
            where: { id: payinId }
        });

        return NextResponse.json({
            success: true,
            message: 'Payin deleted successfully'
        });

    } catch (error) {
        console.error('Failed to delete payin:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to delete payin' 
            },
            { status: 500 }
        );
    }
}
