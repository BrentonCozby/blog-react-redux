import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOnePost, deletePost, setPhotoUrl } from '../actions/index.js'
import Footer from '../components/Footer.jsx'

class PostDetail extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.getOnePost(this.props.match.params.id)
        .then(res => {
            this.props.setPhotoUrl(res.payload.data.image)
        })
    }

    onDelete = () => {
        this.props.deletePost(this.props.match.params.id)
        .then(() => {
            this.context.router.history.push('/')
        })
    }

    render() {
        const { active, isReadingMode } = this.props
        let title, categories, content
        if(active) {
            title = active.title
            categories = active.categories
            content = active.content
        }
        return (
            <div className={(isReadingMode) ? 'PostDetail reading-mode' : 'PostDetail'}>
                <h2 className="PostDetail-title">{title || null}</h2>
                <p className="PostDetail-categories">{categories || null}</p>
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
    { getOnePost, deletePost, setPhotoUrl }
)(PostDetail)
