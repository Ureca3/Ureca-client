import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' },
    },
  },
};

export default nextConfig;
