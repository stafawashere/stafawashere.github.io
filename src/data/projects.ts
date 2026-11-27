import type { Project } from "./types";

export const RESEARCH_PATH = "/research/psychedelic-model";

export const projectIndex: Project[] = [
   {
      id: "PRJ-01",
      name: "Psychedelic Model",
      kind: "ML research",
      tech: "Python · PyTorch · Stable Diffusion",
      date: "Jun 2026–",
      url: RESEARCH_PATH,
   },
   {
      id: "PRJ-02",
      name: "Allusion",
      kind: "Security research",
      tech: "Lua",
      date: "Jul 25–Mar 26",
      url: "https://github.com/stafawashere/Allusion",
   },
   {
      id: "PRJ-03",
      name: "Disky",
      kind: "Discord library",
      tech: "Python · WebSockets",
      date: "May 2024–",
      url: "https://github.com/stafawashere/Disky",
   },
   {
      id: "PRJ-04",
      name: "Distribution Network",
      kind: "Full-stack app",
      tech: "Next.js · TypeScript · Prisma · PostgreSQL",
      date: "Mar 2026",
      url: "https://github.com/stafawashere/dms",
   },
   {
      id: "PRJ-05",
      name: "Trashy Apocalypse",
      kind: "Game · team lead",
      tech: "Python · Arcade",
      date: "May 2026",
      url: "https://github.com/stafawashere/trashy-apocalypse",
   },
   {
      id: "PRJ-06",
      name: "Spicetify Extensions",
      kind: "Client mods",
      tech: "JavaScript · Bash",
      date: "Oct 2026",
      url: "https://github.com/stafawashere/spicetify-release",
   },
   {
      id: "PRJ-07",
      name: "Inspect Workflow",
      kind: "Developer tool",
      tech: "Python · HTML",
      date: "Jul 2026",
      url: "https://github.com/stafawashere/inspectworkflow",
   },
   {
      id: "PRJ-08",
      name: "webapp-re",
      kind: "Claude Code plugin",
      tech: "Python",
      date: "Oct 2026",
      url: "https://github.com/stafawashere/webapp-re",
   },
   {
      id: "PRJ-09",
      name: "Sujood",
      kind: "Reference site",
      tech: "JavaScript · HTML",
      date: "Aug 2026",
      url: "https://sujood.online",
   },
   {
      id: "PRJ-10",
      name: "Taskbench",
      kind: "VS Code extension",
      tech: "JavaScript",
      date: "Jul 2026",
      url: "https://github.com/stafawashere/taskbench-extension",
   },
   {
      id: "PRJ-11",
      name: "Ledger",
      kind: "Discord bot",
      tech: "Python",
      date: "Feb 2026",
      url: "https://github.com/stafawashere/ledger",
   },
   {
      id: "PRJ-12",
      name: "mahfujmustafa.dev",
      kind: "This site",
      tech: "Astro · TypeScript",
      date: "Jun 2026",
      url: "https://github.com/stafawashere/stafawashere.github.io",
   },
];

export function projectById(id: string): Project {
   const match = projectIndex.find((project) => project.id === id);

   if (!match) {
      throw new Error(`Unknown project id ${id}`);
   }

   return match;
}
