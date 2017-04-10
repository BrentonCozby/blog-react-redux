import React from 'react'
import ReactDOM from 'react-dom'

import '../scss/index.scss'
import AOS from './aos.js'

AOS.init()

if (process.env.NODE_ENV === 'development') {
    // pages
    require('../views/pages/index.pug')

    // partials
    require('../views/partials/layout.pug')
    require('../views/partials/head.pug')
}

import { AppContainer } from 'react-hot-loader'
import App from './components/App.jsx'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
    document.getElementById('root'))
}

render(App)

// Hot Module Replacement API
if (module.hot) {
    // module.hot.accept()
    module.hot.accept('./components/App.jsx', () => {
        const nextApp = require('./components/App.jsx').default
        render(nextApp)
    })
}
