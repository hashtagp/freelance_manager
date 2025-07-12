import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminClient();
    
    // Try to get the list of tables using a SQL query
    const { data, error } = await supabase.rpc('get_schema_tables', {
      schema_name: 'public'
    });
    
    if (error) {
      console.error('Schema query error:', error);
      
      // If that fails, try a direct query to information_schema
      const { data: tables, error: infoError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
        
      if (infoError) {
        console.error('Information schema error:', infoError);
        return NextResponse.json({ 
          error: 'Cannot access schema information',
          details: infoError.message 
        });
      }
      
      return NextResponse.json({ 
        message: 'Tables found via information_schema',
        tables: tables 
      });
    }
    
    return NextResponse.json({ 
      message: 'Schema query successful',
      tables: data 
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Query failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
