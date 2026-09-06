export const VIEWS = [
  "overview",
  "workloads",
  "ingress",
  "certs",
  "skills",
] as const;

export type ViewId = (typeof VIEWS)[number];

export const engineer = {
  name: "Nguyen Tien Huy",
  slug: "nguyen-tien-huy",
  title: "DevOps & Infrastructure Engineer",
  badge: "AWS Solutions Architect Associate",
  certCode: "SAA-C03",
  location: "Go Vap District, Ho Chi Minh City",
  email: "huyng2724@gmail.com",
  phone: "0905963722",
  linkedin: "https://www.linkedin.com/in/huyng2724/",
  github: "https://github.com/myuh250",
  cvPdf: `${import.meta.env.BASE_URL}nguyen-tien-huy-devops.pdf`,
  namespace: "portfolio",
  context: "personal",
  age: "4y",
  education: {
    school: "HCMC University of Technology and Engineering",
    degree: "Bachelor of Engineering, Software Engineering",
    period: "Sep 2022 – Sep 2026",
    location: "Ho Chi Minh City, Vietnam",
  },
} as const;

export const describeLines: string[] = [
  `$ kubectl describe engineer ${engineer.slug}`,
  "",
  `Name:         ${engineer.slug}`,
  `Namespace:    ${engineer.namespace}`,
  `Status:       Running`,
  `Labels:       role=devops,interest=sre,aim=solutions-architect`,
  `Roles:        devops, infrastructure`,
  `Certs:        saa-c03`,
  `Contacts:     ${engineer.email}`,
  `              linkedin.com/in/huyng2724`,
  `              github.com/myuh250`,
];

export type Stat = {
  id: "iac" | "gitops" | "orch" | "sec" | "cloud" | "cert"
  label: string
  items: readonly string[]
};

export const stats: readonly Stat[] = [
  {
    id: "iac",
    label: "iac",
    items: ["Terraform", "Terragrunt", "modules"],
  },
  {
    id: "gitops",
    label: "gitops",
    items: ["ArgoCD", "Helm", "Actions"],
  },
  {
    id: "orch",
    label: "orch",
    items: ["Kubernetes", "Docker", "OpenShift"],
  },
  {
    id: "sec",
    label: "sec",
    items: ["Trivy", "Sonar", "SBOM"],
  },
  {
    id: "cloud",
    label: "cloud",
    items: ["AWS", "Azure", "GCP"],
  },
  {
    id: "cert",
    label: "cert",
    items: ["SAA-C03", "Scrum", "GCP"],
  },
];

export type WorkloadStatus = "Running" | "Completed";

export type Workload = {
  name: string
  title: string
  ready: string
  status: WorkloadStatus
  age: string
  org: string
  role: string
  location: string
  labels: Record<string, string>
  stack: string[]
  highlights: string[]
};

export const workloads: Workload[] = [
  {
    name: "bosch-devops-intern",
    title: "DevOps Intern",
    ready: "1/1",
    status: "Running",
    age: "Apr 2026 – Now",
    org: "Bosch Global Software Technologies (BGSV)",
    role: "DevOps Intern",
    location: "Ho Chi Minh City, Vietnam",
    labels: { org: "bgsv" },
    stack: [
      "GitHub Actions",
      "self-hosted runners",
      "Trivy",
      "SonarQube",
      "OpenShift",
      "Terraform",
      "Terragrunt",
      "ArgoCD",
      "Helm",
      "KEDA",
      "Grafana",
      "InfluxDB",
      "Telegraf",
      "Docker",
      "AWS",
    ],
    highlights: [
      "Engineered reusable, centralized CI/CD workflow templates (lint, build, scan, push) across repositories with Trivy and SonarQube gates, and self-managed self-hosted runners (pre-baked AMI + persistent build caches) that cut pipeline runtime ~65% (~35 to ~11 min).",
      "Extended CI/CD pipelines with automated deployments to OpenShift and to an on-prem VM upon successful builds.",
      "Designed a reusable, modular AWS infrastructure stack using Terraform + Terragrunt, with parameterized modules for multi-environment deployments, S3 remote state, and per-module GitHub Actions pipelines across networking, compute, and edge services.",
      "Implemented GitOps using ArgoCD and Helm (app-of-apps pattern) on Kubernetes/OpenShift, with KEDA-driven HPA autoscaling for high-throughput collectors; supported a migration of a large-scale observability stack (Grafana, InfluxDB, Telegraf) to a new production cluster.",
      "Customized a slim Docker base image with a CLI toolchain (k9s, AWS CLI, SSH), using proot for compatibility with OpenShift's non-root runtime.",
      "Designed and deployed three event-driven AWS automation stacks with modular Terraform: Bedrock token-usage cost tracking to DynamoDB, an IAM privilege-change audit with SNS alerts, and a real-time voice AI assistant over a secure WebSocket using Bedrock STT/TTS.",
    ],
  },
  {
    name: "manga-app-capstone",
    title: "Manga App — Cloud-Native Full-Stack Platform",
    ready: "1/1",
    status: "Completed",
    age: "Jan 2026 – Jun 2026",
    org: "Personal Project — Capstone",
    role: "Full-stack developer (team of 2); owned infrastructure, CI/CD, and cloud deployment",
    location: "Ho Chi Minh City, Vietnam",
    labels: { role: "infra", cloud: "aws" },
    stack: [
      "Flutter",
      "Spring Boot 21",
      "PostgreSQL",
      "Redis",
      "Terraform",
      "Terragrunt",
      "AWS",
      "GitHub Actions",
      "ECR",
      "Trivy",
      "SonarCloud",
      "k6",
    ],
    highlights: [
      "Tech stack: Flutter (web + mobile), Spring Boot 21, PostgreSQL, Redis, Terraform/Terragrunt, AWS.",
      "Provisioned the full AWS infrastructure with modular Terraform + Terragrunt: VPC, EC2, ALB with ACM-managed TLS, CloudFront, Route53, IAM, and CloudWatch/SNS monitoring and alarms.",
      "Built GitHub Actions CI/CD pipelines for both frontend (Flutter) and backend: automated tests with coverage and SonarCloud analysis, Docker build to Amazon ECR with Trivy scanning, and automated deployment.",
      "Load-tested the deployed system with k6, sustaining ~700 concurrent virtual users (peak ~1,200) on AWS.",
    ],
  },
  {
    name: "metadata-solutions-intern",
    title: "Intern",
    ready: "1/1",
    status: "Completed",
    age: "Jul 2025 – Oct 2025",
    org: "Metadata Solutions",
    role: "Intern",
    location: "Ho Chi Minh City, Vietnam",
    labels: { org: "metadata" },
    stack: ["n8n", "Docker", "AWS"],
    highlights: [
      "Self-hosted n8n via Docker on a provided on-prem device to run scheduled automation workflows integrating external APIs for data sync, with retry/error handling and logging.",
      "Co-hosted an internal AWS workshop with the CTO, presenting deployment best practices and workflows.",
    ],
  },
  {
    name: "aws-fcj-trainee",
    title: "Program Trainee",
    ready: "1/1",
    status: "Completed",
    age: "Apr 2025 – Aug 2025",
    org: "AWS First Cloud Journey (FCJ) Training Program",
    role: "Program Trainee",
    location: "Ho Chi Minh City, Vietnam",
    labels: { program: "fcj" },
    stack: ["AWS Lex", "Lambda", "S3", "API Gateway", "Bedrock", "Transcribe"],
    highlights: [
      "Completed self-paced AWS cloud training modules and technical sharing sessions.",
      "Built a multilingual conversational AI chatbot on a fully serverless AWS architecture (Lex, Lambda, S3, API Gateway, Bedrock).",
      "Integrated AWS Transcribe into a tool as an in-house alternative to Microsoft Teams' built-in transcription.",
    ],
  },
];

export type Cert = {
  name: string
  ready: "True"
  issuer: string
  age: string
  title: string
  href: string
  highlight?: boolean
};

export const certs: Cert[] = [
  {
    name: "saa-c03",
    ready: "True",
    issuer: "aws",
    age: "2026",
    title: "AWS Certified Solutions Architect — Associate (SAA-C03)",
    href: "https://www.credly.com/badges/1d29fae2-e9fb-409c-a081-f9dcf8e326fa/public_url",
    highlight: true,
  },
  {
    name: "scrum-axon-active",
    ready: "True",
    issuer: "axon",
    age: "2025",
    title: "Software Development with Scrum",
    href: "https://verified.sertifier.com/en/verify/36227717174527/",
  },
  {
    name: "gcp-fundamentals",
    ready: "True",
    issuer: "google",
    age: "—",
    title: "Google Cloud Skills Boost: GCP Fundamentals",
    href: "https://www.credly.com/users/nguy-n-ti-n-huy.f54890a1/badges/credly",
  },
];

export type SkillNode = {
  name: string
  status: "Ready"
  roles: string
  skills: string[]
};

export const nodes: SkillNode[] = [
  {
    name: "cloud",
    status: "Ready",
    roles: "control-plane",
    skills: ["AWS", "Azure", "GCP"],
  },
  {
    name: "iac",
    status: "Ready",
    roles: "worker",
    skills: ["Terraform", "Terragrunt", "Packer", "CloudFormation"],
  },
  {
    name: "orchestration",
    status: "Ready",
    roles: "worker",
    skills: ["Docker", "Kubernetes", "OpenShift", "Helm", "Kustomize"],
  },
  {
    name: "cicd-gitops",
    status: "Ready",
    roles: "worker",
    skills: [
      "GitHub Actions",
      "Gitea Actions",
      "ArgoCD",
      "self-hosted runners",
      "reusable pipeline templates",
    ],
  },
  {
    name: "automation",
    status: "Ready",
    roles: "worker",
    skills: ["n8n (self-hosted via Docker)", "cron", "webhook/API orchestration"],
  },
  {
    name: "security",
    status: "Ready",
    roles: "worker",
    skills: [
      "Trivy",
      "SonarQube/SonarCloud",
      "Dependency-Track",
      "k6",
      "SBOM/CVE remediation",
    ],
  },
  {
    name: "observability",
    status: "Ready",
    roles: "worker",
    skills: ["CloudWatch", "Grafana", "InfluxDB/Telegraf"],
  },
  {
    name: "languages",
    status: "Ready",
    roles: "worker",
    skills: [
      "Bash",
      "Python",
      "Java",
      "JavaScript",
      "Git",
      "Linux",
      "Vietnamese (native)",
      "English (IELTS 6.0)",
    ],
  },
];

export type IngressRoute = {
  name: string
  host: string
  backend: string
  port: string
  href: string
  external?: boolean
};

export const ingress: IngressRoute[] = [
  {
    name: "email",
    host: "mailto:huyng2724@gmail.com",
    backend: "email",
    port: "587",
    href: "mailto:huyng2724@gmail.com",
  },
  {
    name: "linkedin",
    host: "linkedin.com/in/huyng2724",
    backend: "linkedin",
    port: "443",
    href: "https://www.linkedin.com/in/huyng2724/",
    external: true,
  },
  {
    name: "github",
    host: "github.com/myuh250",
    backend: "github",
    port: "443",
    href: "https://github.com/myuh250",
    external: true,
  },
  {
    name: "phone",
    host: "tel:0905963722",
    backend: "phone",
    port: "—",
    href: "tel:0905963722",
  },
  {
    name: "cv-download",
    host: engineer.cvPdf,
    backend: "cv",
    port: "80",
    href: engineer.cvPdf,
  },
];

export type ClusterEvent = {
  ts: string
  resource: string
  reason: string
  message: string
};

export const events: ClusterEvent[] = [
  {
    ts: "2022-09",
    resource: "education",
    reason: "Scheduled",
    message: "Started B.Eng Software Engineering at HCMC UTE",
  },
  {
    ts: "2025-04",
    resource: "aws-fcj-trainee",
    reason: "Started",
    message: "AWS First Cloud Journey training program",
  },
  {
    ts: "2025-07",
    resource: "metadata-solutions-intern",
    reason: "Started",
    message: "Intern at Metadata Solutions",
  },
  {
    ts: "2025-10",
    resource: "metadata-solutions-intern",
    reason: "Completed",
    message: "Internship completed",
  },
  {
    ts: "2026-01",
    resource: "manga-app-capstone",
    reason: "Started",
    message: "Capstone: cloud-native manga platform",
  },
  {
    ts: "2026-04",
    resource: "bosch-devops-engineer",
    reason: "Started",
    message: "DevOps Engineer at Bosch BGSV",
  },
  {
    ts: "2026-06",
    resource: "manga-app-capstone",
    reason: "Completed",
    message: "Capstone closed · k6 ~700 VU",
  },
];

export function formatLabels(labels: Record<string, string>): string {
  return Object.entries(labels)
    .map(([k, v]) => `${k}=${v}`)
    .join(",");
}

const CV_KEYWORDS = [
  "CI/CD",
  "GitOps",
  "GitHub Actions",
  "self-hosted runners",
  "Trivy",
  "SonarQube",
  "SonarCloud",
  "OpenShift",
  "Terraform",
  "Terragrunt",
  "ArgoCD",
  "Helm",
  "Kubernetes",
  "KEDA",
  "HPA",
  "Grafana",
  "InfluxDB",
  "Telegraf",
  "Docker",
  "AWS CLI",
  "AWS",
  "k9s",
  "SSH",
  "proot",
  "Bedrock",
  "CloudWatch",
  "Lambda",
  "DynamoDB",
  "IAM",
  "SNS",
  "S3",
  "VPC",
  "EC2",
  "ALB",
  "ACM",
  "CloudFront",
  "Route53",
  "ECR",
  "Flutter",
  "Spring Boot",
  "PostgreSQL",
  "Redis",
  "k6",
  "n8n",
  "Lex",
  "API Gateway",
  "Transcribe",
  "AMI",
] as const;

export function keywordsFor(workload: Workload): string[] {
  return [...new Set([...workload.stack, ...CV_KEYWORDS])];
}
