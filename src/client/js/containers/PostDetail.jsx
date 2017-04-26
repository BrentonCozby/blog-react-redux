import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    getOnePost,
    deletePost,
    setPhotoUrl,
    setHeadingText,
    toggleReadingMode
} from '../actions/index.js'
import Footer from '../components/Footer.jsx'

class PostDetail extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.getOnePost(this.props.match.params.id)
        .then(res => {
            this.props.setPhotoUrl(this.props.active.image)
            this.props.setHeadingText(this.props.active.title)
        })
    }

    onDelete = () => {
        this.props.deletePost(this.props.match.params.id)
        .then(() => {
            this.context.router.history.push('/')
        })
    }

    render() {
        const { active, isReadingMode, toggleReadingMode } = this.props
        let title, tags, content
        if(active) {
            title = active.title
            tags = active.tags
            content = active.content
        }
        return (
            <div className={(isReadingMode) ? 'PostDetail reading-mode' : 'PostDetail'}>
                {isReadingMode &&
                    <div className="back-arrow" onClick={toggleReadingMode}>←</div>
                }
                <h2 className="PostDetail-title">{title || null}</h2>
                <p className="PostDetail-tags">{tags || null}</p>
                <div className="PostDetail-content">{content || null}</div>
                <button onClick={this.onDelete} className="delete">Delete</button>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        active: state.posts.active,
        isReadingMode: state.posts.isReadingMode
    }
}

export default connect(
    mapStateToProps,
    {
        getOnePost,
        deletePost,
        setPhotoUrl,
        setHeadingText,
        toggleReadingMode
    }
)(PostDetail)
