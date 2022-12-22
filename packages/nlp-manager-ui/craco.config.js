const interpolateHtml = require("craco-interpolate-html-plugin");
const config = require("config");
const webpack = require("webpack");

module.exports = {
  plugins: [
    {
      plugin: interpolateHtml,
      // Enter the variable to be interpolated in the html file
      options: {
        API_HOST: config.API_HOST,
        API_PORT: config.API_PORT,
        env: config.util.getEnv("NODE_CONFIG_ENV"),
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env }) => {
      // https://github.com/lorenwest/node-config/wiki/Webpack-Usage
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) })
      );
      webpackConfig.stats = "verbose";
      // Always return the config object.
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // allows hot-update.json to be loaded across different domains
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    return devServerConfig;
  },
};
