import { expect, test } from "vitest";
import { compressGeohashes, getCombinations } from "../src";

test("Test compression", () => {
  expect(
    compressGeohashes(
      ["ezjmgg", ...getCombinations("ezjmu"), "ezjmgu", "ezjmv"],
      1,
    ),
  ).toStrictEqual(["ezjmgg", "ezjmu", "ezjmgu", "ezjmv"]);
});
