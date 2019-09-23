const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: ["./src/page/index/index.js"],
    login: ["./src/page/login/index.js"],
    common: ["./src/page/common/index.js"],
    view: ["./src/view/index.js"],
    vendors: ['jquery']
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true,
    overlay: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/page/index/index.html",
      chunks: ["common", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/page/login/index.html",
      chunks: ["common", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "view.html",
      template: "./src/view/index.ejs",
      chunks: ["common", "index"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.ejs/,
        use: ["ejs-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "../images",
              outputPath: "images",
              
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
          filename: "js/base.js"
        },
        vendors: {
          test: /jquery/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  }
};
