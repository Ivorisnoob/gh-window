"use client";

import { useState } from "react";

interface Props {
  markdown: string;
}

export default function CopyMarkdownButton({ markdown }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`docs-action${copied ? " docs-action-active" : ""}`}
      aria-live="polite"
    >
      {copied ? "Copied Markdown" : "Copy as Markdown"}
    </button>
  );
}
