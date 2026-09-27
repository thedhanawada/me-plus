import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// .astro files are type-checked by `astro check`; ESLint covers the TypeScript.
export default tseslint.config(
  { ignores: ['dist', '.astro', '.vercel'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
  }
);
