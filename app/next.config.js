const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  outputFileTracingExcludes: { '*': ['**/__tests__/**/*'] },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'frankkme',
  project: 'frankk-me',
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
  },
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
