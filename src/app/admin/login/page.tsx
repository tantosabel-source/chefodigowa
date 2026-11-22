import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowUpRight } from "@/components/icons";
import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { imageBank, site } from "@/lib/site";

export const metadata = {
  title: "Chef studio login",
  description: "Private dashboard for managing recipes, journal entries and messages.",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/55 lg:grid-cols-[1fr_1fr]">
        <div className="relative hidden min-h-[420px] lg:block">
          <Image
            src={imageBank.tableSpread}
            alt="A shared platter of Ethiopian dishes from Chefodigowa’s feed"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
            <p className="eyebrow text-gold">Behind the pass</p>
            <p className="mt-2 font-display text-2xl leading-snug">
              The chef studio — where new recipes, field notes and conversations are kept in
              order.
            </p>
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <p className="eyebrow text-clay">Private area</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.02] text-forest">
            Welcome back to the studio
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Sign in to publish recipes, update the journal and read messages from the contact
            page.
          </p>

          <div className="mt-7">
            <LoginForm />
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-clay/35 bg-clay/5 px-4 py-3">
            <p className="text-[0.7rem] leading-relaxed text-ink/55">
              <span className="font-semibold text-clay">Preview access:</span> use{" "}
              <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[0.7rem]">
                chefodi2026
              </code>{" "}
              to explore the dashboard. Set an <code className="font-mono">ADMIN_PASSWORD</code>{" "}
              environment variable to secure it properly.
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-forest hover:text-clay"
          >
            Back to the website
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <p className="mt-6 text-[0.68rem] text-ink/35">
            {site.fullName} · {site.chef} studio
          </p>
        </div>
      </div>
    </section>
  );
}
