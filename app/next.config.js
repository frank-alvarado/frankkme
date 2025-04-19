const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static HTML export with Next.js 15
  output: 'export',
  
  // Only include standard extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Exclude test directories from build output tracing
  outputFileTracingExcludes: {
    '*': ['**/__tests__/**/*']
  }
};

module.exports = withBundleAnalyzer(nextConfig);
