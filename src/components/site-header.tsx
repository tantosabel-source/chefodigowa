"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { ArrowUpRight, Close, Menu } from "@/components/icons";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const open = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="sticky top-0 z-50 border-b border-ink/12 bg-cream/95 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="site-shell flex h-[4.4rem] items-center justify-between gap-3 min-[860px]:grid min-[860px]:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex w-fit items-center gap-2.5" aria-label={`${site.chef} — Home`} onClick={closeMenu}>
          <svg aria-hidden="true" viewBox="0 0 64 64" className="size-10 shrink-0 sm:size-[2.65rem]">
            <rect width="64" height="64" rx="15" fill="var(--color-clay)" />
            <rect x="17" y="13" width="28" height="38" rx="14" fill="none" stroke="var(--color-cream)" strokeWidth="5" />
            <circle cx="48.5" cy="15.5" r="5" fill="var(--color-gold)" stroke="var(--color-clay)" strokeWidth="2" />
          </svg>
          <span className="leading-none">
            <span className="block font-display text-[1.6rem] font-extrabold uppercase leading-[0.9] tracking-[0.005em] text-forest sm:text-[1.85rem]">{site.chef}</span>
            <span className="mt-1.5 block text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ink/66">Culinary portfolio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 min-[860px]:flex lg:gap-8" aria-label="Primary navigation">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={closeMenu}
              className={`border-b-2 px-0.5 py-2 text-sm font-bold transition-colors ${isActive(item.href) ? "border-clay text-clay" : "border-transparent text-ink/72 hover:text-forest"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link href="/contact" className="brand-button brand-button--outline hidden min-h-10 px-3.5 sm:inline-flex" onClick={closeMenu}>
            Work with me <ArrowUpRight className="size-4" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="icon-button text-forest hover:bg-cream-deep min-[860px]:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" hidden={!open} aria-label="Mobile navigation" className="border-t border-ink/10 bg-cream min-[860px]:hidden">
        <div className="site-shell pb-5 pt-2">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                  className={`flex items-center justify-between border-b border-ink/10 py-3 font-display text-2xl font-bold ${isActive(item.href) ? "text-clay" : "text-forest"}`}
                >
                  {item.label} <ArrowUpRight className="size-4 text-ink/50" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
