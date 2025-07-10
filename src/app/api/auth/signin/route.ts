import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Demo authentication - replace with actual auth logic
    // For demo purposes, accept any email/password combination
    const user = {
      id: '1',
      email,
      name: email.split('@')[0], // Use email username as name
    };

    const token = 'demo-jwt-token-' + Date.now(); // In real app, generate proper JWT

    return NextResponse.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
