const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      js: path.resolve(__dirname, "src/js"),
      styles: path.resolve(__dirname, "src/styles"),
      fonts: path.resolve(__dirname, "src/fonts"),
      media: path.resolve(__dirname, "src/media"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Odin Weather",
      template: "./src/template.html",
    }),
    new DotEnv()
  ],
};
