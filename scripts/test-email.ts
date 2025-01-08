import { Resend } from 'resend';
import * as dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Zaire from 96mins <zaire@96mins.com>',
      to: ['allenzaire@gmail.com'],
      subject: 'Test Email from 96mins',
      html: `<!DOCTYPE html>
<html>
<body>
  <p>This is a test email to verify email sending functionality.</p>
  <p>If you receive this, the email system is working correctly!</p>
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

main();
