import Image from "next/image";
import Link from "next/link";

import { PhotoCredit } from "@/components/editorial-photo";
import { FieldGallery } from "@/components/field-gallery";
import { ArrowRight, ArrowUpRight, Instagram, MapPin, Sparkle } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { fieldStories, instagram, photos } from "@/lib/photo-stories";
import { getPublishedPosts } from "@/lib/posts";
import { services, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const selections = featured.length ? featured : posts.slice(0, 3);

  return (
    <>
      <section className="relative isolate">
        <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="site-shell grid gap-7 pb-9 pt-8 sm:gap-12 sm:pb-12 sm:pt-12 min-[960px]:grid-cols-[1.03fr_1fr] min-[960px]:items-center lg:gap-14 lg:pt-14">
          <div className="contents min-[960px]:block">
            <div className="fade-up min-w-0">
              <p className="section-mark eyebrow text-clay">The chef &amp; the table</p>
              <h1 className="hero-title mt-5 text-forest sm:mt-6">
                <span className="block">African roots.</span>
                <span className="block text-clay">Global table.</span>
              </h1>
              <div className="mt-6 sm:mt-7">
                <p className="font-display text-[1.85rem] font-semibold leading-none text-forest sm:text-[2.1rem]">I&apos;m {site.chef}.</p>
                <p className="mt-3 max-w-[29rem] text-base leading-[1.65] text-ink/75 sm:text-[1.05rem]">
                  African chef, food and nutrition advocate, and culinary storyteller. I cook with local ingredients and a global perspective.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                <Link href="/recipes" className="brand-button">
                  Explore the journal <ArrowRight className="size-4" />
                </Link>
                <Link href="/about" className="brand-button brand-button--outline">
                  Meet the chef <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
            <dl className="order-2 grid max-w-[29rem] grid-cols-[auto_1fr] gap-x-3.5 gap-y-2.5 text-sm min-[960px]:order-none min-[960px]:mt-9 min-[960px]:border-t min-[960px]:border-ink/15 min-[960px]:pt-5">
              <dt className="self-center text-clay"><MapPin className="size-4" /><span className="sr-only">Based in</span></dt>
              <dd className="font-medium text-forest">Addis Ababa, Ethiopia</dd>
              <dt className="self-center text-clay"><Sparkle className="size-4" /><span className="sr-only">Collaboration</span></dt>
              <dd className="text-ink/68">Cooking alongside Marcus Samuelsson since 2017</dd>
            </dl>
          </div>

          <figure className="fade-up-late relative order-1 min-w-0 min-[960px]:order-none">
            <div className="hero-media relative overflow-hidden rounded-[1.25rem] bg-sand">
              <Image
                src={photos.portrait.src}
                alt={photos.portrait.alt}
                fill
                preload
                sizes="(min-width: 1320px) 575px, (min-width: 960px) 47vw, 94vw"
                className="object-cover"
                style={{ objectPosition: photos.portrait.position }}
              />
              <span className="eyebrow absolute left-3.5 top-3.5 rounded-md bg-forest-deep/90 px-3 py-2 text-cream sm:left-4 sm:top-4">01 / The chef</span>
            </div>
            <div className="folio-stamp" aria-hidden="true">
              <Sparkle className="mx-auto mb-0.5 size-3.5 sm:size-4" />
              <span className="font-display text-[clamp(0.82rem,1.6vw,1.18rem)] font-extrabold uppercase leading-[0.91]">Good food<br />for all</span>
            </div>
            <figcaption className="photo-caption">
              <span>Odi at Marcus Addis</span>
              <PhotoCredit photo={photos.portrait} />
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="A culinary journey across borders" className="bg-forest-deep text-cream">
        <div className="site-shell flex flex-wrap items-center gap-x-6 gap-y-3 py-4 lg:flex-nowrap lg:gap-x-8">
          <p className="eyebrow shrink-0 text-gold">Across borders</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-cream/20 text-[0.8rem] font-medium tracking-wide text-cream/88 sm:gap-x-5 lg:flex-1 lg:justify-between lg:border-l lg:pl-7">
            {site.places.map((place, index) => (
              <li key={place} className="inline-flex items-center gap-2.5 whitespace-nowrap">
                {index > 0 && <span className="size-1 rounded-full bg-gold/75" aria-hidden="true" />}
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="photo-stories" aria-labelledby="photo-stories-title" className="site-shell py-16 sm:py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <p className="section-mark eyebrow text-clay">Photo stories / 01–03</p>
            <h2 id="photo-stories-title" className="section-title mt-3 text-forest">Beyond the plate<span className="text-clay">.</span></h2>
            <p className="mt-3 max-w-[30rem] text-base leading-relaxed text-ink/70">
              The people, plates and places behind the work, from service in Addis to the Culinary Village in Kigali.
            </p>
          </div>
          <a href={instagram.profile} target="_blank" rel="noreferrer noopener" className="brand-button brand-button--outline">
            <Instagram className="size-4" /> {site.handle} <ArrowUpRight className="size-4" />
          </a>
        </div>
        <FieldGallery stories={fieldStories} />
      </section>

      <section className="border-y border-ink/10 bg-cream-deep/70">
        <div className="site-shell py-15 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-mark eyebrow text-clay">Recipes &amp; field notes</p>
              <h2 className="section-title mt-3 text-forest">From the journal<span className="text-clay">.</span></h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink/70">
                Heritage grains, big flavours and stories behind the food.
              </p>
            </div>
            <Link href="/recipes" className="brand-button brand-button--outline">Browse all entries <ArrowRight className="size-4" /></Link>
          </div>
          {selections.length ? (
            <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {selections.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : <p className="mt-7 text-sm text-ink/65">New recipes and stories are on the way.</p>}
        </div>
      </section>

      <section className="site-shell py-16 sm:py-20 lg:py-24">
        <div className="grid overflow-hidden rounded-[1.35rem] bg-forest text-cream md:grid-cols-2">
          <div className="relative min-h-[19rem] md:min-h-[30rem]">
            <Image
              src={photos.colourfulPlate.src}
              alt={photos.colourfulPlate.alt}
              fill
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 94vw"
              className="object-cover"
              style={{ objectPosition: photos.colourfulPlate.position }}
            />
            <a href={photos.colourfulPlate.source} target="_blank" rel="noreferrer noopener" className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-forest-deep/90 px-3 py-2 text-xs text-cream hover:bg-forest-deep">
              A colourful plate for all · Instagram <ArrowUpRight className="size-3.5" />
            </a>
          </div>
          <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-13">
            <p className="section-mark eyebrow text-gold">Farm to table</p>
            <h2 className="section-title mt-4 text-[clamp(2.45rem,4.55vw,4.45rem)]">Good food starts with <span className="text-gold">the grower.</span></h2>
            <p className="mt-4 max-w-[25rem] text-base leading-relaxed text-cream/82">
              Teff, sorghum, millet and beans carry generations of knowledge. Odi brings those ingredients into modern kitchens and gives the farmers who grow them a place in the conversation.
            </p>
            <Link href="/about#food-advocacy" className="link-underline mt-6 text-sm font-bold text-gold">
              Read about the advocacy <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="site-shell pb-16 sm:pb-20">
        <div className="grid gap-8 border-t border-ink/15 pt-9 sm:pt-11 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
          <div>
            <p className="section-mark eyebrow text-clay">Collaborate</p>
            <h2 id="work-title" className="section-title mt-3 text-left text-forest">Let&apos;s cook<br />together<span className="text-clay">.</span></h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-ink/72">Have a menu, event or food story in mind? I&apos;d love to hear about it.</p>
            <Link href="/contact" className="brand-button mt-6">Start a conversation <ArrowUpRight className="size-4" /></Link>
          </div>
          <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.number} className="border-b border-ink/15 pb-5">
                <p className="eyebrow text-clay">{service.number}</p>
                <h3 className="mt-1 font-display text-[1.75rem] leading-tight text-forest">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
