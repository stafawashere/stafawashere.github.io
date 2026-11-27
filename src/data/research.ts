import frame00 from "@/assets/images/research/frame-00.webp";
import frame13 from "@/assets/images/research/frame-13.webp";
import frame39 from "@/assets/images/research/frame-39.webp";
import type { RmseSample, Screenshot } from "./types";

export const study = {
   id: "PRJ-01",
   title: "Driving Stable Diffusion with brain variables",
   period: "Jun 2026–present",
   hoursPerWeek: 10,
   question:
      "Does the sequence reported in DMT research (geometry, then forms, then figures) emerge when the only things I move are knobs mapped to the brain?",
   method:
      "Knobs from sensory precision to cortical gain ride one dose curve. Nothing is hand-drawn, the prompt never asks for anything psychedelic, and every metric and pass/fail threshold was fixed before the first run. I’m writing it up as a paper with a public DOI, failures included.",
   sourceUrl: "https://github.com/stafawashere/psychedelic-model-research",
};

export const outcomes = [
   {
      verdict: "Held",
      text: "The timing of the arc. The image left the photo and came back: RMSE 0.274 at the peak, 0.025 by frame 39.",
   },
   {
      verdict: "Emerged",
      text: "Periodic patterns with no geometry in the prompt: 3.0× a natural image’s spectrum, vs 1.6× at baseline.",
   },
   {
      verdict: "Failed",
      text: "Symmetry stayed near zero, so no form constants. The come-up blurred, and figures never appeared.",
   },
] as const;

export const keyFrames: (Screenshot & { caption: string; peak?: boolean })[] = [
   {
      src: frame00,
      alt: "Frame 0: the original photo, a dirt road through a green forest.",
      caption: "Frame 00 · scene",
   },
   {
      src: frame13,
      alt: "Frame 13, the dose peak: the forest has dissolved into a repeating mottled texture.",
      caption: "Frame 13 · dose peak",
      peak: true,
   },
   {
      src: frame39,
      alt: "Frame 39: the forest road has returned.",
      caption: "Frame 39 · return",
   },
];

export const LAST_FRAME = 39;

export const rmseSeries: RmseSample[] = [
   { frame: 0, rmse: 0 },
   { frame: 4, rmse: 0.043 },
   { frame: 7, rmse: 0.079 },
   { frame: 11, rmse: 0.189 },
   { frame: 13, rmse: 0.274 },
   { frame: 16, rmse: 0.22 },
   { frame: 20, rmse: 0.126 },
   { frame: 24, rmse: 0.076 },
   { frame: 30, rmse: 0.028 },
   { frame: 39, rmse: 0.025 },
];

export interface FigureFrame extends Screenshot {
   figure: string;
   caption: string;
   frame: number;
   peak?: boolean;
}

export interface MetaItem {
   label: string;
   value: string;
   href?: string;
}

export interface TocEntry {
   id: string;
   index: string;
   label: string;
}

export interface Knob {
   name: string;
   inModel: string;
   brainVariable: string;
   atPeak: string;
}

export interface Rule {
   index: string;
   text: string;
}

export type Verdict = "yes" | "partial" | "no";

export interface PhaseScore {
   phase: string;
   verdict: Verdict;
   produced: string;
   missing: string;
}

export interface Stat {
   label: string;
   value: string;
   comparison: string;
}

export interface SideNote {
   label: string;
   text: string;
}

export const researchPage = {
   kind: "Independent research",
   lede: "The run reproduced the timing of the DMT arc, and none of the content of its phases.",
   description:
      "An independent study driving Stable Diffusion 1.5 with knobs mapped to brain variables, to test whether the reported order of DMT visuals emerges on its own.",
   rmseCaption:
      "FIG. 2 · RMSE of each frame against frame 00 · fast rise over 13 frames, slower tail over 26 · measured, conclusion.md §2",
   peakLabel: "PEAK 0.274 · D = 1.0",
};

export const researchMeta: MetaItem[] = [
   { label: "Model", value: "Stable Diffusion 1.5" },
   { label: "Stack", value: "Python · PyTorch · BLIP" },
   { label: "Status", value: "Paper with public DOI in progress" },
   { label: "Source", value: "psychedelic-model-research", href: study.sourceUrl },
];

export const figureFrames: FigureFrame[] = [
   {
      src: frame00,
      alt: "Frame 0: a dirt road through a green forest.",
      figure: "FIG. 1a",
      caption: "Frame 00 · scene",
      frame: 0,
   },
   {
      src: frame13,
      alt: "Frame 13 at the dose peak: the scene has dissolved into a repeating mottled texture.",
      figure: "FIG. 1b",
      caption: "Frame 13 · peak, t = 4 min",
      frame: 13,
      peak: true,
   },
   {
      src: frame39,
      alt: "Frame 39: the forest road has returned.",
      figure: "FIG. 1c",
      caption: "Frame 39 · return",
      frame: 39,
   },
];

export const tocEntries: TocEntry[] = [
   { id: "question", index: "§1", label: "Question" },
   { id: "knobs", index: "§2", label: "Five knobs" },
   { id: "rules", index: "§3", label: "Rules" },
   { id: "scoreboard", index: "§4", label: "Scoreboard" },
   { id: "finding", index: "§5", label: "Finding" },
   { id: "limits", index: "§6", label: "Limits" },
];

export const questionSection = {
   label: "§1 · Question",
   title: "Does the order fall out on its own?",
   paragraphs: [
      "DMT research describes the visuals in a fairly consistent order: geometry, then forms, then figures, then a return to the room. I wanted to know whether that order falls out of an image model when the only things I touch are parameters that map to known brain variables.",
      "Two ideas set it up. REBUS (Carhart-Harris and Friston) says psychedelics relax the precision of high-level priors. And DMT acts on the 5-HT2A receptor, raising the gain of cortical cells. A latent diffusion model has the same parts loosely: a prior (the caption), sensory evidence (the encoded photo) and a stack of levels (the U-Net).",
   ],
};

export const knobsSection = {
   label: "§2 · The five knobs",
   title: "One dose curve, five brain variables.",
};

export const knobs: Knob[] = [
   {
      name: "scene_precision",
      inModel: "Weight of the encoded photo, with a floor above zero",
      brainVariable: "Precision of sensory evidence",
      atPeak: "falls to floor",
   },
   {
      name: "prior_precision",
      inModel: "Guidance scale on the caption",
      brainVariable: "Precision of high-level priors",
      atPeak: "falls",
   },
   {
      name: "gain",
      inModel: "Multiplies one U-Net block, tanh soft-clipped",
      brainVariable: "5-HT2A cortical gain",
      atPeak: "rises",
   },
   {
      name: "depth",
      inModel: "Which U-Net block gets the gain",
      brainVariable: "Which cortical level destabilizes",
      atPeak: "moves deeper",
   },
   {
      name: "recurrence",
      inModel: "Weight of the previous frame",
      brainVariable: "The loop feeding on itself",
      atPeak: "rises, then falls",
   },
];

export const rulesSection = {
   label: "§3 · Rules, fixed in advance",
   title: "If you prompt for the result, you’ve proven nothing.",
};

export const rules: Rule[] = [
   {
      index: "01",
      text: "Nothing is hand-drawn. No geometry is painted in, so any pattern has to come out of the model.",
   },
   {
      index: "02",
      text: "The prompt is a neutral caption written by BLIP, with 78 words like fractal and spiral filtered out.",
   },
   {
      index: "03",
      text: "Sensory precision never hits zero, so the photo always has a way back.",
   },
   {
      index: "04",
      text: "Measurements and thresholds are written down before the runs they judge.",
   },
   {
      index: "05",
      text: "A result is a computational signature. Never a claim about experience.",
   },
];

export const scoreboardSection = {
   label: "§4 · Scoreboard",
   title: "Phase by phase.",
};

export const scoreboard: PhaseScore[] = [
   {
      phase: "Come-up",
      verdict: "partial",
      produced: "Monotone, graded onset",
      missing: "Detail-preserving shimmer; got defocus",
   },
   {
      phase: "Geometry",
      verdict: "no",
      produced: "Elevated periodicity only",
      missing: "Wavelength selection, symmetry, radial organisation",
   },
   {
      phase: "Breakthrough",
      verdict: "partial",
      produced: "Total loss of the real scene",
      missing: "A self-consistent space with its own motion",
   },
   {
      phase: "Entities",
      verdict: "no",
      produced: "Nothing",
      missing: "Closed by the architecture, not the evidence",
   },
   {
      phase: "Return",
      verdict: "yes",
      produced: "Exact return to the source scene",
      missing: "Nothing, but guaranteed by construction",
   },
];

export const findingSection = {
   label: "§5 · What it established",
   title: "The boundary is dimensional, not empirical.",
   paragraphs: [
      "Every knob is a scalar, and every phase the run produced is one whose brain mechanism is also essentially scalar: a global change in gain, a reweighting of precision. Every phase it failed depends on something spatial, like an interaction kernel with a length constant, or on a model of another agent. A scalar can push a system across a bifurcation. It can’t pick which pattern lies on the other side.",
   ],
   stats: [
      { label: "Excess periodic power at 19 px", value: "3.0×", comparison: "vs 1.6× photo" },
      {
         label: "Mirror / rotational symmetry at peak",
         value: "≈ 0",
         comparison: "vs 0.98–0.99 controls",
      },
   ] satisfies Stat[],
};

export const limitsSection = {
   label: "§6 · Limits",
   statement:
      "A computational signature, never a claim about experience. The model isn’t “tripping.”",
   items: [
      "The headline numbers come from one run, on one photo, with one seed.",
      "The return is guaranteed by construction: the photo is re-encoded every frame.",
      "The missing figures say nothing about DMT; the setup strips figure words from the only route to them.",
      "I used agentic AI tools for assisted coding and research. The question, the design and the thresholds were mine.",
   ],
};

export const sideNotes: SideNote[] = [
   {
      label: "Read this as",
      text: "An independent student study, documented with its failures. Not yet peer reviewed.",
   },
   {
      label: "Builds on",
      text: "REBUS; the entropic brain hypothesis; Klüver’s form constants; Ermentrout & Cowan 1979; Bressloff et al. 2001.",
   },
   {
      label: "Next",
      text: "A gain-only come-up with denoise held flat; jittered input to test the return; a difference-of-Gaussians lateral kernel. Each with its pass/fail line set first.",
   },
];

export const nextProject = {
   kicker: "Next · Security research",
   title: "Allusion",
   href: "/#security",
};
