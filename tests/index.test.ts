import { expect, test } from "vitest";
import { compressGeohashes, getCombinations } from "../src";

test("compresses all 32 children into their parent when precision allows", () => {
  const children = getCombinations("ezjmu");

  expect(compressGeohashes(children, 1)).toStrictEqual(["ezjmu"]);
  // Minimum precision equal to the parent's length is allowed.
  expect(compressGeohashes(children, 5)).toStrictEqual(["ezjmu"]);
});

test("leaves an incomplete group untouched", () => {
  const children = getCombinations("ezjmu");
  const incomplete = [...children.slice(0, 31), "ezjmv"];

  expect(compressGeohashes(incomplete, 1)).toStrictEqual(incomplete);
});

test("minimum precision prevents compressing below the given level", () => {
  const children = getCombinations("ezjmu");

  // Parent has length 5, so a minimum of 6 forbids the compression.
  expect(compressGeohashes(children, 6)).toStrictEqual(children);
});

test("handles empty input and non-compressible cases without looping", () => {
  expect(compressGeohashes([], 1)).toStrictEqual([]);
  expect(compressGeohashes(["ezjmgg"], 1)).toStrictEqual(["ezjmgg"]);
});

test("cascades compression across several levels", () => {
  const grandchildren = getCombinations("ezjmu").flatMap((child) =>
    getCombinations(child),
  );

  expect(compressGeohashes(grandchildren, 1)).toStrictEqual(["ezjmu"]);
});

test("Test compression", () => {
  expect(
    compressGeohashes(
      ["ezjmgg", ...getCombinations("ezjmu"), "ezjmgu", "ezjmv"],
      1,
    ),
  ).toStrictEqual(["ezjmgg", "ezjmu", "ezjmgu", "ezjmv"]);
});
