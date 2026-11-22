"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "@/components/icons";

export function CopyLink() {
  const [note, setNote] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNote("Link copied.");
    } catch {
      setNote("Copy the address from your browser to share this page.");
    }
  }

  return (
    <>
      <button type="button" className="brand-button brand-button--outline min-h-9 gap-1.5 px-3 py-2 text-xs" onClick={copy}>
        Copy link {note === "Link copied." ? <Check className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
      </button>
      {note && <p className="mt-2 text-xs text-ink/70" role="status">{note}</p>}
    </>
  );
}
