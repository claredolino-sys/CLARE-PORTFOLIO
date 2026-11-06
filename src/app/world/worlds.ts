// Butterfly Nebula Worlds: one world per portfolio section.
// Keep in sync with DESIGN.md (colour tokens table).

export const SECTION_KEYS = [
  "01 // Overture",
  "02 // Backstage",
  "03 // Approach",
  "04 // Tracklist",
  "05 // Encore",
  "06 // Insights",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export interface WorldDef {
  key: SectionKey;
  index: number;
  name: string;
  tagline: string;
  a: string;
  b: string;
  c: string;
  bg: string;
  /** Free-flying butterflies in this world (desktop). */
  flock: number;
  /** How hard the nebula swirls (0 calm, 1 stormy). */
  swirl: number;
}

export const WORLDS: Record<SectionKey, WorldDef> = {
  "01 // Overture": {
    key: "01 // Overture",
    index: 1,
    name: "Morpho Dawn",
    tagline: "Where the signal starts",
    a: "#00F2FE",
    b: "#7F00FF",
    c: "#FF5FD2",
    bg: "#06080F",
    flock: 9,
    swirl: 0.55,
  },
  "02 // Backstage": {
    key: "02 // Backstage",
    index: 2,
    name: "Emerald Birdwing",
    tagline: "Origins, skills and cadence",
    a: "#2EE6A6",
    b: "#F6D365",
    c: "#0EA5A4",
    bg: "#050D0C",
    flock: 11,
    swirl: 0.4,
  },
  "03 // Approach": {
    key: "03 // Approach",
    index: 3,
    name: "Solar Monarch",
    tagline: "Six steps, one flight path",
    a: "#FFB454",
    b: "#FF5D8F",
    c: "#FF8A5B",
    bg: "#0F0907",
    flock: 8,
    swirl: 0.7,
  },
  "04 // Tracklist": {
    key: "04 // Tracklist",
    index: 4,
    name: "Orchid Aurora",
    tagline: "One butterfly per project",
    a: "#E879F9",
    b: "#7C5CFF",
    c: "#38BDF8",
    bg: "#09060F",
    flock: 5,
    swirl: 0.6,
  },
  "05 // Encore": {
    key: "05 // Encore",
    index: 5,
    name: "Opal Moth",
    tagline: "Send a signal back",
    a: "#BFE3FF",
    b: "#C4B5FD",
    c: "#FBCFE8",
    bg: "#070A12",
    flock: 10,
    swirl: 0.35,
  },
  "06 // Insights": {
    key: "06 // Insights",
    index: 6,
    name: "Midnight Glasswing",
    tagline: "Notes from the deep field",
    a: "#6EA8FF",
    b: "#4338CA",
    c: "#A5F3FC",
    bg: "#04050E",
    flock: 7,
    swirl: 0.3,
  },
};

/** Fixed wing palettes: every project owns one butterfly. */
export const PROJECT_PALETTES: Record<number, [string, string, string]> = {
  1: ["#2EE6C5", "#F6D365", "#7C3AED"],
  2: ["#38BDF8", "#A78BFA", "#F472B6"],
  3: ["#F59E0B", "#F43F5E", "#8B5CF6"],
  4: ["#34D399", "#22D3EE", "#E879F9"],
};

export const LIGHT_BG = "#F5F3FF";

export function hexToRgbString(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
