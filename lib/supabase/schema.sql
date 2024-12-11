-- Create waitlist table
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  source text default 'website',
  status text default 'pending'
);
