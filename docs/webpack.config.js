const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "dev";

const packageJSONRaw = fs.readFileSync(path.resolve(__dirname, "../package.json"));
const packageJSON = JSON.parse(packageJSONRaw);

module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    index: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "babel-loader", // transform es6 to es5
          },
          {
            loader: "linaria/loader", // extract css from js
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(eot|ttf|jpg|png|woff|woff2?)(\?.+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.tpl",
    }),
    new webpack.DefinePlugin({
      githubHomePage: JSON.stringify(packageJSON.homepage),
    }),
  ],
};
