"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { savePostAction } from "@/app/actions/admin";
import { ArrowUpRight, Check, Plus } from "@/components/icons";
import type { Post } from "@/db/schema";
import { initialFormState } from "@/lib/forms";
import { imageBank } from "@/lib/site";

const field =
  "w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-clay/60 focus:bg-white";
const labelClass = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink/60";

const presetImages = [
  { label: "Chef Odi portrait", url: imageBank.heroPortrait },
  { label: "Marcus Addis kitchen", url: imageBank.chefStory },
  { label: "Culinary Village", url: imageBank.chefDemo },
  { label: "Colourful Ethiopian plate", url: imageBank.tableSpread },
  { label: "Odi’s Nile perch", url: imageBank.nilePerch },
  { label: "Kinche", url: imageBank.kinche },
  { label: "Jollof", url: imageBank.jollof },
  { label: "Roast fish", url: imageBank.fish },
  { label: "Spices", url: imageBank.spices },
  { label: "Grain bowl", url: imageBank.grainBowl },
  { label: "Greens", url: imageBank.salad },
  { label: "Dessert", url: imageBank.dessert },
  { label: "Coffee", url: imageBank.coffee },
];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep disabled:cursor-wait disabled:opacity-70"
    >
      <Check className="h-4 w-4" />
      {pending ? "Saving…" : "Save entry"}
    </button>
  );
}

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction] = useActionState(savePostAction, initialFormState);
  const [kind, setKind] = useState(post?.kind === "journal" ? "journal" : "recipe");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [featured, setFeatured] = useState(post?.featured ?? false);

  const dateValue = post
    ? new Date(post.publishedAt).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="space-y-4">
      {post && <input type="hidden" name="id" value={post.id} />}

      {state.status === "error" && (
        <div className="rounded-xl border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay-deep" role="alert">
          {state.message}
        </div>
      )}

      <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl text-forest">
            {post ? "Edit entry" : "New entry"}
          </h2>
          <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/40">
            {kind === "recipe" ? "Recipe" : "Journal post"}
          </span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClass}>Title</label>
            <input
              id="title"
              name="title"
              defaultValue={post?.title ?? ""}
              required
              placeholder="Smoky Jollof Rice with Charred Pepper Relish"
              className={field}
            />
            {state.errors?.title && <p className="mt-1 text-xs text-clay">{state.errors.title}</p>}
          </div>

          <div>
            <label htmlFor="slug" className={labelClass}>URL slug</label>
            <input
              id="slug"
              name="slug"
              defaultValue={post?.slug ?? ""}
              placeholder="smoky-jollof-rice"
              className={field}
            />
            {state.errors?.slug ? (
              <p className="mt-1 text-xs text-clay">{state.errors.slug}</p>
            ) : (
              <p className="mt-1 text-[0.68rem] text-ink/40">Leave blank to build it from the title.</p>
            )}
          </div>

          <div>
            <label htmlFor="kind" className={labelClass}>Entry type</label>
            <select
              id="kind"
              name="kind"
              value={kind}
              onChange={(event) => setKind(event.target.value)}
              className={field}
            >
              <option value="recipe">Recipe</option>
              <option value="journal">Journal / blog</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <input
              id="category"
              name="category"
              list="category-options"
              defaultValue={post?.category ?? (kind === "recipe" ? "Rice & Grains" : "Field Notes")}
              placeholder="Rice & Grains"
              className={field}
            />
            <datalist id="category-options">
              {["Rice & Grains", "From the Sea", "Plant Forward", "Grills & Roasts", "Sweet Things", "Field Notes", "Stories", "Nutrition"].map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>Short excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt ?? ""}
              placeholder="One or two sentences for cards and search results."
              className={field}
            />
            {state.errors?.excerpt && <p className="mt-1 text-xs text-clay">{state.errors.excerpt}</p>}
          </div>

          <div>
            <label htmlFor="tags" className={labelClass}>Tags (comma separated)</label>
            <input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="One pot, West African, High fibre"
              className={field}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
        <h2 className="font-display text-xl text-forest">Cover image</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_180px]">
          <div>
            <label htmlFor="coverImage" className={labelClass}>Image URL</label>
            <input
              id="coverImage"
              name="coverImage"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              required
              placeholder="https://… or /images/odi/portrait.webp"
              className={field}
            />
            {state.errors?.coverImage && <p className="mt-1 text-xs text-clay">{state.errors.coverImage}</p>}

            <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink/45">
              Quick picks
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {presetImages.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCoverImage(preset.url)}
                  className={`rounded-full border px-2.5 py-1 text-[0.66rem] transition-colors ${
                    coverImage === preset.url
                      ? "border-clay bg-clay text-cream"
                      : "border-ink/15 text-ink/60 hover:border-clay/50 hover:text-clay"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <label htmlFor="imageAlt" className={`${labelClass} mt-4`}>Image description (alt text)</label>
            <input
              id="imageAlt"
              name="imageAlt"
              defaultValue={post?.imageAlt ?? ""}
              placeholder="Jollof rice with grilled chicken on a serving dish"
              className={field}
            />
          </div>

          <div>
            <span className={labelClass}>Preview</span>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-sand">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt="Cover preview"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-3 text-center text-[0.68rem] text-ink/40">
                  Add an image URL to preview it
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl text-forest">The story</h2>
          <span className="text-[0.68rem] text-ink/40">Blank line = new paragraph · ## = subheading</span>
        </div>
        <div className="mt-3">
          <label htmlFor="body" className={labelClass}>Introduction & body</label>
          <textarea
            id="body"
            name="body"
            rows={10}
            defaultValue={post?.body ?? ""}
            placeholder={"Start with the story of the dish.\n\n## A subheading\n\nThen keep going — one idea per paragraph."}
            className={`${field} font-sans leading-relaxed`}
          />
          {state.errors?.body && <p className="mt-1 text-xs text-clay">{state.errors.body}</p>}
        </div>
      </div>

      {kind === "recipe" && (
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
          <h2 className="font-display text-xl text-forest">Recipe details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="prepTime" className={labelClass}>Prep time</label>
              <input id="prepTime" name="prepTime" defaultValue={post?.prepTime ?? ""} placeholder="20 mins" className={field} />
            </div>
            <div>
              <label htmlFor="cookTime" className={labelClass}>Cook time</label>
              <input id="cookTime" name="cookTime" defaultValue={post?.cookTime ?? ""} placeholder="45 mins" className={field} />
            </div>
            <div>
              <label htmlFor="servings" className={labelClass}>Servings</label>
              <input id="servings" name="servings" defaultValue={post?.servings ?? ""} placeholder="Serves 4" className={field} />
            </div>
            <div>
              <label htmlFor="difficulty" className={labelClass}>Difficulty</label>
              <select id="difficulty" name="difficulty" defaultValue={post?.difficulty ?? "Easy"} className={field}>
                {["Easy", "Medium", "Advanced"].map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ingredients" className={labelClass}>Ingredients — one per line</label>
              <textarea
                id="ingredients"
                name="ingredients"
                rows={8}
                defaultValue={post?.ingredients.join("\n") ?? ""}
                placeholder={"400 g parboiled rice\n2 red bell peppers\n1 tbsp smoked paprika"}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="steps" className={labelClass}>Method — one step per line</label>
              <textarea
                id="steps"
                name="steps"
                rows={8}
                defaultValue={post?.steps.join("\n") ?? ""}
                placeholder={"Blend the peppers and onion.\nCook the base down for 20 minutes.\nAdd the rice and stock…"}
                className={field}
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
        <h2 className="font-display text-xl text-forest">Publishing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="publishedAt" className={labelClass}>Publish date</label>
            <input id="publishedAt" name="publishedAt" type="date" defaultValue={dateValue} className={field} />
          </div>
          <div className="flex flex-col justify-end gap-2.5">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/75">
              <input
                type="checkbox"
                name="published"
                checked={published}
                onChange={(event) => setPublished(event.target.checked)}
                className="h-4 w-4 rounded border-ink/30 accent-forest"
              />
              Published (visible on the website)
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/75">
              <input
                type="checkbox"
                name="featured"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="h-4 w-4 rounded border-ink/30 accent-clay"
              />
              Featured on the home page
            </label>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-cream/95 px-4 py-3 shadow-[0_12px_35px_rgba(23,51,42,0.12)] backdrop-blur">
        <Link
          href="/admin/posts"
          className="text-sm font-semibold text-ink/55 transition-colors hover:text-forest"
        >
          ← Back to entries
        </Link>
        <div className="flex items-center gap-3">
          {post && (
            <Link
              href={`/recipes/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-forest hover:text-clay"
            >
              View live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <SaveButton />
        </div>
      </div>

      {!post && (
        <p className="flex items-center gap-1.5 pb-4 text-[0.7rem] text-ink/40">
          <Plus className="h-3 w-3" />
          New entries appear in the journal as soon as they are published.
        </p>
      )}
    </form>
  );
}
