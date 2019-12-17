const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, "./../../src/browser/index.tsx")
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./../../.env")
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./../../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
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
  resolve: {
    extensions: [
      ".tsx", ".ts", ".js", ".scss"
    ]
  }
};
