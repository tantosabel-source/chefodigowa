"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/app/actions/admin";
import { ArrowUpRight, Book, Grid, Inbox, LogOut, Plus } from "@/components/icons";

const links = [
  { href: "/admin", label: "Overview", icon: Grid },
  { href: "/admin/posts", label: "Recipes & journal", icon: Book },
  { href: "/admin/messages", label: "Inbox", icon: Inbox },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ink/10 bg-white/60 p-2 lg:flex-col lg:items-stretch lg:gap-1">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[0.8rem] font-semibold transition-colors lg:flex-none ${
                active ? "bg-forest text-cream" : "text-ink/65 hover:bg-ink/5 hover:text-forest"
              }`}
            >
              <link.icon className="h-4 w-4" />
              <span className="flex-1">{link.label}</span>
              {link.href === "/admin/messages" && unread > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.62rem] ${
                    active ? "bg-gold text-forest-deep" : "bg-clay text-cream"
                  }`}
                >
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <Link
        href="/admin/posts/new"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-clay px-4 py-3 text-[0.8rem] font-semibold text-cream transition-colors hover:bg-clay-deep"
      >
        <Plus className="h-4 w-4" />
        New entry
      </Link>

      <div className="mt-3 hidden flex-col gap-1 rounded-2xl border border-ink/10 bg-white/40 p-2 lg:flex">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[0.78rem] font-medium text-ink/60 hover:bg-ink/5 hover:text-forest"
        >
          <ArrowUpRight className="h-4 w-4" />
          View live site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-[0.78rem] font-medium text-ink/60 transition-colors hover:bg-clay/10 hover:text-clay"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
