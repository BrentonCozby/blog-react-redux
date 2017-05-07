import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { rootUrl } from '../../../../config.js'

import Menu from '../containers/Menu.jsx'
import PostsIndex from '../containers/PostsIndex.jsx'
import PostEditor from './PostEditor.jsx'
import PostDetail from '../containers/PostDetail.jsx'
import NoMatch from './NoMatch.jsx'
import LeftPage from '../containers/LeftPage.jsx'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <LeftPage />
                <Switch>
                    <Route exact path={`${rootUrl}/`} render={() => (
                        <Redirect to={`${rootUrl}/posts`} />
                    )} />
                    <Route exact path={`${rootUrl}/posts`} component={PostsIndex} />
                    <Route exact path={`${rootUrl}/posts/editor`} component={PostEditor} />
                    <Route exact path={`${rootUrl}/posts/new`} component={PostEditor} />
                    <Route exact path={`${rootUrl}/posts/:id`} component={PostDetail} />
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        )
    }
}

export default App
