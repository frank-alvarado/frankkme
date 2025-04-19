const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static HTML export with Next 15
  output: 'export',
  
  // Exclude test files from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Properly exclude test directories from the build
  experimental: {
    outputFileTracingExcludes: {
      '*': ['**/__tests__/**/*']
    }
  }
};

module.exports = withBundleAnalyzer(nextConfig);
