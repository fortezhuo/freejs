import {
  getDefaultConfig,
  getWebpackRules,
  getWebpackPlugins,
  resolvePath,
} from "./base"
import { configProxy } from "@free/env"

const webpackDevConfig = {
  ...getDefaultConfig(true),
  mode: "development",
  devtool: "source-map",
  watch: true,
  entry: resolvePath("src"),
  output: {
    publicPath: `/`,
  },
  module: {
    rules: getWebpackRules(),
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
    proxy: {
      "/api": {
        target: configProxy,
        secure: false,
        changeOrigin: true,
      },
    },
  },
}

export default webpackDevConfig
