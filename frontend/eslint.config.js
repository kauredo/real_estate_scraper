// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import i18next from "eslint-plugin-i18next";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "public",
      "scripts",
      "vite.config.js",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      i18next,
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "import/no-relative-parent-imports": "off",
      "react-refresh/only-export-components": "warn",
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='button']",
          message:
            "Use a custom Button component instead of the native <button> element.",
        },
        {
          selector: "JSXOpeningElement[name.name='input']",
          message:
            "Use a custom Input component instead of the native <input> element.",
        },
        {
          selector: "JSXOpeningElement[name.name='select']",
          message:
            "Use a custom Select component instead of the native <select> element.",
        },
        {
          selector: "JSXOpeningElement[name.name='textarea']",
          message:
            "Use a custom Textarea component instead of the native <textarea> element.",
        },
        {
          selector: "JSXOpeningElement[name.name='svg']",
          message:
            "Don't use inline <svg> elements. Create a component for it.",
        },
      ],
      "i18next/no-literal-string": [
        "error",
        {
          ignoreAttribute: ["data-testid", "role"],
          ignore: [
            "^\\s*$", // Whitespace only
            "^[\\s•→×\\-/]+$", // Punctuation only (bullet, arrow, times, dash, slash)
            "^●$", // Bullet point
            "^→$", // Arrow
            "^—$", // Em dash
            "^-$", // Dash
            "^/$", // Slash
            "^\\($", // Parenthesis
            "^\\)$", // Parenthesis
            "^\\[$", // Brackets
            "^\\]$", // Brackets
            "^%$", // Percent sign alone
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/ui/*.tsx"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
);
