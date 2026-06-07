import { Clapperboard } from "lucide-react";

function sanitizeEmbedCode(embedCode: string) {
  const iframeMatch = embedCode.match(/<iframe\b[\s\S]*?<\/iframe>/i);
  if (!iframeMatch) {
    return "";
  }

  return iframeMatch[0]
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\sjavascript:/gi, "");
}

export function VideoFrame({
  title,
  videoType,
  url,
  embedCode,
  poster,
  caption,
  framed = true,
}: {
  title: string;
  videoType?: "storage" | "embed" | "external" | "youtube";
  url?: string;
  embedCode?: string;
  poster?: string;
  caption?: string;
  framed?: boolean;
}) {
  const safeEmbedCode = embedCode ? sanitizeEmbedCode(embedCode) : "";
  const isEmbed = videoType === "embed" && safeEmbedCode;
  const frameClass = framed
    ? "overflow-hidden rounded-md border border-[#dbe3ea] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
    : "overflow-hidden bg-[#0b1018]";

  return (
    <figure className={frameClass}>
      <div className="relative aspect-video bg-[#0b1018]">
        {isEmbed ? (
          <div
            className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full"
            title={title}
            dangerouslySetInnerHTML={{ __html: safeEmbedCode }}
          />
        ) : url ? (
          <video
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            poster={poster}
          >
            <source src={url} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="grid h-full place-items-center px-6 text-center text-white/72">
            <div>
              <Clapperboard className="mx-auto text-[#20c997]" size={34} />
              <p className="mt-4 text-sm font-semibold">{title}</p>
            </div>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="flex gap-3 p-5 text-sm leading-6 text-[#4b5563]">
          <Clapperboard className="mt-0.5 shrink-0 text-[#0f766e]" size={17} />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
