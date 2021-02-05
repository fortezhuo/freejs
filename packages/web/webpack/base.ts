import fs from "fs"
import dayjs from "dayjs"
import webpack from "webpack"
import TerserPlugin from "terser-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import HtmlWebPackPlugin from "html-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { resolve } from "path"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

export const stamp = dayjs().format("YYMMDDHHmm")
export const resolvePath = (path: string) => resolve(appDirectory, path)

const isDev = process.env.NODE_ENV !== "production"
const isAnalyzer = process.env.ANALYZER === "true"
const appDirectory = fs.realpathSync(process.cwd())
const babelLoaderInclude = [
  resolvePath("src"),
  resolvePath("../core"),
  resolvePath("../tailwind"),
  resolvePath("../icon"),
]

const babelLoaderExclude = /node_modules[/\\](?!react-native-safe-area-view|react-native-gesture-handler)/

export const getWebpackRules = (): any => [
  {
    test: /\.(tsx|ts)$/,
    include: babelLoaderInclude,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        configFile: false,
        presets: [
          ["@babel/preset-env", { modules: false }],
          "@babel/preset-react",
          "@babel/preset-typescript",
          "@babel/preset-flow",
        ],
        plugins: [
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-transform-runtime",
          "@loadable/babel-plugin",
          "react-native-web",
        ].concat(isDev ? ["react-refresh/babel"] : []),
      },
    },
  },
  {
    test: /\.(jsx|js)$/,
    exclude: babelLoaderExclude,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        configFile: false,
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
          "@babel/preset-flow",
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-object-rest-spread",
        ],
      },
    },
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: "html-loader",
      },
    ],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      "css-loader",
    ],
  },

  {
    test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: false,
          name: `[name].[ext]`,
        },
      },
    ],
  },
]

export const getWebpackPlugins = (isWeb: boolean): any =>
  [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDev),
      FREE_STAMP: JSON.stringify(stamp),
      FREE_NODE_ENV: JSON.stringify(isDev ? "development" : "production"),
    }),
  ]
    .concat(
      isWeb
        ? [
            new HtmlWebPackPlugin({
              template: "src/assets/index.html",
              favicon: "./src/assets/favicon.ico",
              filename: "./index.html",
            }),
          ]
        : []
    )
    .concat(
      isDev
        ? [
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
          ]
        : [new CompressionPlugin()]
    )
    .concat(isAnalyzer ? [new BundleAnalyzerPlugin()] : [])

export const getDefaultConfig = (isWeb: boolean): any => {
  return {
    optimization:
      isWeb && !isDev
        ? ({
            minimize: true,
            minimizer: [
              new TerserPlugin({
                terserOptions: {
                  output: {
                    comments: false,
                  },
                },
              }),
            ],
            splitChunks: {
              minSize: 10000,
              maxSize: 250000,
            },
          } as any)
        : undefined,
    resolve: {
      alias: {
        "react-native": "react-native-web",
      },
      extensions: [
        ".web.js",
        ".web.jsx",
        ".web.tsx",
        ".web.ts",
        ".js",
        ".jsx",
        ".tsx",
        ".ts",
      ],
    },
    stats: {
      all: false,
      assets: true,
      errors: true,
      warnings: true,
    },
  }
}
