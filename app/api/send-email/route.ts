import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { data, error } = await resend.emails.send({
      from: '96Mins <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to 96Mins! 🎨',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Welcome to 96Mins!</h1>
          <p>Thanks for joining our community of designers becoming freelancers together! 🎨</p>
          <p>To get started, please fill out our quick onboarding form:</p>
          <a href="https://tally.so/r/mDABV5" style="display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Complete Onboarding Form</a>
          <p>See you on Tuesday!</p>
          <p>Best,<br>The 96Mins Team</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
