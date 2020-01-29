const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "(none)",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
  // babel config (this still won't run AgentMarkdown in OSAscript)
  /*
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
  */
}
