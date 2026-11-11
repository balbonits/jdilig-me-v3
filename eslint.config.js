import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'dist-ssr', 'test-results', 'playwright-report', 'public/ux/design-system/storybook', 'public/ux/job-tracker'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Internal links go through @/components/ui/Link so page changes run
      // as View Transitions (docs/MOTION-SPEC.md).
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-router',
              importNames: ['Link', 'NavLink'],
              message: "Import Link/NavLink from '@/components/ui/Link' instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/ui/Link.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    // Node scripts and config files.
    extends: [js.configs.recommended],
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
);
