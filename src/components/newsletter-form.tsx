"use client";

import { useActionState, useId } from "react";

import { subscribeToNotes } from "@/app/actions/public";
import { ArrowRight, Check } from "@/components/icons";
import { initialFormState } from "@/lib/forms";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [state, formAction, pending] = useActionState(subscribeToNotes, initialFormState);
  const id = useId();
  const dark = variant === "dark";

  if (state.status === "success") {
    return (
      <p className={`flex items-start gap-2 text-sm ${dark ? "text-cream" : "text-forest"}`} role="status">
        <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-gold" : "text-forest"}`} /> {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} aria-busy={pending} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">Email address for the kitchen letter</label>
        <input
          id={id}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Your email address"
          className={`min-w-0 flex-1 rounded-[0.6rem] border px-3.5 py-3 text-sm ${dark ? "border-cream/25 bg-cream/5 text-cream placeholder:text-cream/65 focus-visible:outline-gold" : "border-ink/20 bg-paper placeholder:text-ink/60"}`}
        />
        <button type="submit" disabled={pending} className={`brand-button w-full shrink-0 disabled:cursor-wait disabled:opacity-70 sm:w-fit ${dark ? "bg-gold text-forest-deep hover:bg-cream focus-visible:outline-gold" : ""}`}>
          {pending ? "Joining…" : "Subscribe"} <ArrowRight className="size-4" />
        </button>
      </div>
      {state.status === "error" && <p className={`mt-2 text-sm ${dark ? "text-gold" : "text-clay"}`} role="alert">{state.message}</p>}
    </form>
  );
}
