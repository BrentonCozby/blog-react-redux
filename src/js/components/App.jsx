import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import icon from '../../../public/b-icon.png'
import PostsIndex from '../containers/PostsIndex.jsx'
import NewPost from './NewPost.jsx'
import PostDetail from './PostDetail.jsx'
import NoMatch from './NoMatch.jsx'

const Foo = () => (
    <div>
        <h3>Helloooooo</h3>
    </div>
)

class App extends Component {

    render() {
        let match = this.props.match.url
        match = (match === '/') ? '' : match

        return (
            <div className="App">
                <h1>Cello world!</h1>
                <img src={icon} alt=""/>
                <div>
                    <Link to={`${match}`}>
                        <button>Home</button>
                    </Link>
                    <Link to={`${match}/foo`}>
                        <button>Foo</button>
                    </Link>
                    <Link to={`${match}/posts`}>
                        <button>posts</button>
                    </Link>
                    <Link to={`${match}/posts/new`}>
                        <button>new post</button>
                    </Link>
                </div>
                <Switch>
                    <Route exact path={`${match}/`} component={null} />
                    <Route path={`${match}/foo`} component={Foo} />
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
