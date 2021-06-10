const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@assets': path.join(__dirname, '../', 'assets'),
            '@src': path.join(__dirname, '../', 'app/renderer'),
            '@common': path.join(__dirname, '../', 'app/renderer/common')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
