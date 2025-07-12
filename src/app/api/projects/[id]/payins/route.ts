import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

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
        const supabase = createAdminClient();

        const { data: payins, error } = await supabase
            .from('payins')
            .select(`
                *,
                creator:users!createdBy(
                    id,
                    name,
                    email
                )
            `)
            .eq('projectId', projectId)
            .order('payinDate', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to fetch project payins' 
                },
                { status: 500 }
            );
        }

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

        const supabase = createAdminClient();

        // Get a user ID for createdBy - similar logic to payout
        let actualCreatedBy = createdBy;
        
        if (!actualCreatedBy || actualCreatedBy === 'system') {
            // Find any user from the database
            const { data: anyUser, error: userError } = await supabase
                .from('users')
                .select('id')
                .limit(1)
                .single();

            if (userError || !anyUser) {
                return NextResponse.json(
                    { 
                        success: false,
                        error: 'No users found in the system. Cannot create payin.' 
                    },
                    { status: 400 }
                );
            }
            actualCreatedBy = anyUser.id;
        }

        // Create payin
        const { data: newPayin, error: createError } = await supabase
            .from('payins')
            .insert({
                title,
                description: description || null,
                amount: parseFloat(amount),
                status: status || 'PENDING',
                payinDate: payinDate ? new Date(payinDate).toISOString() : new Date().toISOString(),
                projectId,
                createdBy: actualCreatedBy,
            })
            .select(`
                *,
                creator:users!createdBy(
                    id,
                    name,
                    email
                )
            `)
            .single();

        if (createError) {
            console.error('Supabase create error:', createError);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to create project payin' 
                },
                { status: 500 }
            );
        }

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
