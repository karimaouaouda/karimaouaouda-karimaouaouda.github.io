create extension if not exists pgcrypto;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'portfolio-media',
  'portfolio-media',
  true,
  524288000,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/ogg'
  ]
) on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public portfolio media read'
  ) then
    create policy "Public portfolio media read"
      on storage.objects
      for select
      using (bucket_id = 'portfolio-media');
  end if;
end
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  timeline text,
  summary text not null,
  impact text,
  problem text,
  solution text,
  role text,
  stack text[] not null default '{}',
  highlights text[] not null default '{}',
  responsibilities text[] not null default '{}',
  results text[] not null default '{}',
  main_image_url text,
  main_image_path text,
  gallery jsonb not null default '[]'::jsonb,
  video jsonb,
  featured boolean not null default false,
  sort_order integer not null default 100,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  contribution_kind text not null check (contribution_kind in ('open-source', 'startup', 'mentoring', 'package')),
  organization text not null,
  timeline text,
  summary text not null,
  stack text[] not null default '{}',
  contribution text[] not null default '{}',
  outcome text not null,
  link text,
  sort_order integer not null default 100,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  resource_type text not null check (resource_type in ('course', 'video', 'track')),
  status text not null,
  focus text not null,
  notes text,
  url text,
  video_url text,
  video_path text,
  thumbnail_url text,
  thumbnail_path text,
  sort_order integer not null default 100,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text not null default 'portfolio',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.contributions enable row level security;
alter table public.learning_resources enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public projects are readable"
  on public.projects
  for select
  using (is_public = true);

create policy "Public contributions are readable"
  on public.contributions
  for select
  using (is_public = true);

create policy "Public learning resources are readable"
  on public.learning_resources
  for select
  using (is_public = true);

create policy "Anyone can submit contact messages"
  on public.contact_messages
  for insert
  with check (
    length(name) between 2 and 120
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(message) between 10 and 4000
  );

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_learning_resources_updated_at on public.learning_resources;
create trigger set_learning_resources_updated_at
before update on public.learning_resources
for each row execute function public.set_updated_at();

drop trigger if exists set_contributions_updated_at on public.contributions;
create trigger set_contributions_updated_at
before update on public.contributions
for each row execute function public.set_updated_at();
