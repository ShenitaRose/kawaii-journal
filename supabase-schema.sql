-- Run this in your Supabase SQL editor

create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled entry',
  content text not null default '',
  decoration jsonb not null default '{}',
  stickers jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table entries enable row level security;

-- Users can only see/edit their own entries
create policy "Users can view own entries"
  on entries for select using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on entries for insert with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on entries for update using (auth.uid() = user_id);

create policy "Users can delete own entries"
  on entries for delete using (auth.uid() = user_id);
