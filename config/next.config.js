const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static HTML export with Next 15
  output: 'export',
};

module.exports = withBundleAnalyzer(nextConfig);
