"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction } from "@/app/actions/admin";
import { ArrowRight, Lock } from "@/components/icons";
import { initialFormState } from "@/lib/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Checking…" : "Enter the studio"}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialFormState);

  return (
    <form action={formAction}>
      <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-ink/70">
        Studio password
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-ink/15 bg-white/80 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-clay/60 focus:bg-white"
        />
      </div>
      {state.status === "error" && (
        <p className="mt-2 text-xs text-clay" role="alert">
          {state.message}
        </p>
      )}
      <div className="mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
