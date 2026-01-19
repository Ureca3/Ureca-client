// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '*.config.{js,mjs,cjs,ts}',
      '*.mjs',
      '*.cjs',
      '**/svgr.d.ts',
      '**/.storybook/**',
      '**/.husky/**',
      '**/.github/**',
      '**/.vscode/**',
      '**/.git/**',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      react: reactPlugin,
      '@next/next': nextPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'prefer-arrow-callback': 'error',
      'import/no-default-export': 'error',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],

      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^next'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.(css|scss|sass)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',

      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  {
    files: [
      '**/app/**/page.{ts,tsx}',
      '**/app/**/layout.{ts,tsx}',
      '**/app/**/loading.{ts,tsx}',
      '**/app/**/error.{ts,tsx}',
      '**/app/**/not-found.{ts,tsx}',
      '**/app/**/template.{ts,tsx}',
      '**/app/**/route.{ts,tsx}',
    ],
    rules: {
      'import/no-default-export': 'off',
      'react/function-component-definition': 'off',
    },
  },
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  prettier,
);
