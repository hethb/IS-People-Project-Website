/**
 * Map defaults for the Student Roost CMU / Pittsburgh demo.
 * CMU “Cut” approximate center (Forbes & Morewood area).
 */
export const CMU_CENTER = { lat: 40.4429, lng: -79.9422 } as const;

/** Soft restriction so panning stays around Oakland / Shadyside / Squirrel Hill (not strict). */
export const PITTSBURGH_AREA_BOUNDS = {
  north: 40.52,
  south: 40.39,
  west: -80.05,
  east: -79.86,
} as const;

export const DEFAULT_MAP_ZOOM = 14;
