const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const { codecovNextJSWebpackPlugin } = require('@codecov/nextjs-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  outputFileTracingExcludes: { '*': ['**/__tests__/**/*'] },
  webpack: (config, options) => {
    config.plugins.push(
      codecovNextJSWebpackPlugin({
        enableBundleAnalysis: true,
        bundleName: 'frankkme-nextjs-webpack-bundle',
        uploadToken: process.env.CODECOV_TOKEN,
        webpack: options.webpack,
      }),
    );
    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'frankkme',
  project: 'javascript-nextjs',
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
};

module.exports = withBundleAnalyzer(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions)
);
