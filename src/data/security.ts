import type { Finding } from "./types";

export const allusion = {
   period: "Jul 2025–Mar 2026",
   hoursPerWeek: 10,
   headline: "The server let the client tell it what happened.",
   context: "Client-side research on Rivals, a competitive Roblox shooter.",
   writeupUrl: "https://github.com/stafawashere/Allusion",
   disclosure:
      "All six reported to the Rivals developers and patched before the research went public",
};

export const findings: Finding[] = [
   {
      id: "F.01",
      title: "Anti-cheat reachable from the client",
      clientControl:
         "Its report functions sat in the garbage collector, so a modified client could intercept its own reports.",
      serverFix:
         "Treat client anti-cheat as a speed bump; the checks that matter run on the server.",
   },
   {
      id: "F.02",
      title: "Hit detection trusted a client raycast",
      clientControl: "Redirecting one shared function landed shots the camera wasn’t aimed at.",
      serverFix: "Recompute hits on the server from its own positions, with a lag allowance.",
   },
   {
      id: "F.03",
      title: "Wall check worked around",
      clientControl:
         "Shifting the shot origin on the y-axis got past the shoot-through-walls check.",
      serverFix: "Derive the line of fire on the server and run the wall check there.",
   },
   {
      id: "F.04",
      title: "Body rotation set by the client",
      clientControl: "The client decided which way its character faced, without tripping flags.",
      serverFix: "Cap how fast and how far rotation can change between updates.",
   },
   {
      id: "F.05",
      title: "Firing input automatable",
      clientControl: "Nothing told a real trigger pull from a scripted one.",
      serverFix: "Flag reaction times and shot intervals that are too consistent.",
   },
   {
      id: "F.06",
      title: "Every client knew where everyone was",
      clientControl: "Positions and health reached all clients, even behind walls.",
      serverFix: "Interest management: only send what the player can see.",
   },
];
