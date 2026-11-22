import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminNav } from "@/components/admin/admin-nav";
import { ArrowUpRight } from "@/components/icons";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAdminMessages } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Chef studio",
  description: "Private dashboard for the recipes, journal and messages.",
};

export default async function StudioLayout({ children }: { children: ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const { rows } = await getAdminMessages();
  const unread = rows.filter((message) => !message.handled).length;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-clay">Chef studio</p>
          <h1 className="mt-1.5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] leading-none text-forest">
            Your kitchen office
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink/40">
            Signed in as chef
          </span>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 px-3.5 py-1.5 text-[0.72rem] font-semibold text-forest hover:bg-forest/5"
          >
            View site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
        <AdminNav unread={unread} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
