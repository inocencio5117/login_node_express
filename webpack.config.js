const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./frontend/index",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public", "assets", "js")
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/env']
                  }
                }
              },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}
