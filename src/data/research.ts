import frame00 from "@/assets/images/research/frame-00.webp";
import frame13 from "@/assets/images/research/frame-13.webp";
import frame39 from "@/assets/images/research/frame-39.webp";
import { projectById } from "./projects";
import type { RmseSample, Screenshot } from "./types";

const project = projectById("PRJ-01");
const repositoryName = "psychedelic-vision-study";
const sourceUrl = `https://github.com/stafawashere/${repositoryName}`;

export const study = {
   id: project.id,
   title: project.name,
   period: "Jun 2026–present",
   question:
      "Can a frozen Stable Diffusion model turn a forest-road photo into organized geometry, then recover the road?",
   method:
      "I gave Stable Diffusion 1.5 the same forest-road photo and caption at every frame. As a simulated dose rose, I reduced the weight of both inputs and increased denoising strength, gain in the first U-Net block, and feedback from the previous frame. I ran the same 40-frame schedule with three starting seeds.",
   sourceUrl,
   preprintUrl: `${sourceUrl}/blob/main/docs/paper/forest-road-preprint.pdf`,
};

export const outcomes = [
   {
      verdict: "Returned",
      text: "All three seeds passed both return tests. Mean pixel error was 0.0277 and mean fine-detail match was 0.846 against each seed’s first render.",
   },
   {
      verdict: "Repeated",
      text: "All three peaks developed repeating texture. The mean spectral bump was 1.80 versus 0.44 for the photo.",
   },
   {
      verdict: "Failed",
      text: "The peaks fell short of the geometry threshold, showed little symmetry, and lost motion when I held the settings steady.",
   },
] as const;

export const LAST_FRAME = 39;

export const rmseSeries: RmseSample[] = [
   { frame: 0, rmse: 0 },
   { frame: 5, rmse: 0.0485 },
   { frame: 13, rmse: 0.2766 },
   { frame: 39, rmse: 0.0241 },
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
   role: string;
   atPeak: string;
}

export interface Rule {
   index: string;
   text: string;
}

export type Verdict = "pass" | "miss";

export interface ExperimentCheck {
   check: string;
   verdict: Verdict;
   result: string;
   criterion: string;
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
   kind: "Independent student research",
   lede: "I translated ideas about sensory evidence, expectation, and feedback into controls on a frozen image model. At peak dose, the forest road dissolved into repeating patches. Across three seeds, its fine detail returned as the dose fell. The patches never showed the symmetry I was looking for.",
   description:
      "Mahfuj Mustafa tests whether brain-inspired changes to photo weight, caption guidance, gain, and feedback in Stable Diffusion 1.5 can produce organized geometry.",
   rmseCaption: "FIG. 2 · Pixel error (RMSE) against the first render at selected frames · seed 0",
};

export const researchMeta: MetaItem[] = [
   { label: "Model", value: "Stable Diffusion 1.5 (frozen)" },
   { label: "Input", value: "One 512 × 512 forest-road photo" },
   { label: "Main runs", value: "Three seeds · 40 frames each" },
   { label: "Source", value: repositoryName, href: study.sourceUrl },
];

export const figureFrames: FigureFrame[] = [
   {
      src: frame00,
      alt: "First render of a dirt road through a green forest.",
      figure: "FIG. 1a",
      caption: "Frame 00 · first render",
      frame: 0,
   },
   {
      src: frame13,
      alt: "Repeating dark patches obscure the forest road at peak dose.",
      figure: "FIG. 1b",
      caption: "Frame 13 · peak, 4 simulated min",
      frame: 13,
      peak: true,
   },
   {
      src: frame39,
      alt: "The dirt road and surrounding trees are visible again.",
      figure: "FIG. 1c",
      caption: "Frame 39 · return, 12 simulated min",
      frame: 39,
   },
];

export const tocEntries: TocEntry[] = [
   { id: "question", index: "§1", label: "Question" },
   { id: "knobs", index: "§2", label: "Model controls" },
   { id: "rules", index: "§3", label: "Experiment" },
   { id: "scoreboard", index: "§4", label: "Results" },
   { id: "finding", index: "§5", label: "Follow-up tests" },
   { id: "limits", index: "§6", label: "Limits" },
];

export const questionSection = {
   label: "§1 · Question",
   title: "How do you turn down an expectation in Stable Diffusion?",
   paragraphs: [
      "The words “dirt road” tell the model what to expect. The photograph tells it where the wheel tracks run and where the branches cross. Carhart-Harris and Friston’s REBUS hypothesis proposes that psychedelics can loosen the influence of high-level beliefs. I borrowed that idea by keeping the caption fixed and turning down its guidance scale. A separate control sets how much of the photograph reaches each frame.",
      "The harder question was where a pattern would come from. In Bressloff and colleagues’ model of visual cortex, connections between neighboring points help determine which shapes grow. In my experiment, gain simply amplifies features in one layer. Could the connections already in Stable Diffusion organize those features into a lattice or tunnel as the road faded? I tested that by measuring the spacing of the patches and checking whether they lined up under reflection or rotation.",
   ],
};

export const knobsSection = {
   label: "§2 · Model controls",
   title: "Five brain-inspired controls in the image model",
};

export const knobs: Knob[] = [
   {
      name: "scene_precision",
      inModel: "Weight of the encoded photo",
      role: "Confidence in sensory evidence",
      atPeak: "0.40, from 0.85",
   },
   {
      name: "prior_precision",
      inModel: "Caption guidance scale",
      role: "Confidence in a high-level expectation",
      atPeak: "6, from 12",
   },
   {
      name: "gain",
      inModel: "Multiplier on the block output, with soft clipping",
      role: "How strongly a layer responds",
      atPeak: "2.8, from 1",
   },
   {
      name: "depth",
      inModel: "U-Net block that receives gain",
      role: "Which level of the hierarchy is amplified",
      atPeak: "First down block throughout",
   },
   {
      name: "recurrence",
      inModel: "Weight of the previous render",
      role: "How much prior activity feeds back",
      atPeak: "0.12, from 0",
   },
];

export const rulesSection = {
   label: "§3 · Experiment",
   title: "One road, one caption, three starting seeds",
};

export const rules: Rule[] = [
   {
      index: "01",
      text: "I kept the model frozen and used the same caption throughout: “a view of a dirt road in the middle of a forest.”",
   },
   {
      index: "02",
      text: "Every frame received the same aligned photo. The main runs used no spatial warp or injected pattern, and the starting noise was held fixed within each seed.",
   },
   {
      index: "03",
      text: "Dose is a number that schedules the model settings. Four controls varied as it rose and fell over twelve simulated minutes. Depth stayed fixed at the first down block. Denoise strength also rose from 0.45 to 0.82, so the model started from more noise at the four-minute peak.",
   },
   {
      index: "04",
      text: "I set the thresholds in advance. For return, the final frame had to score at most 0.05 in pixel error and at least 0.8 in fine-detail match against its own first render.",
   },
];

export const scoreboardSection = {
   label: "§4 · Results",
   title: "Two of six checks passed",
};

export const scoreboard: ExperimentCheck[] = [
   {
      check: "Early detail",
      verdict: "miss",
      result: "Seed 0 dropped to 0.509 by frame 06.",
      criterion: "Fine-detail match above 0.6 through frame 11",
   },
   {
      check: "Repetition",
      verdict: "miss",
      result: "Mean peak spectral bump was 1.80. The photo scored 0.44.",
      criterion: "Spectral bump above 5",
   },
   {
      check: "Symmetry",
      verdict: "miss",
      result: "Mean mirror score was 0.101. Mean 60-degree rotation score was −0.024.",
      criterion: "Spatial order under reflection or rotation",
   },
   {
      check: "Peak motion",
      verdict: "miss",
      result: "Frame-to-frame change decayed at all three seeds during the hold.",
      criterion: "Sustained change with patterns that still line up",
   },
   {
      check: "Return",
      verdict: "pass",
      result: "All three seeds passed. Mean RMSE was 0.0277 and mean detail match was 0.846.",
      criterion: "RMSE of 0.05 or less and detail match of 0.8 or more",
   },
   {
      check: "Implementation",
      verdict: "pass",
      result: "The configuration and hook checks passed.",
      criterion: "Controls work as specified",
   },
];

export const findingSection = {
   label: "§5 · Follow-up tests",
   title: "What happened when I added structure or motion?",
   paragraphs: [
      "The peak spacing ranged from 20.5 to 46.5 pixels across seeds, and even a flat gray input produced repeating texture. A separate log-polar warp failed to increase the expected measures of radial order on either the flat field or the forest road.",
      "I injected a hexagonal lattice directly into the first U-Net block. It had a mirror score of 1.000 at injection and averaged 0.066 in the rendered images over eight seeds. Where the layout was lost remains open.",
      "Drifting the starting noise increased movement during a separate peak hold. Only two of three seeds sustained it. The tested full arc with drift missed both return thresholds, ending at 0.1498 pixel error and 0.028 fine-detail match.",
   ],
   stats: [
      { label: "Peak spectral bump", value: "1.80", comparison: "vs 0.44 for the photo" },
      {
         label: "Mirror score after lattice injection",
         value: "0.066",
         comparison: "vs 1.000 at injection",
      },
   ] satisfies Stat[],
};

export const limitsSection = {
   label: "§6 · Limits",
   statement: "The three-seed result comes from one photograph.",
   items: [
      "The aligned source photo was available at every frame. In the one jittered-input run, final fine-detail match dropped to 0.686.",
      "Several settings changed together, so the time course cannot isolate the effect of any one control.",
      "The measurements describe rendered images. The study collected no participant reports or neural recordings.",
      "I designed the question, controls, and thresholds. I used AI tools for coding, research assistance, and manuscript drafting.",
   ],
};

export const sideNotes: SideNote[] = [
   {
      label: "Return reference",
      text: "Frame 00 is already one pass through the model. Each seed’s final frame is compared with its own first render.",
   },
   {
      label: "Next tests",
      text: "Repeat the full arc on other photos and measure the injected lattice after successive blocks to locate where its layout breaks down.",
   },
];

export const nextProject = {
   kicker: "Next · Security research",
   title: "Allusion",
   href: "/#security",
};
