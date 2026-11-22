import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const postsPath = fileURLToPath(new URL("../src/data/posts.json", import.meta.url));
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
});

const client = await pool.connect();

try {
  let inserted = 0;

  for (const post of posts) {
    const result = await client.query(
      `insert into posts
        (slug, title, kind, category, excerpt, cover_image, image_alt, body,
         ingredients, steps, tags, prep_time, cook_time, servings, difficulty,
         featured, published, published_at, created_at, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,now(),now())
       on conflict (slug) do nothing`,
      [
        post.slug,
        post.title,
        post.kind,
        post.category,
        post.excerpt,
        post.coverImage,
        post.imageAlt,
        post.body,
        post.ingredients,
        post.steps,
        post.tags,
        post.prepTime,
        post.cookTime,
        post.servings,
        post.difficulty || (post.kind === "recipe" ? "Easy" : "Guide"),
        post.featured,
        post.published,
        post.publishedAt,
      ],
    );
    inserted += result.rowCount ?? 0;
  }

  const { rows } = await client.query("select count(*)::int as total from posts");
  console.log(`Seed complete: ${inserted} new row(s), ${rows[0].total} total post(s).`);
} finally {
  client.release();
  await pool.end();
}
