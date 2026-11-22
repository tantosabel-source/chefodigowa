"use client";

import { useActionState, useState } from "react";

import { submitContact } from "@/app/actions/public";
import { ArrowUpRight, Check } from "@/components/icons";
import { initialFormState, inquiryTopics } from "@/lib/forms";
import { site } from "@/lib/site";

const field = "w-full rounded-lg border border-ink/20 bg-white/75 px-3.5 py-3 text-sm leading-5 text-ink transition-colors placeholder:text-ink/55 focus:border-clay";
const label = "mb-1.5 block text-sm font-semibold text-forest";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialFormState);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const update = (name: keyof typeof draft, value: string) => setDraft((old) => ({ ...old, [name]: value }));

  if (state.status === "success") {
    return (
      <div className="rounded-[1.15rem] border border-forest/15 bg-paper p-8 sm:p-10" role="status">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream"><Check className="size-6" /></span>
        <h3 className="mt-5 font-display text-3xl text-forest">Message received</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{state.message}</p>
        <a href={site.socials[0].href} target="_blank" rel="noreferrer noopener" className="link-underline mt-5 text-sm font-semibold text-clay">Find {site.handle} on Instagram <ArrowUpRight className="size-4" /></a>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-[1.15rem] border border-ink/12 bg-paper p-5 sm:p-7" aria-busy={pending}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="contact-name" className={label}>Your name</label>
          <input id="contact-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Full name" value={draft.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "contact-name-error" : undefined} className={field} />
          {state.errors?.name && <p id="contact-name-error" className="mt-1.5 text-xs text-clay">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email address</label>
          <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" value={draft.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "contact-email-error" : undefined} className={field} />
          {state.errors?.email && <p id="contact-email-error" className="mt-1.5 text-xs text-clay">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className={label}>Phone <span className="font-normal text-ink/60">(optional)</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Including your country code" value={draft.phone} onChange={(e) => update("phone", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="contact-topic" className={label}>What is it about?</label>
          <select id="contact-topic" name="topic" value={draft.topic} onChange={(e) => update("topic", e.target.value)} className={field}>
            <option value="">General enquiry</option>
            {inquiryTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={label}>Your message</label>
          <textarea id="contact-message" name="message" rows={5} required minLength={12} maxLength={4000} placeholder="Tell me a bit about your project, preferred dates or event…" value={draft.message} onChange={(e) => update("message", e.target.value)} aria-invalid={!!state.errors?.message} aria-describedby={state.errors?.message ? "contact-message-error" : undefined} className={`${field} resize-y`} />
          {state.errors?.message && <p id="contact-message-error" className="mt-1.5 text-xs text-clay">{state.errors.message}</p>}
        </div>
      </div>
      {state.status === "error" && <p className="mt-4 text-sm text-clay-deep" role="alert">{state.message}</p>}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
        <p className="max-w-[16rem] text-xs leading-relaxed text-ink/65">Your details are only used to respond to your enquiry.</p>
        <button type="submit" disabled={pending} className="brand-button disabled:cursor-wait disabled:opacity-70">{pending ? "Sending…" : "Send message"} <ArrowUpRight className="size-4" /></button>
      </div>
    </form>
  );
}
