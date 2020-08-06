import { getDefaultConfig, getWebpackRules, getWebpackPlugins } from "./base"

const hot = !!process.env.WATCH_MODE

const webpackDevConfig = {
  ...getDefaultConfig(false),
  mode: "development",
  devtool: "eval",
  watch: hot,
  module: {
    rules: getWebpackRules(true),
  },
  plugins: getWebpackPlugins(true),
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 80,
    historyApiFallback: true,
    clientLogLevel: "error",
    contentBase: "./",
    hot: true,
    watchOptions: {
      ignored: ["node_modules"],
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
}

export default webpackDevConfig
