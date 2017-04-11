import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer as ReactHotLoader } from 'react-hot-loader'

import configStore from './store.js'
import App from './components/App.jsx'
import '../scss/index.scss'

// import views so they can live-reload during development
if (process.env.NODE_ENV === 'development') {
    // const glob = require('glob')
    // const { resolve } = require('path')
    //
    // glob.sync( '../views/**/*.pug' ).forEach( function( view ) {
    //   require( resolve( view ) );
    // });

    // pages
    require('../views/pages/index.pug')

    // partials
    require('../views/partials/layout.pug')
    require('../views/partials/head.pug')
}

const store = configStore()

const render = (routes) => {

    routes = routes || require('./routes.jsx').default

    if(process.env.NODE_ENV === 'development') {
        ReactDOM.render(
            <ReactHotLoader>
                <Provider store={store}>
                    <Router>
                        {routes}
                    </Router>
                </Provider>
            </ReactHotLoader>,
        document.getElementById('root'))
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    {routes}
                </Router>
            </Provider>,
        document.getElementById('root'))
    }
}

render()

// Hot Module Replacement API
if (module.hot) {
    // module.hot.accept()
    module.hot.accept('./components/App.jsx', () => {
        const nextRoutes = require('./routes.jsx').default
        render(nextRoutes)
    })
    module.hot.accept('./routes.jsx', () => {
        const nextRoutes = require('./routes.jsx').default
        render(nextRoutes)
    });
}
