import { describe, expect, it } from "vitest";
import { percentOf, plotSeries, toPathData } from "@/lib/chart";

describe("plotSeries", () => {
   it("maps the largest sample to the top-right corner of the box", () => {
      const points = plotSeries(
         [
            { x: 0, y: 0 },
            { x: 39, y: 0.274 },
         ],
         { width: 700, baseline: 84, top: 10 },
      );

      expect(points).toEqual([
         { x: 0, y: 84 },
         { x: 700, y: 10 },
      ]);
   });

   it("returns nothing for an empty series", () => {
      expect(plotSeries([], { width: 10, baseline: 10, top: 0 })).toEqual([]);
   });
});

describe("toPathData", () => {
   it("starts with a move and continues with lines", () => {
      expect(
         toPathData([
            { x: 0, y: 1 },
            { x: 2, y: 3 },
         ]),
      ).toBe("M0 1 L2 3");
   });
});

describe("percentOf", () => {
   it("clamps to the scale", () => {
      expect(percentOf(20, 15)).toBe("100%");
      expect(percentOf(6, 15)).toBe("40%");
   });
});
