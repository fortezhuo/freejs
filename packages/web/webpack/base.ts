import fs from "fs"
import { resolve } from "path"
import HtmlWebPackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import webpack from "webpack"

const isDev = process.env.NODE_ENV !== "production"

export const resolvePath = (path: string) => resolve(appDirectory, path)

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
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        plugins: [
          "react-hot-loader/babel",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
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
    test: /\.js$/,
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
          filename: "./index.html",
        }),
        new webpack.DefinePlugin({
          __NODE_ENV__: JSON.stringify(isDev ? "development" : "production"),
        }),
      ]
    : []
  )
    .concat(
      isDev
        ? [new webpack.HotModuleReplacementPlugin()]
        : [new CompressionPlugin()]
    )
    .concat([new LoadablePlugin(), new MiniCssExtractPlugin()])

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
          }
        : undefined,
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-dom": isWeb && isDev ? "@hot-loader/react-dom" : "react-dom",
      },
      extensions: [".web.js", ".js", ".tsx", ".ts", ".web.tsx", ".web.jsx"],
    },
    stats: {
      all: false,
      assets: true,
      errors: true,
      warnings: true,
    },
  }
}
