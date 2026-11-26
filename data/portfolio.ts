// Placeholder content — swap these values for your real portfolio data.
// This is the single source of truth consumed by every section component.

export const profile = {
  name: "Jakxc",
  role: "Software Developer",
  tagline: "“Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.” \n- Master Oogway",
  about:
    "I am a software engineer who loves seeing my code come to fruition in the form of a finished WORKING product. This passion for coding stems from my love for gaming which has been a part of my life since I was a child. I have been in the software development industry for many years now and have experience in both frontend and backend development. I am always looking to learn new technologies and improve my skills.",
  email: "jack.x.chen@outlook.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/jakxc/",
    linkedin: "https://www.linkedin.com/in/jack-x-chen/",
  },
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Firebase"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Figma", "AI Tools (Claude)"],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repoHref?: string;
  emoji: string;
};

export const projects: Project[] = [
  {
    id: "forest-dashboard",
    title: "Forest Dashboard",
    description:
      "A calming analytics dashboard with soft data visualisations and ambient theming, built to make numbers feel a little less sterile.",
    tags: ["Next.js", "TypeScript", "D3"],
    href: "#",
    repoHref: "#",
    emoji: "🌲",
  },
  {
    id: "spirited-chat",
    title: "Spirited Chat",
    description:
      "A real-time messaging app with a playful, character-driven UI and offline-first sync for unreliable connections.",
    tags: ["React", "Firebase", "WebSockets"],
    href: "#",
    repoHref: "#",
    emoji: "👻",
  },
  {
    id: "wind-rises-portfolio",
    title: "The Wind Rises — Portfolio v1",
    description:
      "My original portfolio, built with React and Firebase — the predecessor to this very site.",
    tags: ["React", "Firebase", "Bootstrap"],
    href: "https://jakxc-portfolio-v2.netlify.app/",
    repoHref: "#",
    emoji: "🍃",
  },
  {
    id: "totoro-tracker",
    title: "Totoro Tracker",
    description:
      "A gentle habit-tracking app themed around growing a tiny garden — plant a seed for every habit you keep.",
    tags: ["React Native", "SQLite"],
    href: "#",
    repoHref: "#",
    emoji: "🌱",
  },
];

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "role-1",
    role: "Software Engineer",
    company: "Current Company",
    period: "2023 — Present",
    description:
      "Building and maintaining full-stack features across the product, with a focus on performance and developer experience.",
    highlights: [
      "Led migration of legacy views to a modern component architecture",
      "Improved page load times by optimising rendering and data fetching",
      "Mentored junior engineers through code review and pairing",
    ],
  },
  {
    id: "role-2",
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Owned key customer-facing features from design handoff through to production.",
    highlights: [
      "Shipped a redesigned onboarding flow that improved activation",
      "Built a reusable component library adopted across three teams",
      "Introduced automated accessibility testing into CI",
    ],
  },
];
