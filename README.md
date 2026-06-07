# Karim Aouaouda Portfolio

Modern static portfolio for Karim Aouaouda, focused on Laravel, mobile apps, secure production systems, CI/CD, and AI/MLOps growth.

## Stack

- Next.js 16 App Router with static export for GitHub Pages
- React 19, TypeScript, Tailwind CSS 4
- GSAP community animations
- Supabase client, migrations, and optional Edge Function contact flow
- Vitest content tests

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm test
npm run build
```

`npm run build` exports the site to `out/`.

## Environment

Copy `.env.example` to `.env.local` and fill in real Supabase values when needed.

```bash
NEXT_PUBLIC_SITE_URL=https://karimaouaouda.github.io/portfolio
NEXT_PUBLIC_BASE_PATH=/portfolio
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET=portfolio-media
NEXT_PUBLIC_SUPABASE_CV_BUCKET=portfolio-cv
NEXT_PUBLIC_CV_FALLBACK_URL=/cv/Karim_Aouaouda_CV.pdf
NEXT_PUBLIC_SUPABASE_CONTACT_FUNCTION_URL=https://your-project-ref.functions.supabase.co/contact
```

For local development, keep `NEXT_PUBLIC_BASE_PATH` empty unless you want to test a project-pages subpath.

## Supabase

The Supabase folder contains:

- `supabase/migrations/20260607000000_create_portfolio_tables.sql`
- `supabase/seed.sql`
- `supabase/functions/contact/index.ts`

Pages read projects, project case studies, contributions, learning resources, project pictures, videos, and the CV download location from Supabase during the static build. The migrations create a public `portfolio-media` bucket for images/videos and a public `portfolio-cv` bucket for the CV file. If Supabase is not configured or a query fails, the app falls back to local CV-derived content and `public/cv/Karim_Aouaouda_CV.pdf` so GitHub Pages remains deployable.

Use the Supabase CLI to link a project, run migrations, seed the CV-derived content, and deploy the optional contact Edge Function.

```bash
supabase link --project-ref your-project-ref
supabase db push
supabase db reset
supabase functions deploy contact
```

Use `supabase db reset` only for a local or fresh project where resetting seeded data is acceptable. For an existing production database, apply the migration and insert/update rows manually or with your preferred seed workflow.

Media fields can use either direct URLs or bucket paths:

- Project main image: `projects.main_image_url` or `projects.main_image_path`
- Project gallery: `projects.gallery` JSON with `src` or `storagePath`
- Project video: use `projects.video_type` with `projects.video_path`, `projects.video_url`, or `projects.video_embed_code`
- Learning videos: use `learning_resources.video_type` with `learning_resources.video_path`, `learning_resources.video_url`, or `learning_resources.video_embed_code`
- Learning thumbnails: `learning_resources.thumbnail_url` or `learning_resources.thumbnail_path`
- CV download: upload `Karim_Aouaouda_CV.pdf` to the `portfolio-cv` bucket and keep `portfolio_config.cv_path` set to that storage path.

Video modes:

- `storage`: video is read from the Supabase Storage bucket path.
- `embed`: video is rendered from stored iframe embed code, such as YouTube or Google Drive embed HTML.
- `external` or `youtube`: video uses a direct URL.

Example project storage video:

```sql
update public.projects
set
  video_type = 'storage',
  video_title = 'Secure desktop walkthrough',
  video_path = 'projects/doctolik-desktop-companion/walkthrough.mp4',
  video_poster_path = 'projects/doctolik-desktop-companion/poster.webp'
where slug = 'doctolik-desktop-companion';
```

Example project embedded video:

```sql
update public.projects
set
  video_type = 'embed',
  video_title = 'Architecture walkthrough',
  video_embed_code = '<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Architecture walkthrough" frameborder="0" allowfullscreen></iframe>'
where slug = 'doctolik-desktop-companion';
```

Example `projects.gallery` item:

```json
{
  "kind": "image",
  "storagePath": "projects/doctolik-desktop-companion/sync-screen.webp",
  "alt": "Doctolik synchronization screen",
  "caption": "Offline sync and encrypted local workflow."
}
```

Example CV config update:

```sql
update public.portfolio_config
set config_value = 'Karim_Aouaouda_CV.pdf'
where config_key = 'cv_path';
```

## GitHub Pages

The deployment workflow builds a static export and deploys `out/` to GitHub Pages. Add repository variables for Supabase values if contact persistence should be enabled in production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET`
- `NEXT_PUBLIC_SUPABASE_CV_BUCKET`
- `NEXT_PUBLIC_CV_FALLBACK_URL`
- `NEXT_PUBLIC_SUPABASE_CONTACT_FUNCTION_URL`
