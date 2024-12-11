import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if we're using the mock client (no env vars)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Development mode: Email submission simulated:', email);
      return NextResponse.json(
        { message: 'Successfully added to waitlist (Development Mode)' },
        { status: 200 }
      );
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email,
          created_at: new Date().toISOString(),
          source: 'website',
          status: 'pending'
        }
      ]);

    if (error) throw error;

    return NextResponse.json(
      { message: 'Successfully added to waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding email to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}
