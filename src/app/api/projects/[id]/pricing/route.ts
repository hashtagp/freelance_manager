import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const supabase = createAdminClient();

        const { data: pricing, error } = await supabase
            .from('project_team_member_pricing')
            .select(`
                *,
                user:users(*),
                team:teams(*)
            `)
            .eq('projectId', projectId);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to fetch project pricing' 
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: pricing || []
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
        const supabase = createAdminClient();
        const { error: deleteError } = await supabase
            .from('project_team_member_pricing')
            .delete()
            .eq('projectId', projectId)
            .eq('teamId', teamId);

        if (deleteError) {
            console.error('Delete error:', deleteError);
        }

        // Create new pricing records
        const pricingRecords = pricingData.map((data: any) => ({
            projectId,
            teamId,
            userId: data.userId,
            fixedRate: data.fixedRate,
            currency: data.currency || 'INR',
            notes: data.notes || null
        }));

        const { data: newPricing, error: insertError } = await supabase
            .from('project_team_member_pricing')
            .insert(pricingRecords)
            .select(`
                *,
                users(*),
                teams(*)
            `);

        if (insertError) {
            console.error('Insert error:', insertError);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to save project pricing' 
                },
                { status: 500 }
            );
        }

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

        const supabase = createAdminClient();
        const { data: updatedPricing, error } = await supabase
            .from('project_team_member_pricing')
            .update({
                fixedRate,
                currency: currency || 'INR',
                notes: notes || null
            })
            .eq('id', pricingId)
            .eq('projectId', projectId)
            .select(`
                *,
                users(*),
                teams(*)
            `)
            .single();

        if (error) {
            console.error('Update error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to update pricing' 
                },
                { status: 500 }
            );
        }

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

        const supabase = createAdminClient();

        if (pricingId) {
            // Delete specific pricing record
            const { error } = await supabase
                .from('project_team_member_pricing')
                .delete()
                .eq('id', pricingId)
                .eq('projectId', projectId);

            if (error) {
                console.error('Delete error:', error);
                return NextResponse.json(
                    { 
                        success: false, 
                        error: 'Failed to delete pricing' 
                    },
                    { status: 500 }
                );
            }
        } else if (teamId && userId) {
            // Delete pricing for specific user in team
            const { error } = await supabase
                .from('project_team_member_pricing')
                .delete()
                .eq('projectId', projectId)
                .eq('teamId', teamId)
                .eq('userId', userId);

            if (error) {
                console.error('Delete user pricing error:', error);
                return NextResponse.json(
                    { 
                        success: false, 
                        error: 'Failed to delete user pricing' 
                    },
                    { status: 500 }
                );
            }
        } else if (teamId) {
            // Delete all pricing for team
            const { error } = await supabase
                .from('project_team_member_pricing')
                .delete()
                .eq('projectId', projectId)
                .eq('teamId', teamId);

            if (error) {
                console.error('Delete team pricing error:', error);
                return NextResponse.json(
                    { 
                        success: false, 
                        error: 'Failed to delete team pricing' 
                    },
                    { status: 500 }
                );
            }
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
