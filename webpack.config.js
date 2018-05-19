const path = require("path");
const fs = require("fs");

const {
  HotModuleReplacementPlugin,
  ContextReplacementPlugin
} = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const DotenvPlugin = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const lessToJs = require("less-vars-to-js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "./src/styles/themes/default.less"),
    "utf8"
  )
);

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  target: "web",
  output: {
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: "[local]--[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: []
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              modifyVars: themeVariables
            }
          }
        ]
      },
      {
        test(filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
        },
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: []
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              modifyVars: themeVariables
            }
          }
        ]
      }
    ]
  },
  devServer: {
    publicPath: "/",
    historyApiFallback: {
      index: "/"
    },
    port: 3000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": "http://localhost:3001"
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { "@": path.resolve(__dirname, "src") }
  },
  optimization: {
    runtimeChunk: true,
    occurrenceOrder: true,
    noEmitOnErrors: true,
    concatenateModules: false,
    namedModules: true,
    splitChunks: { chunks: "all" }
  },
  plugins: [
    new CleanPlugin(["dist"]),
    new HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new DotenvPlugin({
      systemvars: true
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /de|en/),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ]
};
