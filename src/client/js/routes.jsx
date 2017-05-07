import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './components/App.jsx'
import NoMatch from './components/NoMatch.jsx'
import { rootUrl } from '../../../config.js'

export default <div>
    <Switch>
        <Route path={rootUrl} component={App} />
        <Route component={NoMatch}/>
    </Switch>
</div>
