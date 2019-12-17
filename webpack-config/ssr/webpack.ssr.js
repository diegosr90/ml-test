const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const config = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    server: path.resolve(__dirname, "./../../src/server/index.tsx")
  },
  output: {
    path: path.resolve(__dirname, "./../../dist-ssr"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      { test: /\.(scss)$/, loader: "ignore-loader" },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, "./../../.env")
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"]
  }
};

module.exports = config;
