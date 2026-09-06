const SKILL_COLOR: Record<string, string> = {
  AWS: "var(--aws)",
  Azure: "var(--azure)",
  GCP: "var(--gcp)",
  Terraform: "var(--tf)",
  Terragrunt: "var(--tf)",
  Packer: "var(--tf)",
  CloudFormation: "var(--aws)",
  Docker: "var(--docker)",
  Kubernetes: "var(--k8s)",
  OpenShift: "var(--oshift)",
  Helm: "var(--helm)",
  Kustomize: "var(--k8s)",
  "GitHub Actions": "var(--gha)",
  "Gitea Actions": "var(--gitea)",
  ArgoCD: "var(--argo)",
  "self-hosted runners": "var(--gha)",
  "reusable pipeline templates": "var(--gha)",
  "n8n (self-hosted via Docker)": "var(--n8n)",
  cron: "var(--warn)",
  "webhook/API orchestration": "var(--k8s)",
  Trivy: "var(--trivy)",
  "SonarQube/SonarCloud": "var(--sonar)",
  "Dependency-Track": "var(--warn)",
  k6: "var(--k6)",
  "SBOM/CVE remediation": "var(--trivy)",
  CloudWatch: "var(--aws)",
  Grafana: "var(--grafana)",
  "InfluxDB/Telegraf": "var(--influx)",
  Bash: "var(--ready)",
  Python: "var(--python)",
  Java: "var(--java)",
  JavaScript: "var(--js)",
  Git: "var(--git)",
  Linux: "var(--linux)",
  "Vietnamese (native)": "var(--muted)",
  "English (IELTS 6.0)": "var(--muted)",
};

export function skillColor(skill: string): string {
  if (SKILL_COLOR[skill]) return SKILL_COLOR[skill];
  const s = skill.toLowerCase();
  if (s.includes("aws")) return "var(--aws)";
  if (s.includes("azure")) return "var(--azure)";
  if (s.includes("gcp") || s.includes("google")) return "var(--gcp)";
  return "var(--muted)";
}
