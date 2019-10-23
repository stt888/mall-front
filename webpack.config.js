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
    result: ["./src/page/result/index.js"],
    vendors: ["jquery"]
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, "./src/util/"),
      page: path.resolve(__dirname, "./src/page/"),
      service: path.resolve(__dirname, "./src/service/"),
      image: path.resolve(__dirname, "./src/image/"),
      node_modules: path.resolve(__dirname, "./node_modules/")
    },
    extensions: [".js", ".jsx", ".vue", ".json", ".css"]
  },
  devServer: {
    contentBase: "./dist",
    port: 8080,
    // publicPath: "/dist",
    hot: true
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/view/index.ejs",
      chunks: ["common", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/view/login.ejs",
      chunks: ["common", "login"]
    }),
    new HtmlWebpackPlugin({
      filename: "result.html",
      template: "./src/view/result.ejs",
      chunks: ["common", "result"]
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-modules-commonjs"
            ]
          }
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
        test: /\.string$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader?limit=10000",
            options: {
              publicPath: "../image",
              outputPath: "images"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            // keep original file name
            name: "[name].[ext]",
            // output to dist/fonts/
            outputPath: "fonts"
          }
        }
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
          chunks: "all"
        }
      }
    }
  }
};
