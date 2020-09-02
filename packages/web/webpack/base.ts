import fs from "fs"
import dayjs from "dayjs"
import webpack from "webpack"
import TerserPlugin from "terser-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import HtmlWebPackPlugin from "html-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
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
]

const babelLoaderExclude = /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view)/

export const getWebpackRules = (): webpack.Rule[] => [
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
        ],
        plugins: [
          "react-hot-loader/babel",
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-transform-runtime",
          "@loadable/babel-plugin",
          "react-native-web",
        ],
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

export const getWebpackPlugins = (isWeb: boolean): webpack.Plugin[] =>
  (isWeb
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
        ? [new webpack.HotModuleReplacementPlugin()]
        : [new CompressionPlugin()]
    )
    .concat(isAnalyzer ? [new BundleAnalyzerPlugin()] : [])
    .concat([
      new LoadablePlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        FREE_STAMP: JSON.stringify(stamp),
        FREE_NODE_ENV: JSON.stringify(isDev ? "development" : "production"),
      }),
    ])

export const getDefaultConfig = (isWeb: boolean): webpack.Configuration => {
  return {
    optimization:
      isWeb && !isDev
        ? {
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
          }
        : undefined,
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-dom": isWeb && isDev ? "@hot-loader/react-dom" : "react-dom",
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
