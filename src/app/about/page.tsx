import type { Metadata } from "next";
import Link from "next/link";

import { EditorialPhoto } from "@/components/editorial-photo";
import { ArrowRight, ArrowUpRight, Instagram } from "@/components/icons";
import { instagram, photos, references } from "@/lib/photo-stories";
import { advocacy, site, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the chef",
  description: "From Homa Bay to Addis Ababa, the story of Chefodigowa, his collaboration with Marcus Samuelsson and his work with the Chefs’ Manifesto.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate border-b border-ink/10">
        <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="site-shell grid gap-9 py-10 sm:py-14 md:grid-cols-[0.94fr_1.06fr] md:items-center lg:gap-16 lg:py-17">
          <div className="fade-up min-w-0">
            <p className="section-mark eyebrow text-clay">About the chef</p>
            <h1 className="section-title mt-4 text-left text-[clamp(3rem,7vw,6.25rem)] text-forest">
              Meet <span className="text-clay">Chefodigowa.</span>
            </h1>
            <p className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-forest">{site.fullName}</p>
            <p className="mt-3 max-w-[28rem] text-base leading-[1.7] text-ink/75">
              I&apos;m a Kenyan chef based in Addis Ababa. My work is about bringing African ingredients to more tables, with the care they deserve and with the people who grow them in mind.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="brand-button">Work with me <ArrowRight className="size-4" /></Link>
              <a href={instagram.profile} target="_blank" rel="noreferrer noopener" className="brand-button brand-button--outline"><Instagram className="size-4" /> {site.handle}</a>
            </div>
          </div>
          <EditorialPhoto
            photo={photos.atThePass}
            caption="Tasting in the kitchen at Marcus Addis"
            className="fade-up-late"
            imageClassName="aspect-[5/4] md:aspect-[1/1.04]"
            sizes="(min-width: 1320px) 575px, (min-width: 768px) 50vw, 94vw"
            preload
          />
        </div>
      </section>

      <section aria-labelledby="story-title" className="site-shell grid gap-9 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="section-mark eyebrow text-clay">01 / The journey</p>
          <h2 id="story-title" className="section-title mt-3 text-left text-forest">From Homa Bay to Addis<span className="text-clay">.</span></h2>
          <p className="mt-4 max-w-md text-[1.02rem] leading-[1.7] text-ink/75">
            A culinary scholarship opened the door. Kitchens on different continents gave Odi a way to learn from other cultures while staying close to his own.
          </p>
          <figure className="mt-6 max-w-md border-l-2 border-clay pl-4">
            <blockquote className="font-display text-[1.7rem] font-semibold leading-tight text-forest">&ldquo;It needs a lot of discipline and dedication.&rdquo;</blockquote>
            <figcaption className="mt-2 text-sm text-ink/65">
              Chef Odi, in an <a href={references.homaBay} target="_blank" rel="noreferrer noopener" className="link-underline font-semibold text-clay">interview with TUKO.co.ke <ArrowUpRight className="size-3.5" /></a>
            </figcaption>
          </figure>
        </div>
        <ol className="border-y border-ink/15">
          {timeline.map((stop) => (
            <li key={stop.marker} className="grid gap-1.5 border-b border-ink/12 py-5 last:border-b-0 sm:grid-cols-[8.2rem_1fr] sm:gap-5">
              <p className="eyebrow pt-1 text-clay">{stop.marker}</p>
              <div>
                <h3 className="font-display text-[1.72rem] leading-tight text-forest">{stop.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-[1.7] text-ink/73">{stop.description}</p>
                {stop.source && (
                  <a href={stop.source} target="_blank" rel="noreferrer noopener" className="link-underline mt-2 text-xs font-semibold text-clay">Read the feature <ArrowUpRight className="size-3.5" /></a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="collaboration-title" className="border-y border-ink/10 bg-cream-deep/65">
        <div className="site-shell grid gap-8 py-14 sm:py-17 md:grid-cols-[1.12fr_0.88fr] md:items-center lg:gap-15">
          <EditorialPhoto photo={photos.team} caption="The Marcus Addis team, from @chefodigowa" imageClassName="aspect-[4/3]" />
          <div>
            <p className="section-mark eyebrow text-clay">02 / Collaboration</p>
            <h2 id="collaboration-title" className="section-title mt-4 text-left text-[clamp(2.6rem,4.8vw,4.85rem)] text-forest">In the kitchen <span className="text-clay">together.</span></h2>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-ink/75">
              Odi has worked alongside Marcus Samuelsson since 2017. At Marcus Addis, they developed a hand-cut teff tagliatelle with roasted tomato, spinach and lemon, taking an Ethiopian staple somewhere new without losing what makes it special.
            </p>
            <a href={instagram.team} target="_blank" rel="noreferrer noopener" className="brand-button brand-button--outline mt-6">See the kitchen on Instagram <ArrowUpRight className="size-4" /></a>
          </div>
        </div>
      </section>

      <section id="food-advocacy" aria-labelledby="advocacy-title" className="site-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-9 md:grid-cols-[0.93fr_1.07fr] md:items-start lg:gap-14">
          <div>
            <p className="section-mark eyebrow text-clay">03 / Food advocacy</p>
            <h2 id="advocacy-title" className="section-title mt-3 text-left text-forest">Good food <span className="text-clay">for all.</span></h2>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-ink/75">From the Chefs’ Manifesto to workshops with young cooks, Odi uses his kitchen to champion local farmers, heritage crops and nutritious food with real flavour.</p>
            <EditorialPhoto className="mt-6" photo={photos.demo} caption="Live at the Culinary Village, Kigali" imageClassName="aspect-[5/4]" />
          </div>
          <ol className="divide-y divide-ink/15 border-y border-ink/15">
            {advocacy.map((item) => (
              <li key={item.title} className="py-5 sm:py-6">
                <p className="eyebrow text-clay">{item.date}</p>
                <h3 className="mt-2 font-display text-[1.75rem] leading-tight text-forest">{item.title}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-[1.7] text-ink/73">{item.description}</p>
                <a href={item.source} target="_blank" rel="noreferrer noopener" className="link-underline mt-3 text-xs font-semibold text-clay">{item.publisher} <ArrowUpRight className="size-3.5" /></a>
              </li>
            ))}
          </ol>
        </div>
        <EditorialPhoto photo={photos.bakers} caption="Meeting young bakers at the Cake Decoration Festival" imageClassName="aspect-[16/9] md:aspect-[2.4/1]" className="mt-8 sm:mt-10" sizes="(min-width: 1320px) 1200px, 94vw" />
      </section>

      <section className="site-shell pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-6 rounded-[1.3rem] bg-forest px-6 py-9 text-cream sm:px-9 sm:py-11">
          <div>
            <p className="section-mark eyebrow text-gold">Make something together</p>
            <h2 className="section-title mt-3 text-left text-[clamp(2.5rem,4.9vw,4rem)]">Bring a story to the table<span className="text-gold">.</span></h2>
          </div>
          <Link href="/contact" className="brand-button bg-gold text-forest-deep hover:bg-cream">Get in touch <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>
    </>
  );
}
