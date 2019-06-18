const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "(none)",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
