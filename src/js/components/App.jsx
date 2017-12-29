import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Menu from 'containers/Menu.jsx'
import LeftPage from 'containers/LeftPage.jsx'
import RightPage from 'containers/RightPage.jsx'
import PostsIndex from 'containers/PostsIndex.jsx'
import PostEditor from 'containers/PostEditor.jsx'
import PostDetail from 'containers/PostDetail.jsx'
import NoMatch from './NoMatch.jsx'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <LeftPage />
                <RightPage>
                <Switch>
                    <Route exact path={`${PP}`} render={() => (
                        <Redirect to={`${PP}posts`} />
                    )} />
                    <Route exact path={`${PP}posts`} component={PostsIndex} />
                    <Route exact path={`${PP}posts/editor`} component={PostEditor} />
                    <Route exact path={`${PP}posts/new`} component={PostEditor} />
                    <Route exact path={`${PP}posts/:id`} component={PostDetail} />
                    <Route component={NoMatch}/>
                </Switch>
                </RightPage>
            </div>
        )
    }
}

export default App
