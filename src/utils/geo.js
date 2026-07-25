// Haversine formula : real great-circle distance between two lat/lng points, in km
export function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function scoreForDistance(km, maxDistance = 20000) {
  return Math.round(5000 * Math.max(0, 1 - km / maxDistance));
}

export function titleForScore(totalScore) {
  if (totalScore >= 22000) return "Geography Master";
  if (totalScore >= 17000) return "World Explorer";
  if (totalScore >= 12000) return "Frequent Flyer";
  if (totalScore >= 6000) return "Curious Traveler";
  return "Armchair Tourist";
}

export function getBoundingBox(countries) {
  const lats = countries.map((c) => c.latitude);
  const lngs = countries.map((c) => c.longitude);
  return { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLng: Math.min(...lngs), maxLng: Math.max(...lngs) };
}

export function paddedBounds(box, paddingFactor = 0.3) {
  const latPad = Math.max((box.maxLat - box.minLat) * paddingFactor, 5);
  const lngPad = Math.max((box.maxLng - box.minLng) * paddingFactor, 5);
  return [
    [Math.max(box.minLat - latPad, -90), Math.max(box.minLng - lngPad, -180)],
    [Math.min(box.maxLat + latPad, 90), Math.min(box.maxLng + lngPad, 180)],
  ];
}

