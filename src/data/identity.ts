export interface Swatch {
   name: string;
   token: string;
   hex: string;
   role: string;
   contrast: string;
}

export interface TypeSpecimen {
   family: string;
   job: string;
   sample: string;
   style: "display" | "serif" | "mono";
}

export interface MarkGround {
   name: string;
   token: string;
   dark?: boolean;
}

export type GlyphKind =
   | "primary-trace"
   | "secondary-bus"
   | "subsurface-route"
   | "pad-and-via"
   | "connector-edge"
   | "chamfered-aperture"
   | "registration"
   | "signal";

export type TileSurface = "substrate" | "graphite" | "brushed-graphite" | "ceramic";

export interface CircuitTerm {
   kind: GlyphKind;
   name: string;
   note: string;
   surface: TileSurface;
}

export interface Material {
   name: string;
   token: string;
   texture: "grain" | "brushed";
   outlined?: boolean;
}

export const identityPage = {
   kicker: "Human / Material / System",
   title: "Lunar Lavender identity system",
   revision: "REV.01 · Nov 2026",
   description:
      "The Lunar Lavender identity system: palette and contrast, type, the MM mark, the circuit vocabulary and the materials behind mahfujmustafa.dev.",
};

export const sectionLabels = {
   palette: "01 · Pigments and roles · contrast measured on Lunar Ceramic",
   type: "02 · Type · three families, one job each",
   mark: "03 · MM mark · the official icon",
   circuit: "04 · Circuit vocabulary · 8 px pitch, 45° bends",
   materials: "05 · Materials and the Human Layer",
};

export const swatches: Swatch[] = [
   {
      name: "Lunar Ceramic",
      token: "--ceramic",
      hex: "#F0EDF5",
      role: "Canvas, 50–60% of the page",
      contrast: "Ground",
   },
   {
      name: "Lavender Substrate",
      token: "--substrate",
      hex: "#DED9EB",
      role: "Secondary bands: evidence, service",
      contrast: "Ground",
   },
   {
      name: "Amethyst Graphite",
      token: "--graphite",
      hex: "#30283E",
      role: "Text; feature regions",
      contrast: "12.1 : 1",
   },
   {
      name: "Graphite Ink",
      token: "--ink",
      hex: "#4F4663",
      role: "Body copy",
      contrast: "7.6 : 1",
   },
   {
      name: "Muted Ink",
      token: "--ink-muted",
      hex: "#5C5373",
      role: "Silkscreen metadata",
      contrast: "6.2 : 1",
   },
   {
      name: "Violet Link",
      token: "--violet-link",
      hex: "#5E49A6",
      role: "Links, focus ring",
      contrast: "6.1 : 1",
   },
   {
      name: "Violet Signal",
      token: "--violet-signal",
      hex: "#7862BD",
      role: "Signal traces, vias; never text",
      contrast: "4.2 : 1 · graphics",
   },
   {
      name: "Lilac Titanium",
      token: "--titanium",
      hex: "#C1B9D7",
      role: "Contacts, connector edges",
      contrast: "Decor · 7.5 : 1 on graphite",
   },
];

export const typeSpecimens: TypeSpecimen[] = [
   { family: "Inter Tight 600", job: "display + body", sample: "Mahfuj Mustafa", style: "display" },
   {
      family: "Instrument Serif",
      job: "research voice",
      sample: "The boundary is dimensional, not empirical.",
      style: "serif",
   },
   {
      family: "Geist Mono 400",
      job: "silkscreen",
      sample: "FIG. 01b · RMSE 0.274 · F13 · ~15 hrs/week",
      style: "mono",
   },
];

export const typeNote =
   "Silkscreen only carries real data: figure numbers, dates, hours from the résumé, measured values. No invented serials or telemetry.";

export const markGrounds: MarkGround[] = [
   { name: "Ceramic", token: "--ceramic" },
   { name: "Substrate", token: "--substrate" },
   { name: "Graphite", token: "--graphite", dark: true },
];

export const markSizes: number[] = [24, 40, 64];

export const markRationale =
   "One continuous trace draws both strokes of the M and ends in two via rings, so it reads as MM at tab size and as a routed circuit up close. It is translucent glass in Violet Signal, which keeps it legible on ceramic, substrate and graphite alike.";

export const circuitTerms: CircuitTerm[] = [
   {
      kind: "primary-trace",
      name: "Primary trace",
      note: "1.5 px · connects real relationships",
      surface: "substrate",
   },
   {
      kind: "secondary-bus",
      name: "Secondary bus",
      note: "0.9 px · 8 px pitch",
      surface: "substrate",
   },
   {
      kind: "subsurface-route",
      name: "Subsurface route",
      note: "6–7 px · inside graphite only",
      surface: "graphite",
   },
   {
      kind: "pad-and-via",
      name: "Pad and via",
      note: "8 px pad · 3–4 px via ends a trace",
      surface: "substrate",
   },
   {
      kind: "connector-edge",
      name: "Connector edge",
      note: "Contact links, evidence band top",
      surface: "brushed-graphite",
   },
   {
      kind: "chamfered-aperture",
      name: "Chamfered aperture",
      note: "Portrait substrate, feature panels",
      surface: "substrate",
   },
   {
      kind: "registration",
      name: "Registration",
      note: "Frames real images only",
      surface: "ceramic",
   },
   {
      kind: "signal",
      name: "Signal",
      note: "Hover only · 380 ms · off with reduced motion",
      surface: "substrate",
   },
];

export const materials: Material[] = [
   { name: "Ceramic", token: "--ceramic", texture: "grain", outlined: true },
   { name: "Soldermask", token: "--substrate", texture: "grain" },
   { name: "Graphite", token: "--graphite", texture: "grain" },
   { name: "Titanium", token: "--titanium", texture: "brushed" },
];

export const portraitLayers: string[] = [
   "L1 · Ceramic canvas, fine grain",
   "L2 · Global routing into the portrait",
   "L3 · Graphite substrate, chamfered, notched",
   "L4 · Cutout · hair breaks the substrate edge",
   "L5 · Titanium contacts in front of the blazer only",
];

export const portraitNote = "Face kept clear. Skin untinted; contrast +3%, saturation −3%.";
