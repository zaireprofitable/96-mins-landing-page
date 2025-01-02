import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const resend = new Resend(process.env.RESEND_API_KEY);

const welcomeEmailHtml = `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #3B82F6;">Join us at 96mins!</h1>
    <p>Thanks for joining our community of designers becoming freelancers together! 🎨</p>
    <p>To get started, please fill out our quick onboarding form:</p>
    <a href="https://tally.so/r/mDABV5" style="display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Complete Onboarding Form</a>
    <p>See you on Tuesday!</p>
    <p>Best,<br>Zaire</p>
  </div>
`;

export async function POST(request: Request) {
  try {
    // Get all emails from waitlist
    const { data: waitlistData, error: fetchError } = await supabase
      .from('waitlist')
      .select('email, status')
      .eq('status', 'pending');

    if (fetchError) {
      console.error('Error fetching waitlist:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    console.log(`Found ${waitlistData?.length || 0} pending emails to send`);

    const results = [];
    const errors = [];

    // Send emails to each person
    for (const entry of waitlistData || []) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Zaire from 96mins <zaire@96mins.com>',
          to: [entry.email],
          subject: 'Join us at 96mins! 🎨',
          html: welcomeEmailHtml,
        });

        if (error) {
          console.error(`Error sending to ${entry.email}:`, error);
          errors.push({ email: entry.email, error });
          continue;
        }

        // Update status in Supabase
        const { error: updateError } = await supabase
          .from('waitlist')
          .update({ status: 'welcomed' })
          .eq('email', entry.email);

        if (updateError) {
          console.error(`Error updating status for ${entry.email}:`, updateError);
        }

        results.push({ email: entry.email, messageId: data?.id });
        console.log(`Sent welcome email to ${entry.email}`);

        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Unexpected error sending to ${entry.email}:`, error);
        errors.push({ email: entry.email, error });
      }
    }

    return NextResponse.json({
      success: true,
      sent: results.length,
      errors: errors.length,
      details: {
        successful: results,
        failed: errors
      }
    });
  } catch (error) {
    console.error('Unexpected error in resend-welcome:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
