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

  const deleteGh = new Set<string>();
  const finalGeohashes = new Set<string>();
  let flag = true;
  let finalGeohashesSize = 0;

  // If input size less than 32
  if (geohashes.size < base32.length) {
    return input;
  }

  while (flag) {
    finalGeohashes.clear();
    deleteGh.clear();

    for (const geohash of geohashes) {
      const geohashLength = geohash.length;

      if (geohashLength >= minLevel) {
        const part = geohash.slice(0, -1);

        if (!deleteGh.has(part) && !deleteGh.has(geohash)) {
          const combinations = getCombinations(part);

          // eslint-disable-next-line @typescript-eslint/no-loop-func
          if (combinations.every((value) => geohashes.has(value))) {
            finalGeohashes.add(part);

            deleteGh.add(part);
          } else {
            deleteGh.add(geohash);

            finalGeohashes.add(geohash);
          }

          if (finalGeohashesSize === finalGeohashes.size) {
            flag = false;
          }
        }
      }
    }

    finalGeohashesSize = finalGeohashes.size;
    geohashes.clear();

    geohashes = new Set([...geohashes, ...finalGeohashes]);
  }

  return Array.from(geohashes);
}
