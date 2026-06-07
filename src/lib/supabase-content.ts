import { createClient } from "@supabase/supabase-js";
import {
  contributions as fallbackContributions,
  learningItems as fallbackLearningItems,
  projects as fallbackProjects,
  type Contribution,
  type LearningItem,
  type Project,
  type ProjectVideo,
} from "./portfolio-data";
import { withBasePath } from "./site";

type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  timeline: string | null;
  summary: string;
  impact: string | null;
  problem: string | null;
  solution: string | null;
  role: string | null;
  stack: string[] | null;
  highlights: string[] | null;
  responsibilities: string[] | null;
  results: string[] | null;
  main_image_url: string | null;
  main_image_path: string | null;
  gallery: Project["gallery"] | null;
  video: Project["video"] | null;
  video_type: ProjectVideo["type"] | null;
  video_title: string | null;
  video_url: string | null;
  video_path: string | null;
  video_embed_code: string | null;
  video_poster_url: string | null;
  video_poster_path: string | null;
  featured: boolean | null;
};

type LearningRow = {
  title: string;
  resource_type: LearningItem["type"];
  status: string;
  focus: string;
  notes: string | null;
  url: string | null;
  video_type: LearningItem["videoType"] | null;
  video_url: string | null;
  video_path: string | null;
  video_embed_code: string | null;
  thumbnail_url: string | null;
  thumbnail_path: string | null;
};

type ContributionRow = {
  title: string;
  contribution_kind: Contribution["kind"];
  organization: string;
  timeline: string | null;
  summary: string;
  stack: string[] | null;
  contribution: string[] | null;
  outcome: string;
  link: string | null;
};

type PortfolioConfigRow = {
  config_key: string;
  config_value: string;
};

export type CvAsset = {
  href: string;
  label: string;
  filename: string;
  source: "supabase" | "fallback";
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const mediaBucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
const defaultCvBucket = process.env.NEXT_PUBLIC_SUPABASE_CV_BUCKET || "portfolio-cv";
const fallbackCvUrl = process.env.NEXT_PUBLIC_CV_FALLBACK_URL || "/cv/Karim_Aouaouda_CV.pdf";
const fallbackCvFilename = "Karim_Aouaouda_CV.pdf";

function createPortfolioClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const client = createPortfolioClient();

function getStorageUrl(path?: string | null) {
  if (!path || !client) {
    return undefined;
  }

  return client.storage.from(mediaBucket).getPublicUrl(path).data.publicUrl;
}

function resolveMediaUrl(url?: string | null, storagePath?: string | null, fallback = "/karim-engineering-hero.png") {
  return url || getStorageUrl(storagePath) || fallback;
}

function getConfigValue(rows: PortfolioConfigRow[], key: string) {
  return rows.find((row) => row.config_key === key)?.config_value;
}

function getFallbackCvAsset(): CvAsset {
  return {
    href: withBasePath(fallbackCvUrl),
    label: "Download CV",
    filename: fallbackCvFilename,
    source: "fallback",
  };
}

function mapProject(row: ProjectRow): Project {
  const gallery = (row.gallery ?? []).map((item) => ({
    ...item,
    src: resolveMediaUrl(item.src, item.storagePath),
    poster: item.poster || getStorageUrl(item.posterStoragePath),
  }));

  const columnVideo =
    row.video_type || row.video_url || row.video_path || row.video_embed_code
      ? {
          title: row.video_title ?? `${row.title} video`,
          url: resolveMediaUrl(row.video_url, row.video_path, ""),
          storagePath: row.video_path ?? undefined,
          embedCode: row.video_embed_code ?? undefined,
          provider: row.video_type ?? "storage",
          type: row.video_type ?? "storage",
          poster: resolveMediaUrl(row.video_poster_url, row.video_poster_path, ""),
          posterStoragePath: row.video_poster_path ?? undefined,
        }
      : undefined;

  const jsonVideo = row.video
    ? {
        ...row.video,
        url: resolveMediaUrl(row.video.url, row.video.storagePath, ""),
        embedCode: row.video.embedCode,
        poster: row.video.poster || getStorageUrl(row.video.posterStoragePath),
        provider: row.video.provider ?? row.video.type ?? "supabase",
        type: row.video.type ?? (row.video.provider === "embed" ? "embed" : "storage"),
      }
    : undefined;

  const video = columnVideo ?? jsonVideo;

  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    timeline: row.timeline ?? "Ongoing",
    summary: row.summary,
    impact: row.impact ?? "",
    problem: row.problem ?? "",
    solution: row.solution ?? "",
    role: row.role ?? "",
    stack: row.stack ?? [],
    highlights: row.highlights ?? [],
    responsibilities: row.responsibilities ?? [],
    results: row.results ?? [],
    mainImage: resolveMediaUrl(row.main_image_url, row.main_image_path),
    mainImageStoragePath: row.main_image_path ?? undefined,
    gallery,
    video,
    featured: Boolean(row.featured),
  };
}

function mapLearningItem(row: LearningRow): LearningItem {
  return {
    title: row.title,
    type: row.resource_type,
    status: row.status,
    focus: row.focus,
    notes: row.notes ?? "",
    url: row.url ?? undefined,
    videoType: row.video_type ?? (row.video_embed_code ? "embed" : row.video_path ? "storage" : undefined),
    videoUrl: resolveMediaUrl(row.video_url, row.video_path, ""),
    videoStoragePath: row.video_path ?? undefined,
    videoEmbedCode: row.video_embed_code ?? undefined,
    thumbnailUrl: resolveMediaUrl(row.thumbnail_url, row.thumbnail_path, ""),
    thumbnailStoragePath: row.thumbnail_path ?? undefined,
  };
}

function mapContribution(row: ContributionRow): Contribution {
  return {
    title: row.title,
    kind: row.contribution_kind,
    organization: row.organization,
    timeline: row.timeline ?? "Ongoing",
    summary: row.summary,
    stack: row.stack ?? [],
    contribution: row.contribution ?? [],
    outcome: row.outcome,
    link: row.link ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!client) {
    return fallbackProjects;
  }

  const { data, error } = await client
    .from("projects")
    .select(
      "slug,title,category,timeline,summary,impact,problem,solution,role,stack,highlights,responsibilities,results,main_image_url,main_image_path,gallery,video,video_type,video_title,video_url,video_path,video_embed_code,video_poster_url,video_poster_path,featured",
    )
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("Supabase projects fetch failed. Falling back to local portfolio data.", error.message);
    return fallbackProjects;
  }

  return (data ?? []).map((row) => mapProject(row as ProjectRow));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!client) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const { data, error } = await client
    .from("projects")
    .select(
      "slug,title,category,timeline,summary,impact,problem,solution,role,stack,highlights,responsibilities,results,main_image_url,main_image_path,gallery,video,video_type,video_title,video_url,video_path,video_embed_code,video_poster_url,video_poster_path,featured",
    )
    .eq("is_public", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn("Supabase project fetch failed. Falling back to local portfolio data.", error.message);
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  return data ? mapProject(data as ProjectRow) : null;
}

export async function getLearningItems(): Promise<LearningItem[]> {
  if (!client) {
    return fallbackLearningItems;
  }

  const { data, error } = await client
    .from("learning_resources")
    .select("title,resource_type,status,focus,notes,url,video_type,video_url,video_path,video_embed_code,thumbnail_url,thumbnail_path")
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("Supabase learning resources fetch failed. Falling back to local portfolio data.", error.message);
    return fallbackLearningItems;
  }

  return (data ?? []).map((row) => mapLearningItem(row as LearningRow));
}

export async function getContributions(): Promise<Contribution[]> {
  if (!client) {
    return fallbackContributions;
  }

  const { data, error } = await client
    .from("contributions")
    .select("title,contribution_kind,organization,timeline,summary,stack,contribution,outcome,link")
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("Supabase contributions fetch failed. Falling back to local portfolio data.", error.message);
    return fallbackContributions;
  }

  return (data ?? []).map((row) => mapContribution(row as ContributionRow));
}

export async function getCvAsset(): Promise<CvAsset> {
  if (!client) {
    return getFallbackCvAsset();
  }

  const { data, error } = await client
    .from("portfolio_config")
    .select("config_key,config_value")
    .eq("is_public", true)
    .in("config_key", ["cv_bucket", "cv_path", "cv_url", "cv_filename", "cv_label"]);

  if (error) {
    console.warn("Supabase CV config fetch failed. Falling back to local CV asset.", error.message);
    return getFallbackCvAsset();
  }

  const rows = (data ?? []) as PortfolioConfigRow[];
  const publicUrl = getConfigValue(rows, "cv_url");
  const bucket = getConfigValue(rows, "cv_bucket") || defaultCvBucket;
  const path = getConfigValue(rows, "cv_path");
  const filename = getConfigValue(rows, "cv_filename") || fallbackCvFilename;
  const label = getConfigValue(rows, "cv_label") || "Download CV";
  const href = publicUrl || (path ? client.storage.from(bucket).getPublicUrl(path).data.publicUrl : undefined);

  if (!href) {
    return getFallbackCvAsset();
  }

  return {
    href,
    label,
    filename,
    source: "supabase",
  };
}
