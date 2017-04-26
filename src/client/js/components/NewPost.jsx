import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { createPost } from '../actions/index.js'
import Footer from './Footer.jsx'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Enter a title'
    }
    if (!values.image) {
        errors.title = 'Provide an image URL'
    }
    if (!values.content) {
        errors.content = 'Your post needs some content!'
    }
    return errors
}

const renderField = ({ element, input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            {(element === 'input') &&
                <input {...input} type={type} name={name} />
            }
            {(element === 'textarea') &&
                <textarea name={name} />
            }
            {(element === 'date') &&
                <input name={name} type={type} value={(new Date()).getDate()} />
            }
            {touched && ((error && <span>{error}</span>))}
        </div>
    </div>
)

class NewPost extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    onFormSubmit = (props) => {
        this.props.createPost(props)
        .then(() => {
            this.context.router.history.push('/')
        })
    }

    render() {
        const { handleSubmit, submitting, createPost } = this.props
        return (
            <div className="NewPostForm">
                <form onSubmit={handleSubmit(this.onFormSubmit)} id="NewPostForm">
                    <Field name="title" component={renderField} type="text" label="title" element="input" />
                    <Field name="image" component={renderField} type="text" label="image" element="input" />
                    <Field name="date" component={renderField} type="date" label="date" element="input" />
                    <Field name="tags" component={renderField} type="text" label="tags" element="input" />
                    <Field name="content" component={renderField} label="content" element="input" />
                    <button className="submit" type="submit" disabled={submitting}>Submit</button>
                    <Link to="/"><button className="cancel">Cancel</button></Link>
                </form>
                <Footer />
            </div>
        )
    }
}

export default connect(null, { createPost })(reduxForm({
    form: 'NewPostForm',
    validate
})(NewPost))
