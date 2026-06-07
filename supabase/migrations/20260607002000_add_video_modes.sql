alter table public.projects
  add column if not exists video_type text
    check (video_type in ('storage', 'embed', 'external', 'youtube')),
  add column if not exists video_title text,
  add column if not exists video_url text,
  add column if not exists video_path text,
  add column if not exists video_embed_code text,
  add column if not exists video_poster_url text,
  add column if not exists video_poster_path text;

alter table public.learning_resources
  add column if not exists video_type text
    check (video_type in ('storage', 'embed', 'external', 'youtube')),
  add column if not exists video_embed_code text;
