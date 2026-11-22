import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/icons";
import type { Post } from "@/db/schema";
import { formatShortDate } from "@/lib/format";

function readingTime(post: Post) {
  return `${Math.max(2, Math.ceil(post.body.split(/\s+/).length / 200))} min read`;
}

export function PostCard({ post }: { post: Post }) {
  const href = `/recipes/${post.slug}`;
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper/85">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden bg-sand">
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 94vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" />
        <span className="eyebrow absolute left-3 top-3 rounded-md bg-cream px-3 py-1.5 text-forest">{post.kind === "recipe" ? "Recipe" : "Journal"}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow text-clay">{post.category}</p>
        <h3 className="mt-1.5 font-display text-[1.85rem] leading-[1.01] text-forest"><Link href={href} className="transition-colors hover:text-clay">{post.title}</Link></h3>
        <p className="mb-4 mt-3 line-clamp-3 text-sm leading-[1.6] text-ink/72">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/12 pt-3.5 text-xs text-ink/64">
          <span>{post.kind === "recipe" ? formatShortDate(post.publishedAt) : readingTime(post)}</span>
          <Link href={href} aria-label={`Read ${post.title}`} className="link-underline font-bold text-forest hover:text-clay">
            Read {post.kind === "recipe" ? "recipe" : "story"} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
