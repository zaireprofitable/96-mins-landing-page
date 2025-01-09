-- Add welcome_email_sent column to waitlist table
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT false;

-- Set welcome_email_sent to true for all existing users with status = 'welcomed'
UPDATE waitlist 
SET welcome_email_sent = true 
WHERE status = 'welcomed';
