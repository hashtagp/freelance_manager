import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // First, try to list all tables
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables'); // This might not work, but let's try
      
    if (tablesError) {
      console.log('Tables RPC error:', tablesError);
      
      // Try a simple query to test connection
      const { data: test, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.log('User table error:', testError);
        return NextResponse.json({ 
          error: 'Database access failed',
          details: testError.message,
          code: testError.code,
          hint: testError.hint 
        });
      }
      
      return NextResponse.json({ 
        message: 'users table accessible',
        test: test 
      });
    }
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      tables: tables 
    });
    
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ 
      error: 'Connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
