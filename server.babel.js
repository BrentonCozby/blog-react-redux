const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const { resolve } = require('path')

const TARGET = process.env.npm_lifecycle_event
const env = (TARGET === 'dev-server') ? 'dev' : 'prod'

const PORT = 3000
const app = express()
const server = require('http').createServer(app)

app.use(compression())
app.use(morgan('combined'))

if(env === 'dev') {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpack = require('webpack')
    const config = require(resolve(__dirname, 'webpack', 'index.babel.js')).default
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {colors: true},
        hot: true
    }))
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }))
}

app.use(express.static(resolve(__dirname, 'dist')))

if(env === 'dev') {
    app.set('view engine', 'pug')
    app.set('views', resolve(__dirname, 'src', 'views', 'pages'))
    app.use((req, res) => {
        res.render('index')
    })
}

if(env === 'prod') {
    app.use((req, res) => {
        res.sendFile(resolve(__dirname, 'dist', 'index.html'))
    })
}

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})
