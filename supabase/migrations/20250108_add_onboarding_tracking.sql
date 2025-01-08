-- Add columns to track onboarding status
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS completed_onboarding BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_reminder_sent TIMESTAMP WITH TIME ZONE;
