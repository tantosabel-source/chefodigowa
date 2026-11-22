import { desc, eq } from "drizzle-orm";

import seedData from "@/data/posts.json";
import { db } from "@/db";
import { messages, posts, subscribers, type Post } from "@/db/schema";

type SeedPost = {
  slug: string;
  title: string;
  kind: string;
  category: string;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  body: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
};

const seeds = seedData as SeedPost[];

export const fallbackPosts: Post[] = seeds.map((seed, index) => ({
  ...seed,
  id: index + 1,
  difficulty: seed.difficulty || "Guide",
  publishedAt: new Date(seed.publishedAt),
  createdAt: new Date(seed.publishedAt),
  updatedAt: new Date(seed.publishedAt),
}));

export type PostKind = "recipe" | "journal";

export function sortPosts(list: Post[]): Post[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
}

/**
 * Published posts, newest (and featured) first. Falls back to the bundled
 * seed content if the database has not been provisioned yet, so the public
 * site is never empty.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.featured), desc(posts.publishedAt));

    if (rows.length === 0) {
      return sortPosts(fallbackPosts.filter((post) => post.published));
    }

    return rows;
  } catch {
    return sortPosts(fallbackPosts.filter((post) => post.published));
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getPublishedPosts();
  return all.find((post) => post.slug === slug) ?? null;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const all = await getPublishedPosts();
  const others = all.filter((entry) => entry.slug !== post.slug);
  const sameKind = others.filter((entry) => entry.kind === post.kind);
  const sameCategory = sameKind.filter((entry) => entry.category === post.category);
  const merged = [...sameCategory, ...sameKind, ...others];
  const unique: Post[] = [];
  for (const entry of merged) {
    if (!unique.some((item) => item.id === entry.id)) unique.push(entry);
    if (unique.length >= limit) break;
  }
  return unique;
}

export function filterPosts(
  list: Post[],
  filters: { kind?: string; category?: string; query?: string },
): Post[] {
  const query = filters.query?.trim().toLowerCase();
  return list.filter((post) => {
    if (filters.kind && filters.kind !== "all" && post.kind !== filters.kind) {
      return false;
    }
    if (filters.category && filters.category !== "all" && post.category !== filters.category) {
      return false;
    }
    if (!query) return true;
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      post.body,
      ...post.tags,
      ...post.ingredients,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function categoryList(list: Post[]): string[] {
  return Array.from(new Set(list.map((post) => post.category))).sort();
}

export function parseBody(body: string): { type: "heading" | "paragraph"; text: string }[] {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("## ")) {
        return { type: "heading" as const, text: chunk.replace(/^##\s+/, "") };
      }
      return { type: "paragraph" as const, text: chunk.replace(/\n/g, " ") };
    });
}

/* ---------------------------- admin data access ---------------------------- */

export async function getAdminPosts(): Promise<{ rows: Post[]; error: boolean }> {
  try {
    const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt));
    return { rows, error: false };
  } catch {
    return { rows: [], error: true };
  }
}

export async function getAdminPost(id: number): Promise<Post | null> {
  try {
    const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAdminMessages() {
  try {
    const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
    return { rows, error: false };
  } catch {
    return { rows: [], error: true };
  }
}

export async function getDashboardStats() {
  try {
    const [postRows, messageRows, subscriberRows] = await Promise.all([
      db.select().from(posts),
      db.select().from(messages),
      db.select().from(subscribers),
    ]);

    return {
      totalPosts: postRows.length,
      publishedPosts: postRows.filter((post) => post.published).length,
      recipes: postRows.filter((post) => post.kind === "recipe").length,
      journal: postRows.filter((post) => post.kind === "journal").length,
      messages: messageRows.length,
      unhandledMessages: messageRows.filter((message) => !message.handled).length,
      subscribers: subscriberRows.length,
      error: false,
    };
  } catch {
    return {
      totalPosts: 0,
      publishedPosts: 0,
      recipes: 0,
      journal: 0,
      messages: 0,
      unhandledMessages: 0,
      subscribers: 0,
      error: true,
    };
  }
}
