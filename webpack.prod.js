const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [htmlPlugin,
    new webpack.DefinePlugin({
      'process.env': {
         'EDAMAM_API_KEY': JSON.stringify(process.env.EDAMAM_API_KEY),
         'APP_ID': JSON.stringify(process.env.APP_ID)
      }
    })
  ]
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};