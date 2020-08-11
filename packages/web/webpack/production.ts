import nodeExternals from "webpack-node-externals"
import {
  getDefaultConfig,
  getWebpackRules,
  getWebpackPlugins,
  resolvePath,
} from "./base"
import webpack from "webpack"
import dayjs from "dayjs"

const distClient = resolvePath("../../build/static/web")
const distServer = resolvePath("../../build/static/node")
const entryServer = resolvePath("src/index.node.tsx")
const stamp = dayjs().format("YYMMDDHHmm")

const isAnalyzer = process.env.ANALYZER === "true"
const webpackProdClient = {
  ...getDefaultConfig(true),
  target: "web",
  name: "web",
  mode: "production",
  devtool: "source-map",
  output: {
    path: distClient,
    filename: `web.${stamp}.js`,
    publicPath: `/static/web/`,
  },
  module: {
    rules: getWebpackRules(),
  },
  plugins: getWebpackPlugins(true),
}

const webpackProdServer: webpack.Configuration = {
  ...getDefaultConfig(false),
  target: "node",
  name: "node",
  mode: "production",
  devtool: "source-map",
  entry: entryServer,
  externals: [
    "@loadable/component",
    nodeExternals(),
    {
      react: "commonjs react",
    },
  ],
  output: {
    path: distServer,
    filename: `node.${stamp}.js`,
    publicPath: `/static/node/`,
    libraryTarget: "commonjs2",
  },
  module: {
    rules: getWebpackRules(),
  },
  plugins: getWebpackPlugins(false),
}

export default isAnalyzer
  ? webpackProdClient
  : [webpackProdClient, webpackProdServer]
