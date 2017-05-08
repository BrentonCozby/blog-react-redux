import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { rootUrl } from '../../../../config.js'

import Menu from '../containers/Menu.jsx'
import LeftPage from '../containers/LeftPage.jsx'
import RightPage from '../containers/RightPage.jsx'
import PostsIndex from '../containers/PostsIndex.jsx'
import PostEditor from '../containers/PostEditor.jsx'
import PostDetail from '../containers/PostDetail.jsx'
import NoMatch from './NoMatch.jsx'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <LeftPage />
                <RightPage>
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
                </RightPage>
            </div>
        )
    }
}

export default App
