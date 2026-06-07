export const siteConfig = {
  title: "Karim Aouaouda | Laravel Full-Stack Engineer",
  description:
    "Portfolio of Karim Aouaouda, a Laravel full-stack engineer focused on mobile apps, secure medical systems, CI/CD, and AI/MLOps integration.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://karimaouaouda.github.io",
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
