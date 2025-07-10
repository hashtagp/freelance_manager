import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        // For now, return empty array since team model doesn't exist in schema
        // const teams = await prisma.team.findMany();
        const teams: any[] = [];
        return NextResponse.json(teams);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, description } = body;

    try {
        // For now, return mock data since team model doesn't exist in schema
        // const newTeam = await prisma.team.create({
        //     data: {
        //         name,
        //         description,
        //     },
        // });
        const newTeam = {
            id: Date.now().toString(),
            name,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [],
            projects: []
        };
        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }
}