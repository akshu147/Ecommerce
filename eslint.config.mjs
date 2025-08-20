import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // JS unused vars rule disable
      "no-unused-vars": "off",

      // TS unused vars rule fix
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // agar arg `_` se start ho to ignore
          varsIgnorePattern: "^_", // agar var `_` se start ho to ignore
        },
      ],
    },
  },
];

export default eslintConfig;
