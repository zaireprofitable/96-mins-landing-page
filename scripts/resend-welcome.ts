import { Resend } from 'resend';
import * as dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function resendWelcome(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Zaire from 96mins <zaire@96mins.com>',
      to: [email],
      subject: 'Welcome to 96mins! 🚀',
      html: `<!DOCTYPE html>
      <html>
        <body>
          <h1>Welcome to 96mins!</h1>
          <p>We're thrilled to have you here!</p>
        </body>
      </html>`
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage:
// resendWelcome('test@example.com');
