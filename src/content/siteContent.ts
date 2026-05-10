import portrait from "../assets/me.png";

export const navigationItems = [
  { href: "#top", label: "Home", shortLabel: "Home" },
  { href: "#work", label: "Work", shortLabel: "Work" },
  { href: "#capabilities", label: "Capabilities", shortLabel: "Stack" },
  { href: "#experience", label: "Experience", shortLabel: "CV" },
  { href: "#contact", label: "Contact", shortLabel: "Talk" },
] as const;

export const heroContent = {
  eyebrow: "Daniel Krejza | Backend & Full-stack Developer",
  title: "Backend developer building production systems for enterprise and product teams.",
  description:
    "I'm a backend developer with 4+ years of hands-on experience shipping production code for one of the largest retail platforms in Central Europe. My day-to-day is application development in PHP/Laravel, Node.js, and TypeScript — with a strong supporting skill set in CI/CD, cloud automation, and infrastructure tooling that lets me own features end-to-end, from first commit to production rollout.",
  primaryCta: {
    href: "#work",
    label: "Explore selected work",
  },
  secondaryCta: {
    href: "#contact",
    label: "Start a conversation",
  },
  highlights: [
    "4+ years building backend systems in production",
    "PHP/Laravel, Node.js, NestJS, TypeScript, GraphQL, React",
    "Comfortable owning delivery: code, pipelines, and release",
  ],
  portrait,
};

export const projects = [
  {
    title: "Backend Engineer — Tesco Clubcard Platform",
    summary:
      "Backend developer on the Clubcard middleware platform serving millions of customers across Central Europe. Day-to-day Laravel/PHP development of REST APIs, Redis caching strategies, queue workers, Azure Key Vault integration, identity and authentication flows, upload and reporting pipelines, and architectural decisions around deployment and scale.",
    tags: ["Laravel", "PHP", "REST APIs", "Redis", "PostgreSQL"],
  },
  {
    title: "MedicWork — Telemedicine Platform (Lead Developer)",
    summary:
      "Lead developer on a telemedicine platform delivered for client use. NestJS + GraphQL backend with MikroORM and PostgreSQL, React/TypeScript frontend, WebRTC peer-to-peer video consultations, Socket.IO real-time chat, hybrid RBAC/ABAC permissions for medical record access, and GDPR-conscious consent management. Owned architecture, technology decisions, and core implementation across the stack.",
    tags: ["NestJS", "GraphQL", "React", "TypeScript", "WebRTC", "PostgreSQL"],
  },
  {
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
    title: "Platform & Delivery (Supporting Skill)",
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

export const contactChannels = [
  {
    label: "Email",
    value: "daniel.krejza@gmail.com",
    href: "mailto:daniel.krejza@gmail.com",
  },
  {
    label: "Messenger",
    value: "Daniel Krejza",
    href: "https://m.me/daniel.krejza.71",
  },
  {
    label: "GitHub",
    value: "Portfolio source repository",
    href: "https://github.com/deekeej/Portfolio",
  },
] as const;

export const footerContent = {
  signature: "Daniel Krejza",
  note:
    "Backend developer focused on shipping production-grade APIs and services, with the platform skills to own delivery end-to-end.",
};