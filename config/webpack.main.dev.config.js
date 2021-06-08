const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const mainConfig = {
    entry: path.resolve(__dirname, '../app/main/electron.ts'),
    target: 'electron-main',
    output: {
        filename: 'electron.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ]
}

module.exports = merge(baseConfig, mainConfig);
