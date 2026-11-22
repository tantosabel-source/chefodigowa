import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EditorialPhoto } from "@/components/editorial-photo";
import { ArrowRight, ArrowUpRight, Search } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { formatDate } from "@/lib/format";
import { photos } from "@/lib/photo-stories";
import { categoryList, filterPosts, getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recipes & Journal",
  description: "Recipes and field notes from Chefodigowa’s kitchen, with African ingredients, heritage grains and global technique.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const tabs = [
  { label: "Everything", value: "all" },
  { label: "Recipes", value: "recipe" },
  { label: "Journal", value: "journal" },
];

function scalar(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function RecipesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const all = await getPublishedPosts();
  const kind = tabs.find((tab) => tab.value === scalar(params.kind))?.value ?? "all";
  const categories = categoryList(kind === "all" ? all : all.filter((post) => post.kind === kind));
  const requestedCategory = scalar(params.category);
  const category = categories.includes(requestedCategory) ? requestedCategory : "all";
  const query = scalar(params.q).slice(0, 120);
  const isFiltered = kind !== "all" || category !== "all" || !!query;
  const results = filterPosts(all, { kind, category, query });
  const lead = isFiltered ? undefined : results[0];
  const rest = lead ? results.slice(1) : results;

  function filterHref(next: { kind?: string; category?: string }) {
    const search = new URLSearchParams();
    const nextKind = next.kind ?? kind;
    const nextCategory = next.category ?? category;
    if (nextKind !== "all") search.set("kind", nextKind);
    if (nextCategory !== "all") search.set("category", nextCategory);
    if (query) search.set("q", query);
    return search.size ? `/recipes?${search}` : "/recipes";
  }

  return (
    <>
      <section className="relative isolate border-b border-ink/10">
        <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="site-shell grid gap-8 py-10 sm:py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center lg:gap-14">
          <div className="fade-up min-w-0">
            <p className="section-mark eyebrow text-clay">Recipes &amp; Journal</p>
            <h1 className="section-title mt-4 max-w-[15ch] text-left text-[clamp(3rem,7vw,6.25rem)] text-forest">Cook from <span className="text-clay">the journal.</span></h1>
            <p className="mt-5 max-w-md text-base leading-[1.7] text-ink/75">
              Recipes to make at home and notes on the flavours, growers and places behind the food.
            </p>
            <a href="#journal-entries" className="brand-button brand-button--outline mt-6">Browse entries <ArrowRight className="size-4" /></a>
          </div>
          <EditorialPhoto photo={photos.colourfulPlate} caption="A colourful plate for all" imageClassName="aspect-[4/3] sm:aspect-[5/4]" className="fade-up-late" sizes="(min-width: 1320px) 490px, (min-width: 768px) 43vw, 94vw" preload />
        </div>
      </section>

      <section id="journal-entries" aria-labelledby="journal-entries-title" className="site-shell py-12 sm:py-14 lg:pb-20">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="section-mark eyebrow text-clay">The kitchen archive</p>
            <h2 id="journal-entries-title" className="mt-2 font-display text-4xl leading-none text-forest">Find something to cook</h2>
          </div>
          <form action="/recipes#journal-entries" method="get" role="search" aria-label="Search the journal" className="min-w-0">
            {kind !== "all" && <input type="hidden" name="kind" value={kind} />}
            {category !== "all" && <input type="hidden" name="category" value={category} />}
            <label htmlFor="q" className="sr-only">Search by ingredient or topic</label>
            <div className="flex items-center gap-2 rounded-[0.72rem] border border-ink/20 bg-paper p-1.5 focus-within:border-clay">
              <Search className="ml-2.5 size-5 shrink-0 text-ink/55" />
              <input id="q" name="q" type="search" defaultValue={query} maxLength={120} placeholder="Search jollof, teff, berbere…" className="min-w-0 flex-1 rounded px-0.5 py-2 text-sm placeholder:text-ink/55" />
              <button type="submit" className="brand-button min-h-9 shrink-0 px-4 py-2 text-sm">Search</button>
            </div>
          </form>
        </div>

        <div className="mt-6 rounded-xl border border-ink/12 bg-paper/70 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Filter by entry type" className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <Link key={tab.value} href={filterHref({ kind: tab.value, category: "all" })} scroll={false} aria-current={kind === tab.value ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-md border px-3.5 py-2 text-[0.78rem] font-bold transition-colors ${kind === tab.value ? "border-forest bg-forest text-cream" : "border-ink/16 text-forest hover:border-forest"}`}>
                  {tab.label}
                </Link>
              ))}
            </nav>
            {isFiltered && <Link href="/recipes" scroll={false} className="link-underline text-sm font-semibold text-clay">Clear filters</Link>}
          </div>
          {categories.length > 0 && (
            <nav aria-label="Filter by topic" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-3.5 text-sm">
              <span className="eyebrow text-ink/60">Topics</span>
              {["all", ...categories].map((item) => (
                <Link key={item} scroll={false} href={filterHref({ category: item })} aria-current={category === item ? "true" : undefined} className={`link-underline ${category === item ? "font-bold text-clay" : "text-ink/70 hover:text-forest"}`}>
                  {item === "all" ? "All" : item}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <p className="mb-5 mt-6 text-sm font-medium text-ink/64">{results.length} {results.length === 1 ? "entry" : "entries"}{query ? ` for “${query}”` : ""}</p>
        {!results.length ? (
          <div className="rounded-2xl border border-ink/12 bg-paper px-6 py-12 text-center">
            <h3 className="font-display text-3xl text-forest">No entries match</h3>
            <p className="mt-2 text-sm text-ink/70">Try another ingredient or clear the filters.</p>
            <Link href="/recipes" className="brand-button brand-button--outline mt-5" scroll={false}>Browse all entries <ArrowRight className="size-4" /></Link>
          </div>
        ) : (
          <>
            {lead && (
              <article className="grid overflow-hidden rounded-2xl border border-ink/12 bg-paper md:grid-cols-[1.12fr_0.88fr]">
                <Link href={`/recipes/${lead.slug}`} aria-label={lead.title} className="group relative block min-h-[15rem] overflow-hidden bg-sand md:min-h-[22rem]">
                  <Image src={lead.coverImage} alt={lead.imageAlt || lead.title} fill sizes="(min-width: 1320px) 660px, (min-width: 768px) 55vw, 94vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" />
                </Link>
                <div className="flex flex-col items-start justify-center p-6 sm:p-8 lg:p-10">
                  <p className="section-mark eyebrow text-clay">{lead.featured ? "Featured entry" : "Latest entry"}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.65rem)] leading-[0.98] text-forest"><Link className="hover:text-clay" href={`/recipes/${lead.slug}`}>{lead.title}</Link></h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{lead.excerpt}</p>
                  <p className="mt-4 text-xs text-ink/64">{lead.category} · {formatDate(lead.publishedAt)}</p>
                  <Link href={`/recipes/${lead.slug}`} className="brand-button mt-5">Read the {lead.kind === "recipe" ? "recipe" : "story"} <ArrowUpRight className="size-4" /></Link>
                </div>
              </article>
            )}
            {rest.length > 0 && (
              <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${lead ? "mt-9 sm:mt-11" : ""}`}>
                {rest.map((post) => <PostCard post={post} key={post.id} />)}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
