import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { rootUrl } from '../../../../config.js'
import PostSnippet from '../components/PostSnippet.jsx'
import defaultPhoto from '../../../../assets/images/defaultPhoto.jpg'
import {
    getPosts,
    getOnePost,
    toggleReadingMode,
    clearActivePost,
    setLeftPage
} from '../actions/index.js'
import Footer from '../components/Footer.jsx'

class PostsIndex extends Component {

    componentWillMount() {
        this.props.clearActivePost()
        this.props.getPosts()
        this.props.setLeftPage({
            image: defaultPhoto,
            title: 'Welcome to the Techlaunch Blog',
            date: null
        })
    }

    render() {
        const { allPosts, isReadingMode, toggleReadingMode } = this.props
        return (
            <div className={(isReadingMode) ? 'PostsIndex reading-mode' : 'PostsIndex'}>
                {isReadingMode &&
                    <div className="back-arrow" onClick={toggleReadingMode}>→</div>
                }
                <div className="posts-container">
                    {allPosts && allPosts.map(post => (
                        <PostSnippet
                            key={post.id}
                            post={post}
                            getOnePost={this.props.getOnePost}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.posts.all,
        isReadingMode: state.posts.isReadingMode
    }
}

export default connect(
    mapStateToProps,
    {
        getPosts,
        getOnePost,
        toggleReadingMode,
        clearActivePost,
        setLeftPage
    }
)(PostsIndex)
