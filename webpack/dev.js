import { resolve } from 'path'
import {
    HotModuleReplacementPlugin,
    NamedModulesPlugin
} from 'webpack'

import { Dir } from '../config.js'

export default {
    entry: {
        bundle: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            resolve(Dir.client, 'js', 'index.jsx')
        ]
    },
    output: {
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {modules: false}],
                            'react',
                            'stage-2'
                        ],
                        plugins: [
                            'react-hot-loader/babel'
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 40000,
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    ],
    devServer : {
        hot: true,
        contentBase: Dir.dist,
        publicPath: '/',
        historyApiFallback: true
    },
    devtool: 'eval'
}
