import type { Role, School, SkillGroup, WeeklyLoad } from "./types";

export const roles: Role[] = [
   {
      title: "Programmer, Live Operations",
      org: "Merge Box · Roblox",
      period: "Feb 2024–Aug 2026",
      hoursPerWeek: 15,
      summary:
         "One of five developers on games with more than 78 million combined visits. I ran the weekly live update: debugging, patching exploits, adding gameplay mechanics and checking server performance.",
      highlight: true,
   },
   {
      title: "Freelance Programmer",
      org: "Self-employed",
      period: "2021–Aug 2026",
      hoursPerWeek: 6,
      summary:
         "REST APIs, custom Discord bots, marketplace tools and full Roblox games for more than 100 clients. I scoped each job and maintained it after launch.",
   },
];

export const linkNyc = {
   program: "NYC DOE Workplace Challenge · with LinkNYC",
   period: "Mar–Apr 2026",
   title: "Security Analyst",
   summary:
      "Six-week team project securing public Wi-Fi across 1,700+ kiosks. We ranked threats P0 to P3, built a five-layer defense, wrote incident-response playbooks and presented to an industry stakeholder.",
   frameworks: ["NIST · ISO 27001", "IEC 62443 · OWASP IoT"],
};

export const service: Role[] = [
   {
      title: "Associate Member, MUNA Manhattan Youth",
      org: "MUNA",
      period: "2022–present",
      hoursPerWeek: 4,
      summary:
         "Plan weekly youth gatherings with the chapter president, run monthly events and record donations. I mentor 20 younger members, and helped renovate the chapter’s first Manhattan masjid before its opening for 50+ people.",
   },
   {
      title: "Family responsibilities",
      org: "Home",
      period: "Ongoing",
      hoursPerWeek: 15,
      summary:
         "I handle English-language paperwork for a Bengali-speaking household (taxes, work filings, medical appointments, lease and bills) and care for a younger brother and grandmother.",
   },
];

export const HOURS_SCALE_MAX = 15;

export const weeklyHours: WeeklyLoad[] = [
   { label: "Merge Box live ops", when: "2024–26", hours: 15, tone: "work" },
   { label: "Family responsibilities", when: "ongoing", hours: 15, tone: "care" },
   { label: "Perception research", when: "2026–", hours: 10, tone: "work" },
   { label: "Allusion", when: "2025–26", hours: 10, tone: "work" },
   { label: "Freelance", when: "2021–26", hours: 6, tone: "work" },
   { label: "MUNA youth chapter", when: "2022–", hours: 4, tone: "care" },
];

export const schools: School[] = [
   {
      name: "High School of Arts and Technology",
      period: "Class of 2027",
      summary:
         "AP exams: Computer Science Principles 4, Precalculus 4, US History 4. Cumulative average 82.96 (weighted); junior spring 89.46, my strongest term.",
   },
   {
      name: "Borough of Manhattan Community College",
      period: "Sep 2025–May 2027 · FutureReady NYC dual enrollment",
      summary:
         "CSC 101, Principles of Information and Computer Science: grade 100. AP Computer Science A in progress.",
   },
];

export const skills: SkillGroup[] = [
   { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Lua (Roblox)", "SQL"] },
   {
      label: "Tools",
      items: [
         "PyTorch",
         "Stable Diffusion",
         "React",
         "Next.js",
         "Node.js",
         "Express",
         "Prisma",
         "PostgreSQL",
         "SQLite",
         "Socket.IO",
         "Tailwind CSS",
         "Git",
      ],
   },
   {
      label: "Areas",
      items: [
         "Reverse engineering",
         "game security and anti-cheat",
         "WebSocket and REST APIs",
         "computational experiments on perception",
      ],
   },
   { label: "Spoken", items: ["English", "Bengali (fluent)"] },
];
