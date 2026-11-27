export interface PlotBox {
   width: number;
   baseline: number;
   top: number;
}

export interface PlottedPoint {
   x: number;
   y: number;
}

export interface SeriesSample {
   x: number;
   y: number;
}

export function plotSeries(samples: SeriesSample[], box: PlotBox): PlottedPoint[] {
   const hasSamples = samples.length > 0;

   if (!hasSamples) {
      return [];
   }

   const maxX = Math.max(...samples.map((sample) => sample.x));
   const maxY = Math.max(...samples.map((sample) => sample.y));
   const xScale = maxX === 0 ? 0 : box.width / maxX;
   const yScale = maxY === 0 ? 0 : (box.baseline - box.top) / maxY;

   return samples.map((sample) => ({
      x: round(sample.x * xScale),
      y: round(box.baseline - sample.y * yScale),
   }));
}

export function toPathData(points: PlottedPoint[]): string {
   return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}

export function percentOf(value: number, max: number): string {
   const clamped = Math.min(Math.max(value, 0), max);

   return `${Math.round((clamped / max) * 100)}%`;
}

function round(value: number): number {
   return Math.round(value * 10) / 10;
}
