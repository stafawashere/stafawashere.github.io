import type { Contact, EvidenceFigure, Strand } from "./types";

export const profile = {
   name: "Mahfuj Mustafa",
   firstName: "Mahfuj",
   lastName: "Mustafa",
   location: "New York, NY",
   school: "HS of Arts and Technology, class of 2027",
   dualEnrollment: "BMCC dual enrollment",
   tagline:
      "High school researcher and developer. I take systems apart to see how they work, in game security, real-time APIs and computational experiments on perception.",
   description:
      "Mahfuj Mustafa is a New York high school researcher and developer working on game security, real-time APIs and computational experiments on perception.",
   resumePath: "/resume.pdf",
   motto: "reverse it · ship it · break it · fix it",
};

export const strands: Strand[] = [
   {
      code: "R",
      label: "Research",
      title: "Brain-inspired controls in Stable Diffusion",
      summary: "One forest road, three seeds, 40 frames per run",
      href: "#research",
   },
   {
      code: "S",
      label: "Security",
      title: "Allusion · LinkNYC",
      summary: "Six exploits found, reported, patched",
      href: "#security",
   },
   {
      code: "B",
      label: "Build",
      title: "Merge Box · Disky · dev tools",
      summary: "Live games, libraries, full-stack apps",
      href: "#projects",
   },
];

export const evidence: EvidenceFigure[] = [
   {
      id: "E.01",
      source: "Merge Box",
      value: "78M+",
      claim: "combined visits on the Roblox games I worked on as one of five developers.",
   },
   {
      id: "E.02",
      source: "Freelance",
      value: "100+",
      claim: "clients since 2021: APIs, Discord bots, marketplace tools and full games, maintained after launch.",
   },
   {
      id: "E.03",
      source: "Allusion",
      value: "6 / 6",
      claim: "exploits in Rivals reported with a server-side fix, and patched before I published.",
   },
   {
      id: "E.04",
      source: "LinkNYC",
      value: "1,700+",
      claim: "public Wi-Fi kiosks in scope for our six-week team security project.",
   },
];

export const contacts: Contact[] = [
   {
      label: "Email",
      value: "contact@mahfujmustafa.dev",
      href: "mailto:contact@mahfujmustafa.dev",
   },
   { label: "GitHub", value: "github.com/stafawashere", href: "https://github.com/stafawashere" },
   {
      label: "LinkedIn",
      value: "in/mahfujm527",
      href: "https://www.linkedin.com/in/mahfujm527/",
   },
   {
      label: "ORCID",
      value: "0009-0002-1782-2580",
      href: "https://orcid.org/0009-0002-1782-2580",
   },
];
