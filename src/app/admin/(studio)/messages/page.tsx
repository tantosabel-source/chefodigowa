import {
  deleteMessageAction,
  markMessageAction,
} from "@/app/actions/admin";
import { ConfirmDelete } from "@/components/admin/confirm-submit";
import { Check, Inbox, Mail, Phone } from "@/components/icons";
import { formatDateTime } from "@/lib/format";
import { getAdminMessages } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ deleted?: string; error?: string }>;
};

export default async function AdminMessagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { rows, error } = await getAdminMessages();
  const unread = rows.filter((message) => !message.handled).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-clay">Contact form</p>
          <h2 className="mt-1 font-display text-2xl text-forest">Inbox</h2>
        </div>
        <p className="text-[0.72rem] uppercase tracking-[0.12em] text-ink/40">
          {rows.length} total · {unread} awaiting reply
        </p>
      </div>

      {params.deleted && (
        <div className="rounded-xl border border-forest/20 bg-forest/5 px-4 py-3 text-sm text-forest">
          Message deleted.
        </div>
      )}
      {(params.error || error) && (
        <div className="rounded-xl border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay-deep">
          The messages table is not available yet. Push the database schema and refresh.
        </div>
      )}

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-white/50 px-6 py-16 text-center">
          <Inbox className="mx-auto h-8 w-8 text-clay/50" />
          <p className="mt-3 font-display text-xl text-forest">No messages yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-ink/50">
            Enquiries sent through the contact page will appear here. Try submitting the form to
            see the workflow end to end.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((message) => (
            <li
              key={message.id}
              className={`rounded-2xl border p-5 ${
                message.handled
                  ? "border-ink/10 bg-white/40"
                  : "border-clay/25 bg-white/70"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg leading-none text-forest">
                      {message.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${
                        message.handled
                          ? "bg-olive/20 text-forest/70"
                          : "bg-clay/12 text-clay-deep"
                      }`}
                    >
                      {message.handled ? "Handled" : "New"}
                    </span>
                    <span className="rounded-full bg-cream-deep px-2 py-0.5 text-[0.6rem] font-semibold text-forest/70">
                      {message.topic}
                    </span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] text-ink/50">
                    <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1.5 hover:text-clay">
                      <Mail className="h-3.5 w-3.5" />
                      {message.email}
                    </a>
                    {message.phone && (
                      <a href={`tel:${message.phone}`} className="inline-flex items-center gap-1.5 hover:text-clay">
                        <Phone className="h-3.5 w-3.5" />
                        {message.phone}
                      </a>
                    )}
                    <span>{formatDateTime(message.createdAt)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent(
                      `Re: ${message.topic}`,
                    )}`}
                    className="rounded-full bg-forest px-3.5 py-1.5 text-[0.68rem] font-semibold text-cream hover:bg-forest-deep"
                  >
                    Reply
                  </a>
                  <form action={markMessageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="handled" value={String(!message.handled)} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 text-[0.68rem] font-semibold text-ink/60 hover:border-forest hover:text-forest"
                    >
                      <Check className="h-3 w-3" />
                      {message.handled ? "Reopen" : "Mark handled"}
                    </button>
                  </form>
                  <form action={deleteMessageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <ConfirmDelete
                      label="Delete"
                      className="rounded-full border border-transparent px-2.5 py-1.5 text-[0.68rem] font-semibold text-clay/70 hover:border-clay/40 hover:bg-clay/5 hover:text-clay"
                    />
                  </form>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-line border-t border-ink/8 pt-3 text-[0.88rem] leading-relaxed text-ink/70">
                {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
