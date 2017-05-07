import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
            title: null,
            date: null
        })
    }

    renderPostSnippet = (post) => {
        const style = {
            backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, .7) 90%),
                linear-gradient(rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 30%),
                url(${post.image})
            `
        }
        const setActivePost = () => {
            this.props.getOnePost(post.id)
        }
        return (
            <Link
                to={`/posts/${post.id}`}
                className="post-snippet"
                key={post.id}
                style={style}
                onClick={setActivePost}
            >
                <span className="post-snippet-date">{post.date}</span>
                <h3 className="post-snippet-title">{post.title}</h3>
            </Link>
        )
    }

    render() {
        const { allPosts, isReadingMode, toggleReadingMode } = this.props
        return (
            <div className={(isReadingMode) ? 'PostsIndex reading-mode' : 'PostsIndex'}>
                {isReadingMode &&
                    <div className="back-arrow" onClick={toggleReadingMode}>→</div>
                }
                <div className="posts-container">
                    {allPosts && allPosts.map(this.renderPostSnippet)}
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
