import {
    HotModuleReplacementPlugin,
    HashedModuleIdsPlugin,
    NamedModulesPlugin,
    DefinePlugin,
    optimize
} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ChunkManifestPlugin from "chunk-manifest-webpack-plugin"
import WebpackChunkHash from "webpack-chunk-hash"
import HtmlPlugin from 'html-webpack-plugin'
import ResourceHintsPlugin from 'resource-hints-webpack-plugin'
import FaviconsPlugin from 'favicons-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'


function plugins(env) {

    let config = [
        new HtmlPlugin({
            template: resolve(__dirname, '../src', 'views', 'pages', 'index.pug'),
            filename: 'index.html'
        }),
        new ExtractTextPlugin(
            (env === 'prod')
            ? 'style.[chunkhash].css'
            : 'style.css'
        ),
        new ResourceHintsPlugin(),
        new optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
              return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new DefinePlugin({
            'process.env': {
               'NODE_ENV': (env === 'dev') ? '"development"' : '"production"'
            }
        }),
        new optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest"
        }),
        new FaviconsPlugin(resolve(__dirname, '../images', 'b-icon.png')),
        new CopyPlugin([
            {from: resolve(__dirname, '../src', 'crossdomain.xml')},
            {from: resolve(__dirname, '../src', 'humans.txt')},
            {from: resolve(__dirname, '../src', 'robots.txt')},
            {
                from: resolve(__dirname, '../src', 'js', 'aos.js'),
                to: resolve(__dirname, '../dist', 'js')
            },
            {
                from: resolve(__dirname, '../images'),
                to: resolve(__dirname, '../dist', 'images'),
                flatten: true
            }
        ])
    ]

    return config
}

export default plugins
