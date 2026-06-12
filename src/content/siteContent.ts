import portrait from "../assets/me_about_me.png";

export const navigationItems = [
  { href: "#top", label: "Home", shortLabel: "Home" },
  { href: "#work", label: "Work", shortLabel: "Work" },
  { href: "#capabilities", label: "Capabilities", shortLabel: "Stack" },
  { href: "#experience", label: "Experience", shortLabel: "CV" },
  { href: "#contact", label: "Contact", shortLabel: "Talk" },
] as const;

export const heroContent = {
  eyebrow: "~/daniel-krejza — backend & full-stack developer",
  titleLines: [
    { text: "Code that ships.", accent: false },
    { text: "Systems that last.", accent: true },
  ],
  description:
    "Backend developer with 4+ years shipping production code for one of the largest retail platforms in Central Europe. PHP/Laravel, Node.js, and TypeScript — owned end-to-end, from first commit to production rollout.",
  primaryCta: {
    href: "#work",
    label: "Explore selected work",
  },
  secondaryCta: {
    href: "#contact",
    label: "Start a conversation",
  },
  stats: [
    { value: "4+", label: "years shipping production code" },
    { value: "Millions", label: "of customers on platforms I build for" },
    { value: "1:1", label: "individual approach — you work directly with me" },
  ],
} as const;

export const marqueeSkills = [
  "PHP / Laravel",
  "Node.js",
  "NestJS",
  "TypeScript",
  "GraphQL",
  "React",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Azure DevOps",
  "Ansible",
  "WebRTC",
] as const;

export const sectionMeta = {
  work: {
    index: "01",
    eyebrow: "Selected work",
    title: "Real systems. Real users. Real constraints.",
    description:
      "Highlights from production delivery — backend architecture, operational tooling, cloud pipelines, and end-to-end full-stack product work.",
  },
  capabilities: {
    index: "02",
    eyebrow: "Capabilities",
    title: "Depth where it matters, range where it helps.",
    description:
      "A backend core with the full-stack and platform skills to carry a feature from idea to reliable release without hand-offs.",
  },
  experience: {
    index: "03",
    eyebrow: "Experience",
    title: "A toolkit built through delivery, not tutorials.",
    description:
      "Application development combined with deployment pipelines, automation playbooks, cloud services, and production-focused engineering practice.",
  },
  contact: {
    index: "04",
    eyebrow: "Contact",
  },
} as const;

export const projects = [
  {
    kicker: "Enterprise retail",
    title: "Backend Engineer — Tesco Clubcard Platform",
    summary:
      "Backend developer on the Clubcard middleware platform serving millions of customers across Central Europe. Day-to-day Laravel/PHP development of REST APIs, Redis caching strategies, queue workers, Azure Key Vault integration, identity and authentication flows, upload and reporting pipelines, and architectural decisions around deployment and scale.",
    tags: ["Laravel", "PHP", "REST APIs", "Redis", "PostgreSQL", "MySQL", "Azure"],
  },
  {
    kicker: "Healthcare product",
    title: "Telemedicine Platform (Lead Developer)",
    summary:
      "Lead developer on a telemedicine platform delivered for client use. NestJS + GraphQL backend with MikroORM and PostgreSQL, React/TypeScript frontend, WebRTC peer-to-peer video consultations, Socket.IO real-time chat, hybrid RBAC/ABAC permissions for medical record access, and GDPR-conscious consent management. Owned architecture, technology decisions, and core implementation across the stack.",
    tags: ["NestJS", "GraphQL", "React", "TypeScript", "WebRTC", "PostgreSQL"],
  },
  {
    kicker: "Platform engineering",
    title: "Delivery Automation & Platform Tooling",
    summary:
      "Supporting infrastructure work alongside backend development: 20+ Ansible playbooks for fleet management and remediation, Azure DevOps CI/CD pipelines with self-hosted agents, certificate-based authentication migration, and Docker deployment troubleshooting. The kind of platform skills that make backend delivery reliable end-to-end.",
    tags: ["Ansible", "Azure Pipelines", "Docker", "Linux"],
  },
] as const;

export const capabilities = [
  {
    title: "Backend Development",
    text: "Designing and building production APIs and services in PHP/Laravel, Node.js/NestJS, and TypeScript. REST and GraphQL, relational data modeling, caching strategies, queue-based async processing, and integration with third-party identity and storage systems.",
  },
  {
    title: "Full-stack Delivery",
    text: "Shipping features end-to-end including React/TypeScript frontend work, real-time communication with WebSockets and WebRTC, and access control patterns like RBAC and ABAC for production data sensitivity requirements.",
  },
  {
    title: "Platform & Delivery",
    text: "Hands-on experience with Azure DevOps Pipelines, Ansible automation, Docker, Azure Key Vault, and Linux administration — the parts of the job that turn good code into reliable releases without waiting for someone else.",
  },
] as const;

export const experienceGroups = [
  {
    title: "Backend & languages",
    items: [
      "PHP / Laravel",
      "Node.js / NestJS",
      "TypeScript",
      "GraphQL",
      "REST API design",
      "PostgreSQL / MySQL",
      "Redis",
    ],
  },
  {
    title: "Frontend & real-time",
    items: [
      "React",
      "TypeScript",
      "WebRTC",
      "Socket.IO / WebSockets",
      "MikroORM",
    ],
  },
  {
    title: "Platform & delivery",
    items: [
      "Azure DevOps Pipelines",
      "Azure Key Vault",
      "Ansible",
      "Docker",
      "Linux administration",
      "CI/CD design",
      "GIT",
    ],
  },
] as const;

export const aboutCard = {
  portrait,
  name: "Daniel Krejza",
  line: "Backend developer who treats delivery — pipelines, releases, monitoring — as part of the job, not someone else's problem.",
} as const;

export const contactContent = {
  titleLines: [
    { text: "Let's build something", accent: false },
    { text: "that lasts.", accent: true },
  ],
  description:
    "Tell me about your product, platform, or problem — I'll bring the engineering. Usually responding within a day.",
} as const;

export const contactChannels = [
  {
    label: "Email",
    value: "daniel.krejza@gmail.com",
    href: "mailto:daniel.krejza@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/daniel-krejza",
    href: "https://www.linkedin.com/in/daniel-krejza/",
  },
  {
    label: "Instagram",
    value: "@codewithdeekeej",
    href: "https://www.instagram.com/codewithdeekeej/",
  },
] as const;

export const footerContent = {
  signature: "Daniel Krejza",
  note: "Backend developer focused on shipping production-grade APIs and services, with the platform skills to own delivery end-to-end.",
} as const;
