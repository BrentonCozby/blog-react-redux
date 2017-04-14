import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOnePost, deletePost } from '../actions/index.js'

class PostDetail extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.getOnePost(this.props.match.params.id)
    }

    onDelete = () => {
        this.props.deletePost(this.props.match.params.id)
        .then(() => {
            this.context.router.history.push('/')
        })
    }

    render() {
        const { active } = this.props
        let title, categories, content
        if(active) {
            title = active.title
            categories = active.categories
            content = active.content
        }
        return (
            <div className="PostDetail">
                <p className="PostDetail-title">{title || null}</p>
                <p className="PostDetail-categories">{categories || null}</p>
                <div className="PostDetail-content">{content || null}</div>
                <button onClick={this.onDelete} className="delete">Delete</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { active: state.posts.active }
}

export default connect(
    mapStateToProps,
    { getOnePost, deletePost }
)(PostDetail)
