import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Sending welcome email to:', email);

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY');
    }

    const { data, error } = await resend.emails.send({
      from: 'Zaire from 96mins <zaire@96mins.com>',
      to: [email],
      subject: 'Welcome to 96mins! 🎨',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Welcome to 96mins!</h1>
          <p>Thanks for joining our community of designers becoming freelancers together! 🎨</p>
          <p>To get started, please fill out our quick onboarding form:</p>
          <a href="https://tally.so/r/mDABV5" style="display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Complete Onboarding Form</a>
          <p>See you on Tuesday!</p>
          <p>Best,<br>Zaire</p>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in send-email:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
