import type { ImageMetadata } from "astro";

export interface Strand {
   code: string;
   label: string;
   title: string;
   summary: string;
   href: string;
}

export interface EvidenceFigure {
   id: string;
   source: string;
   value: string;
   claim: string;
}

export interface Finding {
   id: string;
   title: string;
   clientControl: string;
   serverFix: string;
}

export interface Screenshot {
   src: ImageMetadata;
   alt: string;
}

export interface Project {
   id: string;
   name: string;
   kind: string;
   tech: string;
   date: string;
   url: string;
}

export interface Role {
   title: string;
   org: string;
   period: string;
   hoursPerWeek?: number;
   summary: string;
   highlight?: boolean;
}

export interface WeeklyLoad {
   label: string;
   when: string;
   hours: number;
   tone: "work" | "care";
}

export interface School {
   name: string;
   period: string;
   summary: string;
}

export interface SkillGroup {
   label: string;
   items: string[];
}

export interface Contact {
   label: string;
   value: string;
   href: string;
}

export interface RmseSample {
   frame: number;
   rmse: number;
}
