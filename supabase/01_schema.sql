-- Minimal Supabase schema for RN app expectations
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  home_timezone text,
  is_premium boolean default false,
  plan_tier text default 'free',
  anonymize_map boolean default false
);
alter table public.profiles enable row level security;
create policy "Profiles are viewable by self" on public.profiles for select using (auth.uid() = user_id);
create policy "Profiles are updatable by self" on public.profiles for update using (auth.uid() = user_id);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text check (platform in ('web','ios','android')),
  label text,
  push_token text,
  last_seen_at timestamptz default now()
);
alter table public.devices enable row level security;
create policy "Devices by owner" on public.devices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
