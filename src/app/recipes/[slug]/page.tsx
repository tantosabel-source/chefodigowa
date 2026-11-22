import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyLink } from "@/components/copy-link";
import { PhotoCredit } from "@/components/editorial-photo";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Flame,
  Leaf,
  Users,
} from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { formatDate } from "@/lib/format";
import { instagram, photos, references } from "@/lib/photo-stories";
import { getPostBySlug, getRelatedPosts, parseBody } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

const photoSources = Object.values(photos);
const entryReferences: Record<string, { label: string; href: string }[]> = {
  "ethiopian-kinche-cracked-barley-porridge": [{ label: "Odi’s original kinche recipe", href: references.kinche }],
  "cooking-with-marcus-samuelsson-identity-on-a-plate": [{ label: "The team on Instagram", href: instagram.team }, { label: "Marcus Addis in Bon Appétit", href: references.marcusAddis }],
  "teff-sorghum-croquettes-isombe-sauce": [{ label: "The Culinary Village demonstration", href: references.culinaryVillage }],
  "millet-porridge-cinnamon-star-anise-turmeric": [{ label: "Chefs’ Manifesto at the Culinary Village", href: references.culinaryVillage }],
  "whole-roasted-cauliflower-spiced-butter": [{ label: "Odi’s original post on Threads", href: "https://www.threads.com/@chefodigowa/post/C6xiM-NIapY" }],
};


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const blocks = parseBody(post.body);
  const creditedPhoto = photoSources.find((photo) => photo.src === post.coverImage);
  const originalSources = entryReferences[slug] ?? [];
  const isRecipe = post.kind === "recipe";
  const meta = [
    { icon: Clock, label: "Prep", value: post.prepTime || "—" },
    { icon: Flame, label: "Cook", value: post.cookTime || "—" },
    { icon: Users, label: "Serves", value: post.servings || "—" },
    { icon: Leaf, label: "Level", value: post.difficulty || "Guide" },
  ];

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-ink/10">
          <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-5xl px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
            <nav aria-label="Breadcrumb" className="text-[0.7rem] text-ink/45">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-clay">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/recipes" className="hover:text-clay">
                    Recipes & Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-clay">{post.category}</li>
              </ol>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-clay px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cream">
                {isRecipe ? "Recipe" : "Journal"}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/45">
                {post.category} · {formatDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,5.8vw,5rem)] font-extrabold leading-[0.98] text-forest">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink/65">{post.excerpt}</p>

            {isRecipe && (
              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {meta.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-ink/10 bg-white/55 px-4 py-3"
                  >
                    <dt className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                      <item.icon className="h-3.5 w-3.5 text-clay/70" />
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg leading-tight text-forest">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <figure className="relative -mt-1 pt-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-sand sm:aspect-[16/8]">
              <Image
                src={post.coverImage}
                alt={post.imageAlt || post.title}
                fill
                preload
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="object-cover"
                style={{ objectPosition: creditedPhoto?.position }}
              />
            </div>
            <figcaption className="photo-caption">
              <span>{post.coverImage === "/images/cauliflower-dish.jpg" ? "Recipe illustration" : post.imageAlt || post.title}</span>
              {creditedPhoto && <PhotoCredit photo={creditedPhoto} />}
            </figcaption>
          </figure>

          <div className="grid gap-10 py-12 lg:grid-cols-[1fr_310px] lg:gap-14 lg:py-16">
            <div className="min-w-0">
              <div className="max-w-2xl space-y-5">
                {blocks.map((block, index) =>
                  block.type === "heading" ? (
                    <h2
                      key={index}
                      className="pt-4 font-display text-[1.75rem] leading-tight text-forest"
                    >
                      {block.text}
                    </h2>
                  ) : (
                    <p
                      key={index}
                      className={`text-[0.98rem] leading-[1.85] text-ink/75 ${
                        index === 0 ? "drop-cap" : ""
                      }`}
                    >
                      {block.text}
                    </p>
                  ),
                )}
              </div>

              {isRecipe && (
                <>
                  {post.ingredients.length > 0 && (
                    <section className="mt-12" aria-labelledby="ingredients-heading">
                      <div className="flex items-end justify-between gap-4 border-b border-ink/15 pb-3">
                        <h2
                          id="ingredients-heading"
                          className="font-display text-[1.9rem] leading-none text-forest"
                        >
                          Ingredients
                        </h2>
                        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/40">
                          {post.servings || `${post.ingredients.length} items`}
                        </span>
                      </div>
                      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                        {post.ingredients.map((ingredient) => (
                          <li
                            key={ingredient}
                            className="group flex items-start gap-3 border-b border-ink/8 py-3"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-ink/20 bg-white/60 text-transparent transition-colors group-hover:border-clay/60 group-hover:text-clay">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-[0.9rem] leading-relaxed text-ink/75">
                              {ingredient}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {post.steps.length > 0 && (
                    <section className="mt-12" aria-labelledby="method-heading">
                      <h2
                        id="method-heading"
                        className="border-b border-ink/15 pb-3 font-display text-[1.9rem] leading-none text-forest"
                      >
                        Method
                      </h2>
                      <ol className="mt-6 space-y-6">
                        {post.steps.map((step, index) => (
                          <li key={step} className="flex gap-4 sm:gap-5">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-clay/30 bg-white/60 font-display text-sm text-clay">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="pt-1 text-[0.95rem] leading-[1.8] text-ink/75">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                </>
              )}

              <div className="mt-12 rounded-2xl border border-ink/10 bg-cream-deep/70 p-6 sm:p-7">
                <p className="eyebrow text-clay">From the chef</p>
                <p className="mt-2 font-display text-xl leading-snug text-forest">
                  {isRecipe
                    ? "Season with confidence, taste at every stage, and please — send me a photo when you cook it."
                    : "These notes are part of a longer conversation. If this story connects with your work, I would love to hear from you."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[0.78rem] font-semibold text-cream hover:bg-forest-deep"
                  >
                    Get in touch
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-ink/10 bg-white/55 p-6">
                <p className="eyebrow text-ink/40">In this {isRecipe ? "recipe" : "story"}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-baseline justify-between gap-3 border-b border-ink/8 pb-2.5">
                    <dt className="text-ink/50">Type</dt>
                    <dd className="font-medium text-forest">{isRecipe ? "Recipe" : "Journal"}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-ink/8 pb-2.5">
                    <dt className="text-ink/50">Topic</dt>
                    <dd className="font-medium text-forest">{post.category}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-ink/8 pb-2.5">
                    <dt className="text-ink/50">Published</dt>
                    <dd className="font-medium text-forest">{formatDate(post.publishedAt)}</dd>
                  </div>
                  {isRecipe && (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-ink/50">Effort</dt>
                      <dd className="font-medium text-forest">{post.difficulty || "Guide"}</dd>
                    </div>
                  )}
                </dl>

                {post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/12 px-2.5 py-1 text-[0.65rem] text-ink/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {originalSources.length > 0 && (
                  <div className="mt-5 border-t border-ink/10 pt-4">
                    <p className="eyebrow text-ink/65">Source notes</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {originalSources.map((source) => (
                        <li key={source.href}>
                          <a href={source.href} target="_blank" rel="noreferrer noopener" className="link-underline font-semibold text-clay">
                            {source.label} <ArrowUpRight className="size-3.5 shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-5 border-t border-ink/10 pt-4"><CopyLink /></div>
              </div>

              <div className="mt-4 rounded-2xl bg-forest p-6 text-cream">
                <p className="eyebrow text-gold">Cook with me</p>
                <p className="mt-2 font-display text-xl leading-snug">
                  Private dining, menu development and brand collaborations.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-gold hover:text-cream"
                >
                  Enquire now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-cream-deep/60">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-clay">Keep cooking</p>
                <h2 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] leading-tight text-forest">
                  More from the journal
                </h2>
              </div>
              <Link
                href="/recipes"
                className="link-underline inline-flex w-fit items-center gap-2 text-sm font-semibold text-forest"
              >
                All recipes & notes
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
