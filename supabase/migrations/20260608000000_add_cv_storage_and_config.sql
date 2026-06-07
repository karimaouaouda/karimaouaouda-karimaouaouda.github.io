insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'portfolio-cv',
  'portfolio-cv',
  true,
  10485760,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
      and policyname = 'Public portfolio CV read'
  ) then
    create policy "Public portfolio CV read"
      on storage.objects
      for select
      using (bucket_id = 'portfolio-cv');
  end if;
end
$$;

create table if not exists public.portfolio_config (
  config_key text primary key,
  config_value text not null,
  value_type text not null default 'text',
  description text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_config enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'portfolio_config'
      and policyname = 'Public portfolio config read'
  ) then
    create policy "Public portfolio config read"
      on public.portfolio_config
      for select
      using (is_public = true);
  end if;
end
$$;

insert into public.portfolio_config (
  config_key,
  config_value,
  value_type,
  description,
  is_public
) values
  ('cv_bucket', 'portfolio-cv', 'text', 'Supabase Storage bucket that stores the public CV file.', true),
  ('cv_path', 'Karim_Aouaouda_CV.pdf', 'storage_path', 'Storage path of the current public CV inside the CV bucket.', true),
  ('cv_filename', 'Karim_Aouaouda_CV.pdf', 'text', 'Suggested filename when visitors download the CV.', true),
  ('cv_label', 'Download CV', 'text', 'Primary label used by portfolio CV buttons.', true)
on conflict (config_key) do update set
  config_value = excluded.config_value,
  value_type = excluded.value_type,
  description = excluded.description,
  is_public = excluded.is_public,
  updated_at = now();
