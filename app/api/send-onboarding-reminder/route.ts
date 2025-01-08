import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    // Get all users who haven't completed onboarding
    const { data: users, error: dbError } = await supabase
      .from('users')
      .select('email')
      .eq('completed_onboarding', false)
      .is('last_reminder_sent', null);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const results = [];

    // Send reminder email to each user
    for (const user of users || []) {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Zaire from 96mins <zaire@96mins.com>',
        to: [user.email],
        subject: 'Quick favor while you wait ✨',
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Complete Your 96mins Profile</title>
</head>
<body>
  <h1>Hey there!</h1>
  <p>I noticed you haven't filled out our quick onboarding form yet. While you're on the waitlist, it would really help us tailor the experience to your needs!</p>
  <p>It only takes 2 minutes:</p>
  <a href="https://tally.so/r/mDABV5" style="display:inline-block;background:#006dff;color:#ffffff;font-family:Inter,sans-serif;font-size:16px;font-weight:500;text-decoration:none;padding:12px 24px;border-radius:60px;letter-spacing:-0.32px;">
    Complete onboarding
  </a>
  <p>Thanks!</p>
  <p>- Zaire</p>
</body>
</html>`
      });

      if (emailError) {
        console.error('Error sending reminder to', user.email, emailError);
        results.push({ email: user.email, status: 'error', error: emailError });
        continue;
      }

      // Update last reminder sent timestamp
      const { error: updateError } = await supabase
        .from('users')
        .update({ last_reminder_sent: new Date().toISOString() })
        .eq('email', user.email);

      if (updateError) {
        console.error('Error updating reminder timestamp for', user.email, updateError);
      }

      results.push({ email: user.email, status: 'sent', id: emailData?.id });
    }

    return NextResponse.json({ results });

  } catch (error) {
    console.error('Internal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
