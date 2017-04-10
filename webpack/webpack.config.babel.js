import { resolve } from 'path'

const entry = (env) => {
    if(env === 'dev') {
        return {
            bundle: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
                resolve(__dirname, '../src', 'js', 'index.jsx')
            ]
        }
    } else {
        return {
            bundle: [
                resolve(__dirname, '../src', 'js', 'index.jsx')
            ]
        }
    }
}

export default function(env) {

    let config = {
        entry: entry(env),
        output: {
            filename: (env === 'prod')
                ? 'js/[name].[chunkhash].js'
                : 'js/[name].js',
            chunkFilename: 'js/[name].[chunkhash].js',
            path: resolve(__dirname, '../dist'),
            publicPath: ''
        },
        module: {
            rules: require('./rules.babel.js').default(env)
        },
        plugins: require('./plugins.babel.js').default(env),
        resolve: {
            modules: [
                resolve(__dirname, '../src'),
                'node_modules'
            ]
        },
        devtool: (env === 'dev') ? 'inline-source-map' : false,
    }

    if(env === 'dev') {
        config.devServer = {
            hot: true,
            contentBase: resolve(__dirname, '../dist'),
            publicPath: ''
        }
    }

    return config
}
