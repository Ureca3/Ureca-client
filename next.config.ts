import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';
import path from 'path';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) => {
      if (!(rule && typeof rule === 'object' && 'test' in rule)) {
        return false;
      }
      const { test } = rule;
      return test instanceof RegExp ? test.test('.svg') : false;
    });

    if (fileLoaderRule) {
      config.module.rules.push(
        // *.svg?url 로 import하면 기존 규칙(이미지 경로)을 따름
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
          type: 'asset/resource',
        },

        // 나머지 → SVGR 컴포넌트로 처리
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
          use: ['@svgr/webpack'],
        },
      );

      // 기존 규칙에서 SVG를 제외
      fileLoaderRule.exclude = /\.svg$/i;
    } else {
      // 기존 규칙을 못 찾았다면 SVGR만 강제로 추가
      config.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      });
    }
    return config;
  },
};

export default nextConfig;
