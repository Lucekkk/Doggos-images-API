const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './js/app.js',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer:{
        open: true,
        compress: true,
        hot: true,
        static: {
          directory: path.resolve(__dirname, 'public')
        },
        port: 3000,
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader','css-loader','sass-loader',]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(
            {template: './index.html'}

        ),
        new webpack.HotModuleReplacementPlugin(),
    ]
};