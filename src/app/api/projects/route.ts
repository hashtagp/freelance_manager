import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects, { status: 200 }); // Explicitly set 200 for clarity (optional, 200 is default)
    } catch (error) {
        console.error('Error fetching projects:', error); // Log the actual error for debugging
        return NextResponse.json(
            { error: 'Failed to retrieve projects' },
            { status: 500 } // <--- Send a proper 500 status code
        );
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, description } = body;

    try {
        const newProject = await prisma.project.create({
            data: {
                title: name,
                description,
                userId: 'temp-user-id', // In a real app, get from auth
            },
        });
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
