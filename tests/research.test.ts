import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { materials, swatches } from "@/data/identity";
import { figureFrames, rmseSeries } from "@/data/research";

// Vitest returns CSS imports empty, so the token file is read from disk.
const tokensUrl = new URL("../src/styles/tokens.css", import.meta.url);
const tokensCss = readFileSync(tokensUrl, "utf8");

function tokenValue(token: string): string | undefined {
   const match = tokensCss.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`));

   return match?.[1]?.toLowerCase();
}

describe("research figure frames", () => {
   it("only caption frames that have a measured rmse", () => {
      const measuredFrames = new Set(rmseSeries.map((sample) => sample.frame));

      for (const frame of figureFrames) {
         expect(measuredFrames.has(frame.frame), frame.figure).toBe(true);
      }
   });

   it("marks the frame where the series peaks", () => {
      const peak = rmseSeries.reduce((best, sample) => (sample.rmse > best.rmse ? sample : best));
      const peakFrames = figureFrames.filter((frame) => frame.peak).map((frame) => frame.frame);

      expect(peakFrames).toEqual([peak.frame]);
   });
});

describe("identity sheet", () => {
   it("prints the same hex as the token each swatch paints with", () => {
      for (const swatch of swatches) {
         expect(tokenValue(swatch.token), swatch.name).toBe(swatch.hex.toLowerCase());
      }
   });

   it("paints materials with tokens that exist", () => {
      for (const material of materials) {
         expect(tokenValue(material.token), material.name).toBeDefined();
      }
   });
});
