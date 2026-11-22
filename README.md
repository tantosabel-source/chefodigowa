# Chefodigowa — Portfolio & recipe journal

A portfolio for Odondise “Odi” Gowa Omotto, with a recipe journal, contact inbox, and CMS. Built with Next.js App Router, Drizzle ORM, and PostgreSQL.

## Site and studio

- `/` — portrait, photo stories, recipes and collaborations
- `/recipes` and `/recipes/[slug]` — searchable recipe journal and entry pages
- `/about` — the chef’s story, international kitchens and food advocacy
- `/contact` — enquiry form, social accounts and optional direct contact details
- `/admin` — manage entries, publication status and contact messages
- `/api/health` — application and database check

Set `ADMIN_PASSWORD` for a private studio password before publishing. Set `NEXT_PUBLIC_CHEF_EMAIL` and `NEXT_PUBLIC_CHEF_PHONE` to enable direct contact links; the form and Instagram link are available without them.

## Photography and type

The portfolio uses real local copies of photographs from [@chefodigowa](https://www.instagram.com/chefodigowa/) and the Chefs’ Manifesto / SDG2 Advocacy Hub. `src/lib/photo-stories.ts` holds the image, description and source link for each photo. The still-life cover for the cauliflower recipe is an illustration, not a photograph of Chef Odi’s dish. Add future approved photos to `public/images/odi/` and update the corresponding source and description. Recipe cover picks are available in the studio.

Roboto and Barlow Condensed are self-hosted with their licenses in `src/app/fonts/`.

## Database and development

The schema lives in `src/db/schema.ts`. `src/data/posts.json` contains the starter entries. `scripts/seed.mjs` does not overwrite existing posts.

```bash
npx drizzle-kit push
node scripts/seed.mjs
npm run dev
```

Production checks: `npx next typegen`, `npm exec tsc -- --noEmit --pretty false`, `npm run build`.
