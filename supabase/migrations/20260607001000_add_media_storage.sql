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

alter table public.projects
  add column if not exists main_image_path text;

alter table public.learning_resources
  add column if not exists video_url text,
  add column if not exists video_path text,
  add column if not exists thumbnail_url text,
  add column if not exists thumbnail_path text;
