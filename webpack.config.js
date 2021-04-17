const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
        ]
    },
    output: {
        filename: 'main.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [{
            test: /\.css$/i,
            exclude: /styles\.css$/i,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /styles\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
                // attributes: false,
                sources: false,
                minimize: false,
            },
        }, {
            test: /\.(png|jpg|svg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),
    ]


}