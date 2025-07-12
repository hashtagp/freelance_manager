import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

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
        const supabase = createAdminClient();

        const { data: payin, error } = await supabase
            .from('payins')
            .select(`
                *,
                creator:users!createdBy(
                    id,
                    name,
                    email
                ),
                project:projects!projectId(
                    id,
                    title,
                    budget
                )
            `)
            .eq('id', payinId)
            .single();

        if (error || !payin) {
            console.error('Supabase error:', error);
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

        const supabase = createAdminClient();

        const updateData: any = {
            title,
            description: description || null,
            amount: parseFloat(amount),
            status: status || 'PENDING',
        };

        if (payinDate) {
            updateData.payinDate = new Date(payinDate).toISOString();
        }

        const { data: updatedPayin, error } = await supabase
            .from('payins')
            .update(updateData)
            .eq('id', payinId)
            .select(`
                *,
                creator:users!createdBy(
                    id,
                    name,
                    email
                )
            `)
            .single();

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to update payin' 
                },
                { status: 500 }
            );
        }

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
        const supabase = createAdminClient();

        const { error } = await supabase
            .from('payins')
            .delete()
            .eq('id', payinId);

        if (error) {
            console.error('Supabase delete error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to delete payin' 
                },
                { status: 500 }
            );
        }

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
