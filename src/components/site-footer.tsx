import Link from "next/link";

import { ArrowUpRight, socialIcons } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="site-shell pt-13 sm:pt-16">
        <div className="grid gap-9 pb-10 sm:gap-12 md:grid-cols-[1.2fr_1fr] md:pb-14 lg:gap-20">
          <div>
            <p className="section-mark eyebrow text-gold">The kitchen letter</p>
            <h2 className="section-title mt-3 max-w-[14ch] text-left text-[clamp(2.6rem,5vw,4.4rem)]">A seat at <span className="text-gold">the table.</span></h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/78">Sign up for recipes, ingredients worth getting to know, and stories from the kitchen.</p>
            <div className="mt-5 max-w-md"><NewsletterForm variant="dark" /></div>
          </div>

          <div className="grid grid-cols-2 gap-5 border-t border-cream/15 pt-6 md:border-t-0 md:pt-1 lg:gap-8">
            <div>
              <p className="eyebrow text-gold">Explore</p>
              <ul className="mt-4 space-y-3 text-sm">
                {site.nav.map((item) => (
                  <li key={item.href}><Link href={item.href} className="link-underline text-cream/84 hover:text-cream">{item.label}</Link></li>
                ))}
                <li><Link href="/admin" className="link-underline text-cream/63 hover:text-cream">Chef studio</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold">Stay in touch</p>
              <ul className="mt-4 space-y-3 text-sm text-cream/84">
                <li>{site.location}</li>
                {site.email && <li><a href={`mailto:${site.email}`} className="link-underline break-all">{site.email}</a></li>}
                {site.phone && <li><a href={`tel:${site.phoneHref}`} className="link-underline">{site.phone}</a></li>}
                <li><Link href="/contact" className="link-underline text-cream">Contact the chef <ArrowUpRight className="size-3.5" /></Link></li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label} className="icon-button size-9 border-cream/25 text-cream/82 hover:bg-cream/10 hover:text-gold">
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-cream/18 py-5 text-xs text-cream/70">
          <p>© {new Date().getFullYear()} {site.chef} · {site.fullName}</p>
          <p>Portfolio photography credited alongside each image.</p>
        </div>
      </div>
    </footer>
  );
}
