import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Demo registration - replace with actual auth logic
    // For demo purposes, accept any registration
    const user = {
      id: Date.now().toString(),
      name,
      email,
    };

    const token = 'demo-jwt-token-' + Date.now(); // In real app, generate proper JWT

    return NextResponse.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
