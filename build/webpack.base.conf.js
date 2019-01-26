'use strict'
const url = require('url');
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '^': resolve('node_modules'),
            'styles': resolve('src/assets/styles'),
            'common': resolve('src/pages/common')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: /favicon\.png$/,
                // loader: 'url-loader',
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }],
                // options: {
                //     limit: 10000,
                //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                // }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devServer: {
        host: '127.0.0.1',
        proxy: {
            '/uploader-web/*': {
                target: 'http://127.0.0.1:8090',
                // target: "http://10.209.130.132:8090",
                changeOrigin: false,
                pathRewrite: {},
                bypass: function (req, res, proxyOptions) {
                    req.headers.host = '127.0.0.1'
                    var apiname = req._parsedUrl.pathname;
                    var querystring = req._parsedUrl.query;
                    var mockstring = '';
                }

            }
        },
        // historyApiFallback: {index: url.parse(options.dev ? '/assets/' : publicPath).pathname}
    },
    devtool: '#source-map'
}
