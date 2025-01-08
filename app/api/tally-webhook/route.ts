import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Tally form ID for the onboarding form
const TALLY_FORM_ID = 'mDABV5';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Extract email from Tally webhook payload
    const formEmail = payload.data.email?.value;
    
    if (!formEmail) {
      console.error('No email found in form submission');
      return NextResponse.json({ error: 'No email found' }, { status: 400 });
    }

    // Check if this email exists in Supabase
    const { data: users, error: dbError } = await supabase
      .from('users')
      .select('email')
      .eq('email', formEmail)
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // If email exists in database, mark as completed onboarding
    if (users) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ completed_onboarding: true })
        .eq('email', formEmail);

      if (updateError) {
        console.error('Error updating user:', updateError);
        return NextResponse.json({ error: 'Update error' }, { status: 500 });
      }
    }

    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
