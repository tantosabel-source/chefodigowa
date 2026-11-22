"use server";

import { eq, ne, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { messages, posts } from "@/db/schema";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  isValidPassword,
} from "@/lib/auth";
import { slugify, splitCommas, splitLines } from "@/lib/format";
import type { FormState } from "@/lib/forms";

async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function refreshPublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/recipes");
  if (slug) revalidatePath(`/recipes/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
}

function parseDate(value: string): Date {
  if (!value) return new Date();
  const parsed = new Date(`${value}T09:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function loginAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!password) {
    return { status: "error", message: "Enter the studio password to continue." };
  }
  if (!isValidPassword(password)) {
    return { status: "error", message: "That password does not match. Please try again." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function savePostAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const rawId = String(formData.get("id") ?? "").trim();
  const id = rawId ? Number(rawId) : null;
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const kind = String(formData.get("kind") ?? "recipe") === "journal" ? "journal" : "recipe";
  const category = String(formData.get("category") ?? "").trim() || (kind === "recipe" ? "Recipes" : "Journal");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const ingredients = splitLines(String(formData.get("ingredients") ?? ""));
  const steps = splitLines(String(formData.get("steps") ?? ""));
  const tags = splitCommas(String(formData.get("tags") ?? ""));
  const prepTime = String(formData.get("prepTime") ?? "").trim();
  const cookTime = String(formData.get("cookTime") ?? "").trim();
  const servings = String(formData.get("servings") ?? "").trim();
  const difficulty = String(formData.get("difficulty") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const publishedAt = parseDate(String(formData.get("publishedAt") ?? ""));
  const slug = slugify(requestedSlug || title);

  const errors: Record<string, string> = {};
  if (!title) errors.title = "A title is required.";
  if (!slug) errors.slug = "Add a URL slug (or a title to build one from).";
  if (!excerpt) errors.excerpt = "Write a short excerpt for the cards and search results.";
  if (!coverImage) errors.coverImage = "Add a cover image URL.";
  if (!body) errors.body = "The story or recipe introduction cannot be empty.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  try {
    const conflict = await db
      .select({ id: posts.id })
      .from(posts)
      .where(id ? and(eq(posts.slug, slug), ne(posts.id, id)) : eq(posts.slug, slug))
      .limit(1);

    if (conflict.length > 0) {
      return {
        status: "error",
        message: "That slug is already used by another post.",
        errors: { slug: "Already in use — try a different slug." },
      };
    }

    const values = {
      slug,
      title,
      kind,
      category,
      excerpt,
      coverImage,
      imageAlt,
      body,
      ingredients,
      steps,
      tags,
      prepTime,
      cookTime,
      servings,
      difficulty: kind === "recipe" ? difficulty || "Easy" : difficulty || "Guide",
      featured,
      published,
      publishedAt,
      updatedAt: new Date(),
    };

    if (id) {
      await db.update(posts).set(values).where(eq(posts.id, id));
    } else {
      await db.insert(posts).values(values);
    }
  } catch {
    return {
      status: "error",
      message: "Could not save to the database. Please try again in a moment.",
    };
  }

  refreshPublicPages(slug);
  redirect(`/admin/posts?saved=${encodeURIComponent(title)}`);
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") ?? "");
  if (!Number.isFinite(id)) redirect("/admin/posts");

  try {
    const existing = await db.select({ slug: posts.slug }).from(posts).where(eq(posts.id, id)).limit(1);
    await db.delete(posts).where(eq(posts.id, id));
    refreshPublicPages(existing[0]?.slug);
  } catch {
    redirect("/admin/posts?error=delete");
  }

  redirect("/admin/posts?deleted=1");
}

export async function togglePostStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") ?? "");
  const nextPublished = formData.get("published") === "true";

  if (!Number.isFinite(id)) redirect("/admin/posts");

  try {
    await db
      .update(posts)
      .set({ published: nextPublished, updatedAt: new Date() })
      .where(eq(posts.id, id));
    refreshPublicPages();
  } catch {
    redirect("/admin/posts?error=status");
  }

  redirect("/admin/posts?updated=1");
}

export async function markMessageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") ?? "");
  const handled = formData.get("handled") === "true";
  if (!Number.isFinite(id)) redirect("/admin/messages");

  try {
    await db.update(messages).set({ handled }).where(eq(messages.id, id));
  } catch {
    redirect("/admin/messages?error=update");
  }
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") ?? "");
  if (!Number.isFinite(id)) redirect("/admin/messages");

  try {
    await db.delete(messages).where(eq(messages.id, id));
  } catch {
    redirect("/admin/messages?error=delete");
  }
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  redirect("/admin/messages?deleted=1");
}
