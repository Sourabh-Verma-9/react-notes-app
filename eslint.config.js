import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,

      // React + Vite fixes
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // learning phase
      "no-console": "off"
    },

    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
