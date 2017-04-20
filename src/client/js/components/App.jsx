// vendor
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// components
import Menu from './Menu.jsx'
import PostsIndex from '../containers/PostsIndex.jsx'
import NewPost from './NewPost.jsx'
import PostDetail from '../containers/PostDetail.jsx'
import NoMatch from './NoMatch.jsx'

// containers
import LeftPage from '../containers/LeftPage.jsx'

class App extends Component {

    render() {
        let match = this.props.match.url
        match = (match === '/') ? '' : match

        return (
            <div className="App">
                <Menu />
                <LeftPage />
                <Switch>
                    <Route exact path={`${match}/`} render={() => (
                        <Redirect to={`${match}/posts`} />
                    )} />
                    <Route exact path={`${match}/posts`} component={PostsIndex} />
                    <Route exact path={`${match}/posts/new`} component={NewPost} />
                    <Route exact path={`${match}/posts/:id`} component={PostDetail} />
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        )
    }
}

export default App
