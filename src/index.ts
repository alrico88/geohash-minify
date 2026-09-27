import { base32 } from "./helpers/base32";

/**
 * Gets the possible children of a given parent geohash
 *
 * @export
 * @param {string} geohash Parent geohash
 * @return {string} Possible children
 */
export function getCombinations(geohash: string): string[] {
  return base32.map((char) => geohash + char);
}

/**
 * Compresses an array of geohashes
 *
 * @export
 * @param {string[]} input The list of geohashes
 * @param {number} minLevel Minimum precision to compress to
 * @return {string[]} The compressed list
 */
export function compressGeohashes(input: string[], minLevel: number): string[] {
  let geohashes = new Set(input);

  if (geohashes.size < base32.length) {
    return Array.from(geohashes);
  }

  let changed = true;

  while (changed) {
    changed = false;

    // Count siblings per parent; a group is complete only with all 32.
    const siblingCounts = new Map<string, number>();

    for (const geohash of geohashes) {
      const parent = geohash.slice(0, -1);

      // Only compress when the parent stays at or above the minimum precision.
      if (parent.length < Math.max(minLevel, 1)) {
        continue;
      }

      siblingCounts.set(parent, (siblingCounts.get(parent) ?? 0) + 1);
    }

    const next = new Set<string>();

    for (const geohash of geohashes) {
      const parent = geohash.slice(0, -1);

      if (siblingCounts.get(parent) === base32.length) {
        // Insert the parent once, where its first sibling was, keeping order stable.
        if (!next.has(parent)) {
          next.add(parent);
          changed = true;
        }
      } else {
        next.add(geohash);
      }
    }

    geohashes = next;
  }

  return Array.from(geohashes);
}
