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
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // 콜백 화살표 함수
      'prefer-arrow-callback': 'error',

      // default export 금지
      'import/no-default-export': 'error',

      // 컴포넌트 화살표 함수
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],

      // unused imports
      'unused-imports/no-unused-imports': 'error',

      // unused vars: _ 허용
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // type import
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      // import 정렬
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
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Next app router 엔트리 파일 예외
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

  // Prettier 충돌 방지
  prettier,
);
