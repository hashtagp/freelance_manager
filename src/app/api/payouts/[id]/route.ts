import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: payoutId } = await params;
        const supabase = createAdminClient();

        const { data: payout, error } = await supabase
            .from('payouts')
            .select(`
                *,
                creator:users!createdBy(*),
                project:projects(*),
                members:payout_members(
                    *,
                    user:users(*)
                )
            `)
            .eq('id', payoutId)
            .single();

        if (error || !payout) {
            console.error('Payout fetch error:', error);
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
        const supabase = createAdminClient();
        const updateData: any = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (payoutDate) updateData.payoutDate = new Date(payoutDate).toISOString();
        if (status) updateData.status = status;

        // If members are provided, calculate new total
        if (members && Array.isArray(members)) {
            updateData.totalAmount = members.reduce((sum: number, member: any) => sum + (member.amount || 0), 0);

            // Delete existing members
            const { error: deleteError } = await supabase
                .from('payout_members')
                .delete()
                .eq('payoutId', payoutId);

            if (deleteError) {
                console.error('Delete payout members error:', deleteError);
            }

            // Create new members
            const newMembers = members.map((member: any) => ({
                payoutId,
                userId: member.userId,
                amount: member.amount,
                notes: member.notes || null
            }));

            const { error: insertError } = await supabase
                .from('payout_members')
                .insert(newMembers);

            if (insertError) {
                console.error('Insert payout members error:', insertError);
                return NextResponse.json(
                    { 
                        success: false, 
                        error: 'Failed to update payout members' 
                    },
                    { status: 500 }
                );
            }
        }

        const { data: updatedPayout, error: updateError } = await supabase
            .from('payouts')
            .update(updateData)
            .eq('id', payoutId)
            .select(`
                *,
                creator:users!createdBy(*),
                project:projects(*),
                members:payout_members(
                    *,
                    user:users(*)
                )
            `)
            .single();

        if (updateError || !updatedPayout) {
            console.error('Update payout error:', updateError);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to update payout' 
                },
                { status: 500 }
            );
        }

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

        const supabase = createAdminClient();
        const { error: deleteError } = await supabase
            .from('payouts')
            .delete()
            .eq('id', payoutId);

        if (deleteError) {
            console.error('Delete payout error:', deleteError);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to delete payout' 
                },
                { status: 500 }
            );
        }

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
