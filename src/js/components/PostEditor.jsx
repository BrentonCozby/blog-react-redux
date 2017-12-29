import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg'

import { createPost, updatePost, toggleReadingMode } from 'actions/index.js'
import Footer from './Footer.jsx'

function objectifyForm(formArray) {

    var formJSON = {};
    for (var i = 0; i < formArray.length; i++) {
        formJSON[formArray[i]['name']] = formArray[i]['value'];
    }
    return formJSON;
}

class PostEditor extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        postId: '',
        title: '',
        image: '',
        date: '',
        content: ''
    }

    componentWillMount() {
        this.props.toggleReadingMode()
    }

    componentDidMount() {
        if(this.props.postToEdit) {
            let { id, title, image, date, content } = this.props.postToEdit
            this.setState({ postId: id, title, image, date, content })
        }
    }

    componentWillUnmount() {
        this.props.toggleReadingMode()
    }

    onFormSubmit = (e) => {
        e.preventDefault()

        if(this.state.postId) {
            this.props.updatePost({...this.state})
            this.context.router.history.push(`${PP}posts/${this.state.postId}`)
        }
        else {
            const date = new Date().toDateString().split(' ').slice(1).join(' ')

            this.props.createPost({
                title: this.state.title,
                image: this.state.image,
                date: date,
                content: this.state.content
            })
            .then(() => {
                this.context.router.history.push(PP)
            })
        }
    }

    handleEditorChange = (model) => {
        this.setState({ content: model })
    }

    render() {
        const content = this.state.content
        return (
            <div className="PostEditor">
                <form onSubmit={e => this.onFormSubmit(e)}>
                    <div>
                        <button className="save-btn" type="submit">Save</button>
                        <Link to={PP}><button className="cancel-btn">Cancel</button></Link>
                    </div>
                    <label>Post Title</label>
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})}
                    />

                    <label>Image URL</label>
                    <input
                        name="image"
                        type="text"
                        value={this.state.image}
                        onChange={(e) => this.setState({image: e.target.value})}
                    />

                    <label>Post Content</label>
                    <FroalaEditor
                        tag='textarea'
                        config={this.config}
                        model={this.state.content}
                        onModelChange={this.handleEditorChange}
                    />
                </form>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postToEdit: state.posts.active
    }
}

export default connect(
    mapStateToProps,
    {
        updatePost,
        createPost,
        toggleReadingMode
    }
)(PostEditor)
