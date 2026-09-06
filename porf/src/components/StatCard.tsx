import { useEffect, useRef, useState } from "react";
import { certs, type Cert, type Stat } from "../data/cv";

const STACK_COLOR: Record<string, string> = {
  Terraform: "var(--tf)",
  Terragrunt: "var(--tf)",
  modules: "var(--tf)",
  ArgoCD: "var(--argo)",
  Helm: "var(--helm)",
  Actions: "var(--gha)",
  Kubernetes: "var(--k8s)",
  Docker: "var(--docker)",
  OpenShift: "var(--oshift)",
  Trivy: "var(--trivy)",
  Sonar: "var(--sonar)",
  SBOM: "var(--trivy)",
  AWS: "var(--aws)",
  Azure: "var(--azure)",
  GCP: "var(--gcp)",
  "SAA-C03": "var(--aws)",
  Scrum: "var(--scrum)",
};

const ISSUER_COLOR: Record<string, string> = {
  aws: "var(--aws)",
  axon: "var(--scrum)",
  google: "var(--gcp)",
};

function certShort(c: Cert): string {
  if (c.name === "saa-c03") return "SAA-C03";
  if (c.name === "scrum-axon-active") return "Scrum";
  if (c.name === "gcp-fundamentals") return "GCP";
  return c.name;
}

type Slot = {
  name: string
  caption?: string
  href?: string
  color: string
};

function slotsFor(stat: Stat): Slot[] {
  if (stat.id === "cert") {
    return certs.map((c) => ({
      name: certShort(c),
      caption: c.title,
      href: c.href,
      color: ISSUER_COLOR[c.issuer] ?? "var(--aws)",
    }));
  }
  return stat.items.map((name) => ({
    name,
    color: STACK_COLOR[name] ?? "var(--text)",
  }));
}

const CYCLE_MS = 5000;

type Props = {
  stat: Stat
  delayMs: number
};

export function StatCard({ stat, delayMs }: Props) {
  const slots = slotsFor(stat);
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || slots.length < 2) return;

    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        if (paused.current) return;
        setI((n) => (n + 1) % slots.length);
      }, CYCLE_MS);
    }, delayMs);

    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [delayMs, slots.length]);

  const featured = slots[i] ?? slots[0];
  const rest = slots.filter((_, idx) => idx !== i);
  const accent = featured.color;

  return (
    <article
      className={`stat stat-${stat.id}`}
      style={{ ["--stat-accent" as string]: accent }}
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onClick={() => setI((n) => (n + 1) % slots.length)}
      title="Hover to pause · click to cycle"
    >
      <div className="label">{stat.label}</div>
      <div
        className={`value${featured.name.length > 14 ? " is-long" : ""}`}
        key={featured.name}
      >
        {featured.name}
      </div>
      {featured.caption ? (
        <a
          className="detail detail-link"
          href={featured.href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          key={`d-${featured.name}`}
        >
          {featured.caption}
        </a>
      ) : (
        <div className="detail" key={`d-${featured.name}`}>
          {rest.map((s) => s.name).join(" · ")}
        </div>
      )}
    </article>
  );
}
