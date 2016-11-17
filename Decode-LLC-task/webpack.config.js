'use strict';
const NODE_ENV = /*process.env.NODE_ENV || */ 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    context      : path.join(__dirname, '/app'),
    entry        : NODE_ENV === 'development' ? path.normalize('./dev-todo.js') : path.normalize('./todo.js'),
    resolve      : {
        extensions: [
            '',
            '.js',
            '.jsx',
            '.css'
        ],
        root : [
            path.join(__dirname, '/app'),
            path.join(__dirname, '/app/styl')
        ]
    },
    // watch        : true,
    watchOptions : {
        aggrigateTimeout : 300
    },
    output       : {
        filename : path.normalize('./app/build.js'),
        library : 'todo'
    },
    devtool      : 'source-map-inline',
    module       : {
        loaders  : [{
            test   : /\.js$/,
            loader : 'babel-loader',
            query: {
                // presets: ['es2015'],
                // plugins: ['transform-runtime']
            }
        },
        {
            test: /\.html/,
            loader: 'raw-loader'
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                // activate source maps via loader query
                'css?sourceMap!' +
                'less?sourceMap'
            )
        }]
    },
    plugins: [
        new ExtractTextPlugin(path.normalize('./app/styles.css'))
    ]
};