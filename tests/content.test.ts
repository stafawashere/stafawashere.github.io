import { describe, expect, it } from "vitest";
import { HOURS_SCALE_MAX, weeklyHours } from "@/data/experience";
import { contacts } from "@/data/profile";
import { projectIndex } from "@/data/projects";
import { findings } from "@/data/security";
import { LAST_FRAME, rmseSeries } from "@/data/research";

describe("project index", () => {
   it("uses unique, sequential ids", () => {
      const ids = projectIndex.map((project) => project.id);
      const expected = ids.map((_, index) => `PRJ-${String(index + 1).padStart(2, "0")}`);

      expect(ids).toEqual(expected);
   });

   it("links every entry to a site path or an https url", () => {
      for (const project of projectIndex) {
         const isSitePath = project.url.startsWith("/");
         const isHttps = project.url.startsWith("https://");

         expect(isSitePath || isHttps, project.name).toBe(true);
      }
   });
});

describe("security findings", () => {
   it("lists six findings with unique ids", () => {
      const ids = new Set(findings.map((finding) => finding.id));

      expect(findings).toHaveLength(6);
      expect(ids.size).toBe(6);
   });
});

describe("weekly hours", () => {
   it("stays inside the chart scale", () => {
      for (const load of weeklyHours) {
         expect(load.hours).toBeGreaterThan(0);
         expect(load.hours).toBeLessThanOrEqual(HOURS_SCALE_MAX);
      }
   });
});

describe("rmse series", () => {
   it("runs from frame 0 to the last frame in order", () => {
      const frames = rmseSeries.map((sample) => sample.frame);
      const sorted = [...frames].sort((a, b) => a - b);

      expect(frames).toEqual(sorted);
      expect(frames[0]).toBe(0);
      expect(frames.at(-1)).toBe(LAST_FRAME);
   });

   it("peaks at frame 13 with 0.2766", () => {
      const peak = rmseSeries.reduce((best, sample) => (sample.rmse > best.rmse ? sample : best));

      expect(peak).toEqual({ frame: 13, rmse: 0.2766 });
   });
});

describe("contacts", () => {
   it("gives every contact a mailto or https link", () => {
      for (const contact of contacts) {
         const isMail = contact.href.startsWith("mailto:");
         const isHttps = contact.href.startsWith("https://");

         expect(isMail || isHttps, contact.label).toBe(true);
      }
   });
});
