import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './components/App.jsx'
import NoMatch from './components/NoMatch.jsx'

export default <div>
    <Switch>
        <Route path="/" component={App} />
        <Route component={NoMatch}/>
    </Switch>
</div>
