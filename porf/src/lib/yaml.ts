import {
  certs,
  engineer,
  nodes,
  workloads,
  type Cert,
  type SkillNode,
  type Workload,
} from "../data/cv";

function yamlList(items: string[], indent: number): string {
  const pad = " ".repeat(indent);
  return items.map((item) => `${pad}- ${item}`).join("\n");
}

function yamlLabels(labels: Record<string, string>, indent: number): string {
  const pad = " ".repeat(indent);
  return Object.entries(labels)
    .map(([k, v]) => `${pad}${k}: ${v}`)
    .join("\n");
}

export function engineerToYaml(): string {
  return [
    "apiVersion: portfolio.local/v1",
    "kind: Engineer",
    "metadata:",
    `  name: ${engineer.slug}`,
    `  namespace: ${engineer.namespace}`,
    "  labels:",
    "    role: devops",
    "    cert: saa-c03",
    "spec:",
    `  title: ${engineer.title}`,
    `  location: ${engineer.location}`,
    `  context: ${engineer.context}`,
    "  contacts:",
    `    email: ${engineer.email}`,
    `    phone: "${engineer.phone}"`,
    `    linkedin: ${engineer.linkedin}`,
    `    github: ${engineer.github}`,
    "  education:",
    `    school: ${engineer.education.school}`,
    `    degree: ${engineer.education.degree}`,
    `    period: ${engineer.education.period}`,
  ].join("\n");
}

export function workloadToYaml(w: Workload, opts: { highlights?: boolean } = {}): string {
  const includeHighlights = opts.highlights ?? true;
  const lines = [
    "apiVersion: apps/v1",
    "kind: Deployment",
    "metadata:",
    `  name: ${w.name}`,
    `  namespace: ${engineer.namespace}`,
    "  labels:",
    yamlLabels(w.labels, 4),
    "spec:",
    `  title: ${w.title}`,
    `  org: ${w.org}`,
    `  role: ${w.role}`,
    `  location: ${w.location}`,
    `  period: ${w.age}`,
    `  status: ${w.status}`,
    "  stack:",
    yamlList(w.stack, 4),
  ];
  if (includeHighlights) {
    lines.push("  highlights:", yamlList(w.highlights, 4));
  }
  return lines.join("\n");
}

export function certToYaml(c: Cert): string {
  return [
    "apiVersion: cert-manager.io/v1",
    "kind: Certificate",
    "metadata:",
    `  name: ${c.name}`,
    `  namespace: ${engineer.namespace}`,
    "spec:",
    `  commonName: ${c.title}`,
    `  issuerRef: ${c.issuer}`,
    `  ready: ${c.ready}`,
    `  issued: "${c.age}"`,
    `  url: ${c.href}`,
  ].join("\n");
}

export function nodeToYaml(n: SkillNode): string {
  return [
    "apiVersion: v1",
    "kind: Node",
    "metadata:",
    `  name: ${n.name}`,
    "  labels:",
    `    kubernetes.io/role: ${n.roles}`,
    "spec:",
    `  status: ${n.status}`,
    "  skills:",
    yamlList(n.skills, 4),
  ].join("\n");
}

export function contactToYaml(): string {
  return [
    "apiVersion: networking.k8s.io/v1",
    "kind: Ingress",
    "metadata:",
    "  name: contact",
    `  namespace: ${engineer.namespace}`,
    "spec:",
    `  email: ${engineer.email}`,
    `  phone: "${engineer.phone}"`,
    `  linkedin: ${engineer.linkedin}`,
    `  github: ${engineer.github}`,
    `  cv: ${engineer.cvPdf}`,
  ].join("\n");
}

export function resourceYaml(
  view: "overview" | "workloads" | "ingress" | "certs" | "nodes",
  index: number,
): { name: string; yaml: string } {
  switch (view) {
    case "overview":
      return { name: engineer.slug, yaml: engineerToYaml() };
    case "workloads":
      return {
        name: workloads[index]?.name ?? engineer.slug,
        yaml: workloadToYaml(workloads[index] ?? workloads[0]),
      };
    case "certs":
      return {
        name: certs[index]?.name ?? certs[0].name,
        yaml: certToYaml(certs[index] ?? certs[0]),
      };
    case "nodes":
      return {
        name: nodes[index]?.name ?? nodes[0].name,
        yaml: nodeToYaml(nodes[index] ?? nodes[0]),
      };
    case "ingress":
      return { name: "contact", yaml: contactToYaml() };
  }
}

