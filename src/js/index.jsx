import React from 'react'
import ReactDOM from 'react-dom'

import '../scss/index.scss'
import './aos.js'

if (process.env.NODE_ENV === 'development') {
    // pages
    require('../views/pages/index.pug')

    // partials
    require('../views/partials/layout.pug')
    require('../views/partials/head.pug')
}

import {AppContainer} from 'react-hot-loader'
// AppContainer is a necessary wrapper component for HMR

import App from './components/App.jsx'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>, document.getElementById('root')
    )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App.jsx', () => {
        render(App)
    })
}
