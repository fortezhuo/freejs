import {
  getDefaultConfig,
  getWebpackRules,
  getWebpackPlugins,
  resolvePath,
} from "./base"

const entryClient = ["react-hot-loader/patch", resolvePath("src")]

const webpackDevConfig = {
  ...getDefaultConfig(true),
  mode: "development",
  devtool: "source-map",
  watch: true,
  entry: entryClient,
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
  },
}

export default webpackDevConfig
