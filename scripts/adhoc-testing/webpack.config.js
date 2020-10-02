/* eslint-env node */
const path = require("path")

module.exports = {
  entry: "./index.ts",
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname)
  },
  mode: "development",
  devtool: "(none)",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    safari: "13"
                  },
                  useBuiltIns: "usage",
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
