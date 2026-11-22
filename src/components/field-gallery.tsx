"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

import { PhotoCredit } from "@/components/editorial-photo";
import { ArrowRight, Close, Plus } from "@/components/icons";
import type { FieldStory } from "@/lib/photo-stories";

export function FieldGallery({ stories }: { stories: FieldStory[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const current = stories[index];

  function step(direction: number) {
    setIndex((old) => (old + direction + stories.length) % stories.length);
  }

  if (!current) return null;

  return (
    <>
      <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-3 md:gap-5 lg:gap-7">
        {stories.map(({ label, title, description, photo }, i) => (
          <figure key={title} className="min-w-0">
            <button
              type="button"
              aria-label={`Open photo: ${title}`}
              aria-haspopup="dialog"
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand text-left md:aspect-[5/4]"
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 768px) 33vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                style={{ objectPosition: photo.position }}
              />
              <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-cream text-forest transition-colors group-hover:bg-gold" aria-hidden="true">
                <Plus className="size-5" />
              </span>
            </button>
            <figcaption className="border-b border-ink/15 pb-5 pt-4">
              <p className="eyebrow text-clay">{label}</p>
              <h3 className="mt-1 font-display text-[1.9rem] leading-none text-forest">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
              <div className="mt-3 text-ink/60"><PhotoCredit photo={photo} /></div>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="photo-dialog"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            step(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="bg-forest-deep text-cream">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <p className="eyebrow text-cream/75">Photo {index + 1} of {stories.length}</p>
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={() => dialog.current?.close()}
              className="icon-button border-cream/25 text-cream hover:bg-cream/10"
            >
              <Close className="size-5" />
            </button>
          </div>
          <div className="relative h-[min(58dvh,640px)] bg-black/35">
            <Image key={current.photo.src} src={current.photo.src} alt={current.photo.alt} fill sizes="(min-width: 950px) 900px, 95vw" className="object-contain" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6">
            <div>
              <h2 id={titleId} className="font-display text-3xl leading-none" aria-live="polite">{current.title}</h2>
              <div className="mt-2 text-cream/75"><PhotoCredit photo={current.photo} /></div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="icon-button border-cream/25 text-cream hover:bg-cream/10">
                <ArrowRight className="size-5 rotate-180" />
              </button>
              <button type="button" aria-label="Next photo" onClick={() => step(1)} className="icon-button border-cream/25 text-cream hover:bg-cream/10">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
