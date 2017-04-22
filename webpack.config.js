'use strict';
const path = require('path');
const webpack = require('webpack');

const plugins = 
    process.env.NODE_ENV === 'production' ?
    [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
    ] :
    [];

module.exports={
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    entry: './dist-es6/entrypoint.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'components.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
        ]
    },
    plugins,
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    externals: {
        fs: {},
    },
    performance: {
        //bye bye, FIXME...
        hints: false,
    },
    
    devServer: {
        contentBase: './dist',
        port: 8080,
    },
    watchOptions: {
        ignore: /node_modules/,
    },
};
