import { resolve } from 'path'
import { DefinePlugin, NoEmitOnErrorsPlugin } from 'webpack'
import merge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import { Dir } from '../config.js'
import devConfig from './dev.js'
import prodConfig from './prod.js'

const TARGET = process.env.npm_lifecycle_event
const env = (TARGET === 'dev') ? 'dev' : 'prod'

let common = {
    output: {
        path: Dir.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            }, {
                test: /\.(pug)$/,
                use: ['pug-loader']
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: resolve(Dir.views, 'pages', 'index.pug')
        }),
        new DefinePlugin({
            'process.env': {
               'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CopyPlugin([
            {from: resolve(Dir.client, 'crossdomain.xml')},
            {from: resolve(Dir.client, 'humans.txt')},
            {from: resolve(Dir.client, 'robots.txt')}
        ])
    ],
    resolve: {
        modules: [
            Dir.src,
            'node_modules'
        ]
    }
}

let config;

if(env === 'dev') {
    config = merge(common, devConfig)
}

if(env === 'prod') {
    config = merge(common, prodConfig)
}

export default config
