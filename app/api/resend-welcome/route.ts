import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map: IP -> Last Email Send Time
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

// Read welcome email template
const welcomeEmailHtml = fs.readFileSync(
  path.join(process.cwd(), 'app/emails/welcome.html'),
  'utf-8'
);

export async function POST(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();
  
  try {
    // Get IP for rate limiting
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    console.log(`[${requestId}] Welcome email request started - IP: ${ip}`);
    
    // Check rate limit
    const now = Date.now();
    const lastSendTime = rateLimitMap.get(ip);
    if (lastSendTime && (now - lastSendTime) < RATE_LIMIT_WINDOW) {
      console.warn(`[${requestId}] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      console.warn(`[${requestId}] Missing email in request`);
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log(`[${requestId}] Processing welcome email for: ${email}`);

    // Check if we've already sent a welcome email to this user
    const { data: userData, error: fetchError } = await supabase
      .from('waitlist')
      .select('email, status')
      .eq('email', email.toLowerCase())
      .single();

    if (fetchError) {
      console.error(`[${requestId}] Error fetching user from Supabase:`, fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // If user's status is already 'welcomed', don't send another email
    if (userData?.status === 'welcomed') {
      console.log(`[${requestId}] Welcome email already sent to ${email}`);
      return NextResponse.json({ status: 'already_sent' });
    }

    // Send welcome email
    console.log(`[${requestId}] Sending welcome email to ${email}`);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Zaire from 96mins <zaire@96mins.com>',
      to: [email.toLowerCase()],
      subject: 'Just one more thing...',
      html: welcomeEmailHtml,
    });

    if (emailError) {
      console.error(`[${requestId}] Resend API error:`, emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Update the status to 'welcomed'
    console.log(`[${requestId}] Updating status for ${email}`);
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ status: 'welcomed' })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error(`[${requestId}] Error updating status:`, updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Update rate limit
    rateLimitMap.set(ip, now);

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Welcome email process completed in ${duration}ms for ${email}`);
    
    return NextResponse.json({ status: 'success', data: emailData });
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
