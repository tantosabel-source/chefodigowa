import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { EditorialPhoto } from "@/components/editorial-photo";
import { ArrowUpRight, Mail, MapPin, Phone, Plus, socialIcons } from "@/components/icons";
import { photos } from "@/lib/photo-stories";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Chefodigowa for private dining, recipe development, workshops, food advocacy or press enquiries.",
};

const faqs = [
  { question: "What can we work on together?", answer: "Get in touch about private dining, menu or recipe development, masterclasses, food writing, press and partnerships that put African ingredients at the centre of the table." },
  { question: "Do you travel for projects?", answer: "I am based in Addis Ababa and open to collaborations elsewhere. Include your location, preferred dates and any travel details in your note." },
  { question: "What should I include in my message?", answer: "A short introduction, what you have in mind, the date or timeline, and where the project will happen. For an event, an estimate of guest numbers is helpful." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate border-b border-ink/10">
        <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="site-shell grid gap-8 py-10 sm:py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center lg:gap-14">
          <div className="fade-up">
            <p className="section-mark eyebrow text-clay">Contact &amp; collaborations</p>
            <h1 className="section-title mt-4 max-w-[13ch] text-left text-[clamp(3rem,7vw,6.25rem)] text-forest">
              Let&apos;s cook <span className="text-clay">together.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-[1.7] text-ink/75">
              A table to fill, a menu to build or a food story to tell? Send a note about what you&apos;re planning.
            </p>
            <a href="#enquiry" className="brand-button mt-6">Send an enquiry <ArrowUpRight className="size-4" /></a>
          </div>
          <EditorialPhoto
            photo={photos.biodiversity}
            caption="Biodiversity Bites, Addis Ababa"
            imageClassName="aspect-[4/3] sm:aspect-[5/4]"
            className="fade-up-late"
            sizes="(min-width: 1320px) 490px, (min-width: 768px) 43vw, 94vw"
            preload
          />
        </div>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="site-shell grid gap-8 py-14 sm:py-17 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          <div className="mb-5">
            <p className="section-mark eyebrow text-clay">Start here</p>
            <h2 id="enquiry-title" className="mt-2 font-display text-[2.5rem] leading-none text-forest">Send a note</h2>
          </div>
          <ContactForm />
        </div>
        <aside className="self-start overflow-hidden rounded-[1.15rem] border border-ink/12 bg-paper">
          <div className="border-b border-ink/12 p-5 sm:p-7">
            <p className="eyebrow text-clay">Direct lines</p>
            <ul className="mt-4 space-y-3.5 text-sm font-semibold text-forest">
              <li className="flex items-center gap-3"><MapPin className="size-4.5 text-clay" /> {site.location}</li>
              {site.email && <li><a className="link-underline flex-wrap break-all" href={`mailto:${site.email}`}><Mail className="size-4.5 text-clay" /> {site.email}</a></li>}
              {site.phone && <li><a className="link-underline" href={`tel:${site.phoneHref}`}><Phone className="size-4.5 text-clay" /> {site.phone}</a></li>}
            </ul>
          </div>
          <div className="bg-forest p-5 text-cream sm:p-7">
            <p className="eyebrow text-gold">Follow the kitchen</p>
            <ul className="mt-2 divide-y divide-cream/18">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.icon}>
                    <a href={social.href} target="_blank" rel="noreferrer noopener" className="group flex items-center justify-between gap-3 py-3.5 text-sm hover:text-gold">
                      <span className="flex items-center gap-2.5 font-semibold"><Icon className="size-4.5 text-gold" /> {social.label}</span>
                      <span className="flex items-center gap-1.5 text-xs text-cream/75 group-hover:text-gold">{social.handle} <ArrowUpRight className="size-4" /></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-ink/10 bg-cream-deep/60">
        <div className="site-shell grid gap-6 py-13 sm:py-16 md:grid-cols-[0.75fr_1.25fr] md:gap-12">
          <div>
            <p className="section-mark eyebrow text-clay">Good to know</p>
            <h2 id="faq-heading" className="section-title mt-3 text-left text-[clamp(2.6rem,4.3vw,4rem)] text-forest">A few questions<span className="text-clay">.</span></h2>
          </div>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.5rem] font-bold leading-tight text-forest [&::-webkit-details-marker]:hidden">
                  {question}
                  <span className="icon-button size-8 text-clay group-open:rotate-45"><Plus className="size-4" /></span>
                </summary>
                <p className="mt-2.5 max-w-xl pb-1 text-sm leading-[1.7] text-ink/75">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
