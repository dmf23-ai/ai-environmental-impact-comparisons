// atlasMeta — additive metadata for the homepage atlas. Keyed by the figures.json
// comparison `id` (plus a synthetic "hourly" entry built from hourly_impact).
// figures.json stays the read-only source of truth for numbers/sources/dates;
// this only adds presentation facets the atlas needs: plate order, metric/scope
// chips, boundary + confidence flags, an illustration key, and a one-line takeaway.
export type Metric = "water" | "electricity" | "co2" | "co2e";
export type Scope = "us" | "global" | "mixed";
export type Confidence = "higher" | "medium" | "lower";

export interface AtlasEntry {
  id: string;
  plate: number;          // plate number shown on the card
  featured?: boolean;     // rendered in the big featured panel instead of the grid
  metric: Metric;
  scope: Scope;
  boundarySensitive?: boolean;
  confidence: Confidence;
  illustration: string;   // PlateIllustration key
  takeaway: string;       // one concrete comparative sentence
}

// Order follows the plan's recommended atlas ordering (Section 9).
export const atlasOrder: AtlasEntry[] = [
  { id: "water-dc-vs-golf", plate: 1, featured: true, metric: "water", scope: "mixed", boundarySensitive: true, confidence: "medium", illustration: "golf",
    takeaway: "Count only cooling water and data centers are a tenth of golf; add the power plants and they nearly match it." },
  { id: "water-residential-outdoor", plate: 2, metric: "water", scope: "mixed", boundarySensitive: true, confidence: "medium", illustration: "sprinkler",
    takeaway: "American lawns drink 35 to 70 times what data centers use to cool themselves." },
  { id: "co2-driving-vs-datacenters", plate: 3, metric: "co2", scope: "mixed", confidence: "higher", illustration: "car",
    takeaway: "Every car, truck and bus in the U.S. out-emits the world's data centers about eightfold." },
  { id: "electricity-us-households-vs-datacenters", plate: 4, metric: "electricity", scope: "mixed", confidence: "higher", illustration: "house",
    takeaway: "U.S. homes use more than three times the electricity of every data center on Earth." },
  { id: "co2-aviation-vs-datacenters", plate: 5, metric: "co2", scope: "global", confidence: "higher", illustration: "plane",
    takeaway: "Global flights emit roughly five times what data centers do." },
  { id: "co2-cement-steel-vs-datacenters", plate: 6, metric: "co2", scope: "global", confidence: "higher", illustration: "factory",
    takeaway: "Making the world's cement and steel out-emits data centers more than twentyfold." },
  { id: "electricity-bitcoin-vs-datacenters", plate: 7, metric: "electricity", scope: "global", confidence: "medium", illustration: "bitcoin",
    takeaway: "Bitcoin mining draws a third to a half of the whole data-center fleet's power." },
  { id: "electricity-ev-charging-vs-datacenters", plate: 8, metric: "electricity", scope: "global", confidence: "higher", illustration: "ev",
    takeaway: "EV charging already pulls about 40% of global data-center electricity, and climbing fast." },
  { id: "electricity-video-streaming-vs-datacenters", plate: 9, metric: "electricity", scope: "global", confidence: "lower", illustration: "streaming",
    takeaway: "Streaming's annual electricity sits in the data-center range, but the estimate is shaky." },
  { id: "electricity-video-gaming-vs-datacenters", plate: 10, metric: "electricity", scope: "global", confidence: "lower", illustration: "controller",
    takeaway: "Global gaming may rival data centers, or sit at a quarter; the underlying data is weak." },
  { id: "co2-cattle-vs-datacenters", plate: 11, metric: "co2e", scope: "global", confidence: "medium", illustration: "cattle",
    takeaway: "The world's cattle out-emit data centers about twentyfold, mostly as methane." },
  { id: "electricity-ac-vs-datacenters", plate: 12, metric: "electricity", scope: "mixed", confidence: "higher", illustration: "ac",
    takeaway: "Cooling U.S. homes burns over half the world's data-center electricity each year." },
  { id: "co2-lawn-equipment-vs-datacenters", plate: 13, metric: "co2", scope: "mixed", confidence: "medium", illustration: "mower",
    takeaway: "U.S. gas mowers and blowers emit about a sixth of the global data-center total, in far dirtier air." },
  { id: "electricity-holiday-lights-vs-datacenters", plate: 14, metric: "electricity", scope: "mixed", confidence: "lower", illustration: "lights",
    takeaway: "A month of U.S. holiday lights is about 1.4% of the year-round data-center fleet." },
  { id: "hourly", plate: 15, metric: "co2", scope: "mixed", confidence: "medium", illustration: "clock",
    takeaway: "An hour of driving emits hundreds to thousands of times an hour of AI chat." },
];

export const metricLabel: Record<Metric, string> = {
  water: "Water", electricity: "Electricity", co2: "CO₂", co2e: "CO₂e",
};
export const scopeLabel: Record<Scope, string> = {
  us: "U.S.", global: "Global", mixed: "U.S. + Global",
};
export const confidenceLabel: Record<Confidence, string> = {
  higher: "Higher confidence", medium: "Medium confidence", lower: "Higher uncertainty",
};

// metric -> subject color bucket used by existing components (water/electricity/carbon)
export function subjectForMetric(m: Metric): "water" | "electricity" | "carbon" {
  if (m === "water") return "water";
  if (m === "electricity") return "electricity";
  return "carbon"; // co2 + co2e
}

export const byId: Record<string, AtlasEntry> = Object.fromEntries(
  atlasOrder.map((e) => [e.id, e])
);
