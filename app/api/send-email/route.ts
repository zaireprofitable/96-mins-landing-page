import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Attempting to send email to:', email);
    console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);

    // Add contact to Resend audience
    try {
      const audienceResponse = await fetch('https://api.resend.com/audiences/ed2a49b0-0f51-408e-81af-1df107ddaf59/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          first_name: email.split('@')[0], // Using part before @ as first name
          subscribed: true,
        })
      });
      
      if (!audienceResponse.ok) {
        console.error('Failed to add to audience:', await audienceResponse.text());
      }
    } catch (error) {
      console.error('Error adding contact to Resend:', error);
    }

    const { data, error } = await resend.emails.send({
      from: '96mins <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to 96mins! 🎨',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Welcome to 96mins!</h1>
          <p>Thanks for joining our community of designers becoming freelancers together! 🎨</p>
          <p>To get started, please fill out our quick onboarding form:</p>
          <a href="https://tally.so/r/mDABV5" style="display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Complete Onboarding Form</a>
          <p>See you on Tuesday!</p>
          <p>Best,<br>The 96mins Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
