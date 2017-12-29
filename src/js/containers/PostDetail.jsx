import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    setLeftPage
} from 'actions/index.js'

class PostDetail extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        window.scrollTo(0, 0)
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
            this.context.router.history.push(PP)
        })
    }

    render() {
        const { userId, active } = this.props
        let title, content
        if(active) {
            title = active.title
            content = active.content
        }
        return (
            <div className="PostDetail">
                {!active &&
                    <h2>Post Not Found</h2>
                }
                {active &&
                    <div className="PostDetail-post-container">
                        {userId && (
                            <div>
                                <Link to={`${PP}posts/editor`} className="edit-btn">Edit</Link>
                                <a onClick={this.onDelete} className="delete-btn">Delete</a>
                            </div>
                        )}
                        <h2 className="PostDetail-title">{title || null}</h2>
                        <FroalaEditorView
                            model={content}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.id,
        active: state.posts.active
    }
}

export default connect(
    mapStateToProps,
    {
        getPosts,
        getOnePost,
        deletePost,
        setLeftPage
    }
)(PostDetail)
