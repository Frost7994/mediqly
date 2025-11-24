import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import checkFile from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    plugins: {
      "check-file": checkFile,
      boundaries: boundaries,
    },

    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            // "src/config/**/*",
            "src/constants/**/*",
            "src/data/**/*",
            "src/env/**/*",
            "src/features/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            // "src/stores/**/*",
            "src/styles/**/*",
            "src/types/**/*",
            "src/utils/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*"],
        },
      ],
    },

    rules: {
      "prefer-arrow-callback": ["error"],
      semi: ["error"],
      "prefer-template": ["error"],
      quotes: ["error", "double"],

      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx,js,jsx}": "KEBAB_CASE",
        },
      ],

      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/": "KEBAB_CASE",

          ignore: ["src/app/(application)", "src/app/(public)"],
        },
      ],

      "boundaries/no-unknown": ["error"],

      "boundaries/no-unknown-files": ["error"],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared"],
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                [
                  "feature",
                  {
                    featureName: "${from.featureName}",
                  },
                ],
              ],
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],
              allow: [
                [
                  "app",
                  {
                    fileName: "*.css",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
