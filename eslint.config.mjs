// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts}"] },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   tseslint.configs.recommended,

// ]);

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    globals: globals.browser,
    sourceType: 'commonjs',
  },
  plugins: { js },
  extends: ['js/recommended', ...tseslint.configs.recommended],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },

  ignores: ['node_modules/', 'dist/', 'coverage/', '.env'],
});
