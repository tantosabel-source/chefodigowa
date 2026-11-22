import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  kind: text("kind").notNull().default("recipe"),
  category: text("category").notNull().default("Recipe"),
  excerpt: text("excerpt").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  imageAlt: text("image_alt").notNull().default(""),
  body: text("body").notNull().default(""),
  ingredients: text("ingredients")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  steps: text("steps")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  prepTime: text("prep_time").notNull().default(""),
  cookTime: text("cook_time").notNull().default(""),
  servings: text("servings").notNull().default(""),
  difficulty: text("difficulty").notNull().default("Easy"),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  topic: text("topic").notNull().default("General enquiry"),
  message: text("message").notNull(),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Message = typeof messages.$inferSelect;
