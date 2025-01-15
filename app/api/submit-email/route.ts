import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Read welcome email template
const welcomeEmailHtml = fs.readFileSync(
  path.join(process.cwd(), 'app/emails/welcome.html'),
  'utf-8'
);

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

    // Insert into waitlist
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert([
        { 
          email,
          created_at: new Date().toISOString(),
          source: 'website',
          status: 'pending'
        }
      ]);

    if (dbError) throw dbError;

    // Send welcome email
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: '96mins <hello@96mins.com>',
        to: email,
        subject: 'Just one more thing...',
        html: welcomeEmailHtml,
      });

      if (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't throw error here - we still want to return success for the signup
      } else {
        console.log('Welcome email sent successfully:', emailData);
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't throw error here - we still want to return success for the signup
    }

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
