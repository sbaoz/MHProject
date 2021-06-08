const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');

const devConfig = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../app/renderer/app.tsx')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    target: 'electron-renderer',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        host: '127.0.0.1',
        port: 6001,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            }
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../app/renderer/index.html'),
            filename: path.resolve(__dirname, '../dist/index.html'),
            chunks: ['index']
        })
    ]
}

module.exports = merge(baseConfig, devConfig);
