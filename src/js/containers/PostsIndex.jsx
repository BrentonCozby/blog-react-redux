import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPosts } from '../actions/index.js'

class PostsIndex extends Component {

    componentWillMount() {
        this.props.getPosts()
    }

    renderPostSnippet = (post) => (
        <li className="post-snippet" key={post.id}>
            <Link to={`${this.props.match.url}/${post.id}`}>
                <h3 className="post-title">{post.title}</h3>
                {post.tags &&
                    (<p className="post-tags">{post.tags}</p>)
                }
            </Link>
        </li>
    )

    render() {
        const { allPosts } = this.props
        return (
            <div className="PostsIndex">
                <h2>Posts</h2>
                <ul>
                    {allPosts && allPosts.map(this.renderPostSnippet)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { allPosts: state.posts.all }
}

export default connect(mapStateToProps, { getPosts })(PostsIndex)
