import { codecovNextJSWebpackPlugin } from "@codecov/nextjs-webpack-plugin";

export default {
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