import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    include: {
                        user: true,
                    },
                },
                projects: {
                    include: {
                        project: true,
                    },
                },
            },
        });
        return NextResponse.json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
        }

        const newTeam = await prisma.team.create({
            data: {
                name,
                description,
            },
            include: {
                members: {
                    include: {
                        user: true,
                    },
                },
                projects: {
                    include: {
                        project: true,
                    },
                },
            },
        });

        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        console.error('Error creating team:', error);
        return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }
}