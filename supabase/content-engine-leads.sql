-- ─────────────────────────────────────────────────────────────────────────────
-- AI Content Engine — lead capture table
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.content_engine_leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text default 'content-engine',
  referrer    text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- One row per email (a repeat signup is treated as success, not an error).
create unique index if not exists content_engine_leads_email_key
  on public.content_engine_leads (lower(email));

-- Lock the table down. RLS is ON with NO public policies, so the anon/public
-- key cannot read or write. Only the service-role key (used server-side in
-- app/api/subscribe/route.ts) can insert — and it bypasses RLS.
alter table public.content_engine_leads enable row level security;
