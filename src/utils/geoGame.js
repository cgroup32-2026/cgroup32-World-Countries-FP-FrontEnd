export const INITIAL_TIME_SECONDS = 30;
export const MAX_BANK_SECONDS = 60;
const MIN_RADIUS_KM = 50; // floor so tiny countries (Vatican, Monaco) stay playable

export function getEffectiveRadius(areaKm2) {
  if (!areaKm2 || areaKm2 <= 0) return MIN_RADIUS_KM;
  return Math.max(MIN_RADIUS_KM, Math.sqrt(areaKm2 / Math.PI));
}

const TIERS = [
  { name: "Perfect", maxMultiplier: 0.3, comboGrowth: 0.25 },
  { name: "Amazing", maxMultiplier: 1.0, comboGrowth: 0.10 },
  { name: "Very Good", maxMultiplier: 2.5, comboGrowth: 0.04 },
  { name: "Good", maxMultiplier: 5.0, comboGrowth: 0 },
  { name: "Miss", maxMultiplier: Infinity, comboGrowth: 0 },
];

export function getTier(distanceKm, effectiveRadius) {
  const ratio = distanceKm / effectiveRadius;
  return TIERS.find((t) => ratio <= t.maxMultiplier) ?? TIERS[TIERS.length - 1];
}

export function baseScoreForTier(distanceKm, effectiveRadius) {
  const ratio = distanceKm / effectiveRadius;
  return Math.round(5000 * Math.exp(-0.8 * ratio));
}

export function updateCombo(currentMultiplier, tierName) {
  if (tierName === "Miss") return 1.0;
  if (tierName === "Good") return currentMultiplier;
  const tier = TIERS.find((t) => t.name === tierName);
  return Math.min(2.0, currentMultiplier + tier.comboGrowth);
}

export function timeBonusForTier(tierName, roundNumber, totalRounds) {
  const base = { Perfect: 8, Amazing: 5, "Very Good": 3, Good: 1, Miss: 0 }[tierName] ?? 0;
  const decay = Math.max(0.3, 1 - ((roundNumber - 1) / totalRounds) * 0.7);
  return Math.round(base * decay);
}

export function deriveRoundCount(poolSize) {
  return Math.min(20, Math.max(5, Math.round(poolSize / 3)));
}

export function regionToModeCode(mode, region) {
  const regionSlug = region === "All Regions" ? "world" : region.toLowerCase().replace(/\s+/g, "-");
  return `${mode}-${regionSlug}`;
}

export const TIER_COLORS = {
  Perfect: "text-amber-300",
  Amazing: "text-green-400",
  "Very Good": "text-sky-400",
  Good: "text-gray-400",
  Miss: "text-red-400",
};