import type { StorybookConfig } from '@storybook/nextjs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    if (config.module?.rules) {
      config.module.rules = config.module.rules.map((rule) => {
        if (typeof rule === 'object' && rule && 'test' in rule && rule.test instanceof RegExp) {
          const testStr = rule.test.toString();
          if (testStr.includes('svg')) return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      });
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            // 필요하면 옵션
          },
        },
      ],
    });

    return config;
  },
};

export default config;
