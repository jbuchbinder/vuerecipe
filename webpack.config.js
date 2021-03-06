var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AsyncAwaitPlugin = require("webpack-async-await");
var ManifestPlugin = require("webpack-manifest-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var PROD = process.env.NODE_ENV || "development";

module.exports = {
  entry: {
    application: [
      "./assets/js/application.js",
      "./assets/css/application.scss"
    ]
  },
  resolve: {
    alias: {
      vue$: `${__dirname}/node_modules/vue/dist/vue.esm.js`,
      router$: `${__dirname}/node_modules/vue-router/dist/vue-router.esm.js`
    }
  },
  output: {
    filename: "[name].[hash].js",
    path: `${__dirname}/public/assets`
  },
  plugins: [
    new ExtractTextPlugin("[name].[hash].css"),
    new AsyncAwaitPlugin({}),
    new CopyWebpackPlugin(
      [
        {
          from: "./assets",
          to: ""
        }
      ],
      {
        ignore: ["css/**", "js/**"]
      }
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ManifestPlugin({
      fileName: "manifest.json"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.vue/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {sourceMap: true}
            },
            {
              loader: "sass-loader",
              options: {sourceMap: true}
            }
          ]
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader"
      }
    ]
  }
};

if (PROD != "development") {
  module.exports.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          beautify: false,
          comments: false,
          ecma: 8
        }
      }
    })
  );
}
