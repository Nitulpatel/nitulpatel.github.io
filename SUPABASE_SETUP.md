# Supabase Setup

Use this to make contact submissions and `/admin` list work on GitHub Pages.

## 1) Create table

Run this SQL in Supabase SQL editor:

```sql
create table if not exists public.submissions (
  id bigserial primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  ip text,
  date timestamptz not null default now()
);
```

## 2) Add RLS policies

```sql
alter table public.submissions enable row level security;

create policy "Allow anon insert"
on public.submissions
for insert
to anon
with check (true);

create policy "Allow anon read"
on public.submissions
for select
to anon
using (true);
```

## 3) Add frontend env

Create `.env` in project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_ADMIN_KEY=nitulAdmin123
```

## 4) Deploy

```bash
npm run build
git add .
git commit -m "Connect contact/admin to Supabase"
git push origin main
```

