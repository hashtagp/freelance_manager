import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const supabase = createAdminClient();

        const { data: payouts, error } = await supabase
            .from('payouts')
            .select(`
                *,
                creator:users!createdBy(*),
                members:payout_members(
                    *,
                    user:users(*)
                )
            `)
            .eq('projectId', projectId)
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to fetch project payouts' 
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: payouts || []
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

        // Get a user ID for createdBy - for now, get the first user from the project's teams
        // TODO: Replace this with actual authenticated user ID
        const supabase = createAdminClient();
        const { data: projectWithUsers, error: projectError } = await supabase
            .from('projects')
            .select(`
                *,
                teams:project_teams(
                    team:teams(
                        members:team_members(
                            user:users(*)
                        )
                    )
                )
            `)
            .eq('id', projectId)
            .single();

        let actualCreatedBy = createdBy;
        
        if (!actualCreatedBy || actualCreatedBy === 'system') {
            // Find the first available user from the project's teams
            const firstUser = projectWithUsers?.teams?.[0]?.team?.members?.[0]?.user?.id;
            if (firstUser) {
                actualCreatedBy = firstUser;
            } else {
                // If no users in project teams, get any user from the database
                const { data: anyUser, error: userError } = await supabase
                    .from('users')
                    .select('id')
                    .limit(1)
                    .single();

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

        // Create payout
        const { data: newPayout, error: payoutError } = await supabase
            .from('payouts')
            .insert({
                title,
                description: description || null,
                totalAmount,
                status: status || 'PENDING',
                payoutDate: payoutDate ? new Date(payoutDate).toISOString() : new Date().toISOString(),
                projectId,
                createdBy: actualCreatedBy
            })
            .select(`
                *,
                creator:users!createdBy(*),
                project:projects(*)
            `)
            .single();

        if (payoutError || !newPayout) {
            console.error('Create payout error:', payoutError);
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Failed to create payout' 
                },
                { status: 500 }
            );
        }

        // Create payout members
        if (members && members.length > 0) {
            const payoutMembers = members.map((member: any) => ({
                payoutId: newPayout.id,
                userId: member.userId,
                amount: member.amount,
                notes: member.notes || null
            }));

            const { error: membersError } = await supabase
                .from('payout_members')
                .insert(payoutMembers);

            if (membersError) {
                console.error('Create payout members error:', membersError);
                // Note: Payout was created but members failed - consider rollback
            }
        }

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
