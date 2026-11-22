import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <p className="eyebrow text-clay">404 · Off the menu</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[1] text-forest">
          This dish never made it
          <span className="italic text-clay"> to the pass.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
          The page you were looking for has been moved, renamed or was never on the menu. Let&apos;s
          get you back to something delicious.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-deep"
          >
            Back home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest hover:bg-forest/5"
          >
            Browse recipes
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
