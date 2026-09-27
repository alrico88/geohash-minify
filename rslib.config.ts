import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      dts: { bundle: true },
    },
    {
      format: "cjs",
      dts: { bundle: true },
    },
  ],
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  output: {
    cleanDistPath: true,
    minify: true,
    sourceMap: true,
  },
});
