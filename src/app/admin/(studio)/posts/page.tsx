import Image from "next/image";
import Link from "next/link";

import {
  deletePostAction,
  togglePostStatusAction,
} from "@/app/actions/admin";
import { ConfirmDelete } from "@/components/admin/confirm-submit";
import { ArrowUpRight, Eye, EyeOff, Pencil, Plus, Search } from "@/components/icons";
import { formatShortDate } from "@/lib/format";
import { getAdminPosts, getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    saved?: string;
    updated?: string;
    deleted?: string;
    error?: string;
    q?: string;
  }>;
};

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { rows, error } = await getAdminPosts();
  const usingSeed = rows.length === 0;
  const source = usingSeed ? await getPublishedPosts() : rows;

  const query = (params.q ?? "").toLowerCase();
  const filtered = query
    ? source.filter((post) =>
        [post.title, post.category, post.kind, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : source;

  const notice =
    params.saved
      ? `Saved “${params.saved}”.`
      : params.updated
        ? "Entry status updated."
        : params.deleted
          ? "Entry deleted."
          : params.error
            ? "That action could not be completed. Please try again."
            : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow text-clay">Content</p>
          <h2 className="mt-1 font-display text-2xl text-forest">Recipes & journal</h2>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[0.78rem] font-semibold text-cream hover:bg-forest-deep"
        >
          <Plus className="h-4 w-4" />
          New entry
        </Link>
      </div>

      {notice && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            params.error
              ? "border border-clay/30 bg-clay/10 text-clay-deep"
              : "border border-forest/20 bg-forest/5 text-forest"
          }`}
          role="status"
        >
          {notice}
        </div>
      )}

      {(error || usingSeed) && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink/70">
          {error
            ? "The posts table is not available yet. Run the database schema push and refresh."
            : "The table is empty, so the bundled demo content is shown below. Save an entry to start your own library."}
        </div>
      )}

      <div className="rounded-2xl border border-ink/10 bg-white/60">
        <form method="get" className="flex items-center gap-2 border-b border-ink/10 p-3">
          <Search className="ml-1 h-4 w-4 text-ink/35" />
          <input
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search entries…"
            className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-ink/35"
          />
          <button
            type="submit"
            className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.7rem] font-semibold text-forest hover:border-clay hover:text-clay"
          >
            Filter
          </button>
        </form>

        {filtered.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="font-display text-xl text-forest">No entries here yet</p>
            <p className="mt-1 text-sm text-ink/50">
              Add your first recipe or journal post to see it listed.
            </p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2.5 text-[0.78rem] font-semibold text-cream"
            >
              <Plus className="h-4 w-4" />
              New entry
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-ink/8">
            {filtered.map((post) => (
              <li key={post.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={post.coverImage}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cream-deep px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-forest/70">
                      {post.kind === "recipe" ? "Recipe" : "Journal"}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${
                        post.published
                          ? "bg-forest/10 text-forest"
                          : "bg-ink/10 text-ink/50"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.featured && (
                      <span className="rounded-full bg-gold/25 px-2 py-0.5 text-[0.6rem] font-semibold text-forest">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate font-display text-lg leading-tight text-forest">
                    {post.title}
                  </p>
                  <p className="mt-0.5 truncate text-[0.7rem] text-ink/45">
                    {post.category} · {formatShortDate(post.publishedAt)} · /{post.slug}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {post.published && (
                    <Link
                      href={`/recipes/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1.5 text-[0.66rem] font-semibold text-ink/60 hover:border-forest hover:text-forest"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                      View
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1.5 text-[0.66rem] font-semibold text-forest hover:border-clay hover:text-clay"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Link>
                  {!usingSeed && (
                    <>
                      <form action={togglePostStatusAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <input type="hidden" name="published" value={String(!post.published)} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1.5 text-[0.66rem] font-semibold text-ink/60 hover:border-forest hover:text-forest"
                        >
                          {post.published ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          {post.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <ConfirmDelete
                          label="Delete"
                          className="rounded-full border border-transparent px-2.5 py-1.5 text-[0.66rem] font-semibold text-clay/70 hover:border-clay/40 hover:bg-clay/5 hover:text-clay"
                        />
                      </form>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="pb-6 text-[0.7rem] text-ink/40">
        Tip: featured entries appear first on the home page. Aim for three.
      </p>
    </div>
  );
}
