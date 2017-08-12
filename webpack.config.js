const path = require('path');
const Webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/app.js',
    './src/sass/app.scss'
  ],
  plugins: [
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      title: 'fiddler.js',
      template: './src/index.ejs'
    }),
    new Webpack.DefinePlugin({
      'process.env': {}
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      './src',
      './node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /((\w+)\.(eot|svg|ttf|woff|woff2))$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    ]
  }
};
