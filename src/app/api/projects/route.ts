import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.error();
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