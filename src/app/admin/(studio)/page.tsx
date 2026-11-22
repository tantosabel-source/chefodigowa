import Link from "next/link";

import {
  ArrowUpRight,
  Book,
  Eye,
  Inbox,
  Pencil,
  Plus,
  Sparkle,
} from "@/components/icons";
import { formatDateTime, formatShortDate } from "@/lib/format";
import { getAdminMessages, getAdminPosts, getDashboardStats } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const { rows: postRows } = await getAdminPosts();
  const { rows: messageRows } = await getAdminMessages();

  const recentPosts = postRows.slice(0, 5);
  const recentMessages = messageRows.slice(0, 4);

  const cards = [
    { label: "Total entries", value: stats.totalPosts, icon: Book, hint: `${stats.recipes} recipes · ${stats.journal} journal` },
    { label: "Published", value: stats.publishedPosts, icon: Eye, hint: "Live on the website" },
    { label: "Unread messages", value: stats.unhandledMessages, icon: Inbox, hint: `${stats.messages} total enquiries` },
    { label: "Subscribers", value: stats.subscribers, icon: Sparkle, hint: "Kitchen letter sign-ups" },
  ];

  return (
    <div className="space-y-6">
      {stats.error && (
        <div className="rounded-xl border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay-deep">
          The database is not reachable yet, so stats are hidden. Once PostgreSQL is provisioned
          and the schema pushed, everything here will populate.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-ink/10 bg-white/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                {card.label}
              </p>
              <card.icon className="h-4 w-4 text-clay/60" />
            </div>
            <p className="mt-3 font-display text-[2.2rem] leading-none text-forest">{card.value}</p>
            <p className="mt-1.5 text-[0.7rem] text-ink/45">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <section className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-clay">Recently updated</p>
              <h2 className="mt-1 font-display text-xl text-forest">Recipes & journal</h2>
            </div>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-[0.7rem] font-semibold text-cream hover:bg-forest-deep"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-ink/15 px-4 py-8 text-center">
              <p className="text-sm text-ink/50">No entries yet.</p>
              <Link
                href="/admin/posts/new"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-clay"
              >
                Write the first one
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-ink/8">
              {recentPosts.map((post) => (
                <li key={post.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-forest">{post.title}</p>
                    <p className="mt-0.5 text-[0.7rem] text-ink/45">
                      {post.kind === "recipe" ? "Recipe" : "Journal"} ·{" "}
                      {post.published ? "Published" : "Draft"} ·{" "}
                      {formatShortDate(post.publishedAt)}
                    </p>
                  </div>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 text-[0.68rem] font-semibold text-forest hover:border-clay hover:text-clay"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/admin/posts"
            className="mt-4 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-forest hover:text-clay"
          >
            Manage all entries
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <section className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-clay">Contact form</p>
              <h2 className="mt-1 font-display text-xl text-forest">Latest messages</h2>
            </div>
            <Link
              href="/admin/messages"
              className="text-[0.7rem] font-semibold text-forest hover:text-clay"
            >
              Open inbox
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-ink/15 px-4 py-8 text-center text-sm text-ink/50">
              No messages yet. Notes sent from the contact page land here.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/8">
              {recentMessages.map((message) => (
                <li key={message.id} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-forest">{message.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${
                        message.handled
                          ? "bg-olive/20 text-forest"
                          : "bg-clay/12 text-clay-deep"
                      }`}
                    >
                      {message.handled ? "Handled" : "New"}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[0.78rem] leading-relaxed text-ink/55">
                    {message.message}
                  </p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.1em] text-ink/35">
                    {message.topic} · {formatDateTime(message.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-ink/10 bg-cream-deep/60 p-5">
        <p className="eyebrow text-clay">Quick guide</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Publish a recipe",
              text: "Open New entry, choose Recipe, add ingredients (one per line) and method steps (one per line).",
            },
            {
              title: "Write a journal post",
              text: "Set the type to Journal. Use blank lines between paragraphs and start a line with ## for a subheading.",
            },
            {
              title: "Keep it current",
              text: "Toggle Featured on up to three posts to control what appears on the home page.",
            },
          ].map((tip) => (
            <div key={tip.title} className="rounded-xl bg-white/60 p-4">
              <h3 className="font-display text-base text-forest">{tip.title}</h3>
              <p className="mt-1 text-[0.75rem] leading-relaxed text-ink/55">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
