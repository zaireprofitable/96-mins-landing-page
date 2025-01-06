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
      from: '96mins <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to 96mins! 🚀',
      html: `<!DOCTYPE html>
<html>
<head>
<title>You're In! Thanks for joining</title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css?family=Inter:500,400" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Crimson Pro:400" rel="stylesheet" type="text/css">
<style type="text/css">
#outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
@media only screen and (min-width:599px){.m6{width:568px!important;max-width:568px;}.h{width:536px!important;max-width:536px;}.mg{width:100%!important;max-width:100%;}.vh{width:48.5075%!important;max-width:48.5075%;}.v1{width:2.9851%!important;max-width:2.9851%;}}
</style>
</head>
<body lang="en" style="word-spacing:normal;background-color:#f4f2ee;">
<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">We're thrilled to have you here!</div>
<div style="background-color:#f4f2ee;">

<!-- Blue Banner -->
<div style="background:#006dff;margin:0px auto;max-width:600px;">
  <table align="center" style="background:#006dff;width:100%;"><tr><td style="padding:8px 16px;">
    <div style="text-align:center;">
      <a href="#" style="color:#ffffff;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;text-decoration:underline;letter-spacing:-0.36px;">
        Free Portfolio review for 48 hours!
      </a>
    </div>
  </td></tr></table>
</div>

<!-- Main Content -->
<div style="background:#fbf9f6;margin:0px auto;max-width:600px;">
  <table align="center" style="background:#fbf9f6;width:100%;"><tr><td style="padding:32px;">
    <!-- Logo -->
    <div style="text-align:left;margin-bottom:32px;">
      <img src="https://e.hypermatic.com/5e3e71c193e48be4920c187f4d65e366.png" alt="96mins Logo" style="width:74px;border-radius:12px;">
    </div>

    <!-- Heading -->
    <div style="margin-bottom:16px;">
      <h1 style="margin:0;font-family:'Crimson Pro',serif;font-size:38px;font-weight:400;line-height:100%;letter-spacing:-1.9px;">
        <span style="color:#006dff;">You're In!</span>
        <span style="color:#222222;"> Thanks for joining</span>
      </h1>
      <p style="font-family:'Inter',sans-serif;font-size:16px;color:#777777;line-height:150%;letter-spacing:-0.48px;margin-top:12px;">
        We're thrilled to have you here!
      </p>
    </div>

    <!-- Main Text -->
    <div style="margin-bottom:32px;">
      <p style="font-family:'Inter',sans-serif;font-size:16px;color:#222222;line-height:150%;letter-spacing:-0.48px;margin-bottom:16px;">
        To make the most of your experience, we'd love to learn more about you. Completing our quick onboarding form helps us tailor resources, tips, and opportunities that fit your goals.
      </p>

      <!-- CTA Button -->
      <a href="https://tally.so/r/mDABV5" style="display:inline-block;background:#006dff;color:#ffffff;font-family:'Inter',sans-serif;font-size:16px;font-weight:500;text-decoration:none;padding:12px 24px;border-radius:60px;letter-spacing:-0.32px;">
        Complete onboarding
      </a>
    </div>

    <!-- Footer Text -->
    <div style="margin-top:32px;">
      <p style="font-family:'Inter',sans-serif;font-size:14px;color:#222222;line-height:150%;letter-spacing:-0.42px;">
        If you have any issues or would like to get in touch with the team, please reply directly to this email.
        <br><br>
        See you on Tuesday!<br>
        - Zaire
      </p>
    </div>

    <!-- Social Section -->
    <div style="margin-top:32px;padding-top:32px;border-top:1px solid #006dff;">
      <table width="100%"><tr>
        <td style="text-align:right;">
          <a href="https://www.linkedin.com/company/96mins" target="_blank">
            <img alt="LinkedIn" height="24" src="https://e.hypermatic.com/5c5e72f920b336fb32538062c0165c91.png" width="28">
          </a>
        </td>
      </tr></table>
    </div>
  </td></tr></table>
</div>

<!-- Footer -->
<div style="background:#eeeeee;margin:0px auto;max-width:600px;">
  <table align="center" style="width:100%;"><tr><td style="padding:16px;text-align:center;">
    <a href="{{ unsubscribe_url }}" style="color:#777777;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;text-decoration:underline;margin-right:8px;">Unsubscribe</a>
    <a href="{{ view_in_browser_url }}" style="color:#777777;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;text-decoration:underline;">View in the browser</a>
  </td></tr></table>
</div>

</div>
</body>
</html>`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in send-email:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
