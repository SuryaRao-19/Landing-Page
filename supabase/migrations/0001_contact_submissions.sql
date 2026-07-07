-- Phase 1: store contact-form submissions.
-- Run this in the Supabase dashboard → SQL Editor (or via the Supabase CLI).

create table if not exists public.contact_submissions (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null   default now(),
  name       text        not null,
  email      text        not null,
  company    text        not null,
  phone      text,
  service    text        not null,
  budget     text,
  message    text        not null,
  ip         text
);

-- Enable Row Level Security with NO policies. This denies all access via the
-- public/anon key, so the table can only be read or written by the
-- service-role key used server-side in the /api/contact route (the service role
-- bypasses RLS). Secure by default — nothing is exposed to the browser.
alter table public.contact_submissions enable row level security;

-- Handy for the future admin view (Phase 2): newest submissions first.
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
