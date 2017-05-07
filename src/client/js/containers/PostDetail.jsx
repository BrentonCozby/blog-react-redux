import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

import {
    getPosts,
    getOnePost,
    deletePost,
    setLeftPage,
    toggleReadingMode
} from '../actions/index.js'
import Footer from '../components/Footer.jsx'

class PostDetail extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        const { getOnePost, match } = this.props
        getOnePost(match.params.id)
    }

    componentDidUpdate() {
        const { active, setLeftPage } = this.props
        if(active) {
            setLeftPage(active)
        }
    }

    onDelete = () => {
        this.props.deletePost(this.props.match.params.id)
        .then(() => {
            this.context.router.history.push('/')
        })
    }

    render() {
        const { userId, active, isReadingMode, toggleReadingMode } = this.props
        let title, content
        if(active) {
            title = active.title
            content = active.content
        }
        return (
            <div className={(isReadingMode) ? 'PostDetail reading-mode' : 'PostDetail'}>
                {isReadingMode &&
                    <div className="back-arrow" onClick={toggleReadingMode}>→</div>
                }
                <div className="PostDetail-post-container">
                    {userId && (
                        <div>
                            <Link to={`/posts/editor`} className="edit-btn">Edit</Link>
                            <a onClick={this.onDelete} className="delete-btn">Delete</a>
                        </div>
                    )}
                    <h2 className="PostDetail-title">{title || null}</h2>
                    <FroalaEditorView
                        model={content}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.id,
        active: state.posts.active,
        isReadingMode: state.posts.isReadingMode
    }
}

export default connect(
    mapStateToProps,
    {
        getPosts,
        getOnePost,
        deletePost,
        setLeftPage,
        toggleReadingMode
    }
)(PostDetail)
