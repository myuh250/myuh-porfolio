import type { ReactNode } from "react";

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightKeywords(text: string, keywords: string[]): ReactNode[] {
  const terms = [...new Set(keywords)]
    .filter((k) => k.length >= 2)
    .sort((a, b) => b.length - a.length);
  if (terms.length === 0) return [text];

  const pattern = new RegExp(
    `(${terms.map(escapeRe).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const hit = terms.some((k) => k.toLowerCase() === part.toLowerCase());
    if (hit) {
      return (
        <mark className="kw" key={`${part}-${i}`}>
          {part}
        </mark>
      );
    }
    return part;
  });
}
