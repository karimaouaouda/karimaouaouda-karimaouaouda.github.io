import Image from "next/image";
import { VideoFrame } from "./VideoFrame";

export function MediaFrame({
  src,
  alt,
  caption,
  kind = "image",
  poster,
  framed = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  kind?: "image" | "video";
  poster?: string;
  framed?: boolean;
}) {
  if (kind === "video") {
    return (
      <VideoFrame
        title={alt}
        videoType="storage"
        url={src}
        poster={poster}
        caption={caption}
        framed={framed}
      />
    );
  }

  return (
    <figure className={framed ? "overflow-hidden rounded-md border border-[#dbe3ea] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]" : "overflow-hidden bg-[#0b1018]"}>
      <div className="relative aspect-[16/10] bg-[#0b1018]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="flex gap-3 p-5 text-sm leading-6 text-[#4b5563]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
