import type { ReactNode } from "react";
import { certs, describeLines, engineer, stats } from "../data/cv";
import { useTypewriter } from "../hooks/useTypewriter";
import { StatCard } from "./StatCard";

const describeLinks = [
  { needle: engineer.email, href: `mailto:${engineer.email}` },
  { needle: "linkedin.com/in/huyng2724", href: engineer.linkedin },
  { needle: "github.com/myuh250", href: engineer.github },
  { needle: "saa-c03", href: certs[0].href },
] as const;

function linkifyDescribe(text: string): ReactNode[] {
  const hits: { start: number; end: number; href: string; label: string }[] = [];
  for (const link of describeLinks) {
    let from = 0;
    while (from < text.length) {
      const start = text.indexOf(link.needle, from);
      if (start === -1) break;
      hits.push({
        start,
        end: start + link.needle.length,
        href: link.href,
        label: link.needle,
      });
      from = start + link.needle.length;
    }
  }
  hits.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, i) => {
    if (hit.start < cursor) return;
    if (hit.start > cursor) nodes.push(text.slice(cursor, hit.start));
    const external = hit.href.startsWith("http");
    nodes.push(
      <a
        key={`${hit.start}-${i}`}
        href={hit.href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {hit.label}
      </a>,
    );
    cursor = hit.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function Overview() {
  const { text, done, skip } = useTypewriter(describeLines);

  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>{engineer.name}</h1>
        <p className="hero-meta">
          <span className="role">{engineer.title}</span>
          <span className="hero-sep" aria-hidden="true">
            ·
          </span>
          <a
            className="cred"
            href={certs[0].href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {engineer.badge}
          </a>
        </p>
        <p className="hero-loc">{engineer.location}</p>
      </div>
      <div
        className="terminal"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) return;
          skip();
        }}
        title="Click to skip typing"
      >
        <div className="terminal-bar">
          <div className="terminal-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          kubectl · {engineer.context}
        </div>
        <pre>
          {linkifyDescribe(text)}
          {!done ? <span className="cursor" /> : null}
        </pre>
      </div>
      <div className="stats">
        {stats.map((s, i) => (
          <StatCard key={s.id} stat={s} delayMs={i * 420} />
        ))}
      </div>
      <article className="edu">
        <div className="k">education</div>
        <div className="school">{engineer.education.school}</div>
        <div className="degree">{engineer.education.degree}</div>
        <div className="kv">
          {engineer.education.period} · {engineer.education.location}
        </div>
      </article>
    </section>
  );
}
