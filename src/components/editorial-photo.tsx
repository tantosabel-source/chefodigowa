import Image from "next/image";

import { ArrowUpRight } from "@/components/icons";
import type { EditorialPhoto as Photo } from "@/lib/photo-stories";

export function PhotoCredit({ photo }: { photo: Photo }) {
  return (
    <a
      href={photo.source}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex w-fit items-center gap-1.5 text-xs leading-snug transition-colors hover:text-clay hover:underline"
    >
      {photo.credit}
      <ArrowUpRight className="size-3.5 shrink-0" />
    </a>
  );
}

export function EditorialPhoto({
  photo,
  caption,
  className = "",
  imageClassName = "aspect-[4/3]",
  sizes = "(min-width: 960px) 50vw, 100vw",
  preload = false,
}: {
  photo: Photo;
  caption: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className={`relative overflow-hidden rounded-[1.15rem] bg-sand ${imageClassName}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      </div>
      <figcaption className="photo-caption">
        <span>{caption}</span>
        <PhotoCredit photo={photo} />
      </figcaption>
    </figure>
  );
}
