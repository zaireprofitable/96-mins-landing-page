# 96mins Landing Page

## Email System

The application uses a single welcome email system:
- Main endpoint: `/api/resend-welcome`
- Duplicate prevention: Uses Supabase `welcome_email_sent` flag
- Rate limiting: Limited to 1 email per IP address per hour
- Email template: Uses the designed HTML template with proper styling

⚠️ Important Notes:
1. Do not create additional email sending endpoints
2. All emails should be sent through the main endpoint
3. Always check `welcome_email_sent` flag before sending
4. Use lowercase emails for consistency
