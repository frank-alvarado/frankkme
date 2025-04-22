import { withSentryConfig } from "@sentry/nextjs";
import { codecovNextJSWebpackPlugin } from "@codecov/nextjs-webpack-plugin";

const moduleExports = {
  webpack: (config, options) => {
    config.plugins.push(
      codecovNextJSWebpackPlugin({
        enableBundleAnalysis: true,
        bundleName: "frankkme-nextjs-webpack-bundle",
        uploadToken: process.env.CODECOV_TOKEN,
        webpack: options.webpack,
      }),
    );

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: "frankkme",
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);

// Injected content via Sentry wizard below
