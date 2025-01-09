import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map: IP -> Last Email Send Time
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

const welcomeEmailHtml = `<!DOCTYPE html>
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
<div style="background-color:#ffffff;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:32px;text-align:center;">
          <div style="margin:0px auto;max-width:536px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                    <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        <tbody>
                          <tr>
                            <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                              <div style="font-family:'Crimson Pro',serif;font-size:40px;font-weight:400;line-height:48px;text-align:left;color:#1f2937;">Welcome to 96mins!</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:24px 0px;word-break:break-word;">
                              <div style="font-family:'Inter',sans-serif;font-size:16px;line-height:24px;text-align:left;color:#4b5563;">We're thrilled to have you here! 🎨</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                              <div style="font-family:'Inter',sans-serif;font-size:16px;line-height:24px;text-align:left;color:#4b5563;">To get started, please fill out our quick onboarding form:</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" vertical-align="middle" style="font-size:0px;padding:24px 0px;word-break:break-word;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tbody>
                                  <tr>
                                    <td align="center" bgcolor="#006dff" role="presentation" style="border:none;border-radius:8px;cursor:auto;mso-padding-alt:12px 24px;background:#006dff;" valign="middle">
                                      <a href="https://tally.so/r/mDABV5" style="display:inline-block;background:#006dff;color:#ffffff;font-family:'Inter',sans-serif;font-size:16px;font-weight:500;line-height:24px;margin:0;text-decoration:none;text-transform:none;padding:12px 24px;mso-padding-alt:0px;border-radius:8px;" target="_blank">Complete Onboarding Form</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                              <div style="font-family:'Inter',sans-serif;font-size:16px;line-height:24px;text-align:left;color:#4b5563;">See you on Tuesday!</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="font-size:0px;padding:24px 0px 0px;word-break:break-word;">
                              <div style="font-family:'Inter',sans-serif;font-size:16px;line-height:24px;text-align:left;color:#4b5563;">Best,<br>Zaire</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

</div>
</body>
</html>`;

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
      .select('email, welcome_email_sent')
      .eq('email', email.toLowerCase())
      .single();

    if (fetchError) {
      console.error(`[${requestId}] Error fetching user from Supabase:`, fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // If we've already sent a welcome email, don't send another one
    if (userData?.welcome_email_sent) {
      console.log(`[${requestId}] Welcome email already sent to ${email}`);
      return NextResponse.json({ status: 'already_sent' });
    }

    // Send welcome email
    console.log(`[${requestId}] Sending welcome email to ${email}`);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Zaire from 96mins <zaire@96mins.com>',
      to: [email.toLowerCase()],
      subject: 'Welcome to 96mins! 🚀',
      html: welcomeEmailHtml,
    });

    if (emailError) {
      console.error(`[${requestId}] Resend API error:`, emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Update the welcome_email_sent flag
    console.log(`[${requestId}] Updating welcome_email_sent flag for ${email}`);
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ welcome_email_sent: true })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error(`[${requestId}] Error updating welcome_email_sent:`, updateError);
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
