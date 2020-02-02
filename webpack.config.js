const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "(none)",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  // babel config trying to run AgentMarkdown in OSAscript but somehow I can't get it to work (but it works in safari at https://agentmarkdown.now.sh)
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
