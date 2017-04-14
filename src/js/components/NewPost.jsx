import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { createPost } from '../actions/index.js'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Enter a title'
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
            <form onSubmit={handleSubmit(this.onFormSubmit)} id="NewPostForm">
                <Field name="title" component={renderField} type="text" label="title" element="input" />
                <Field name="categories" component={renderField} type="text" label="categories" element="input" />
                <Field name="content" component={renderField} label="content" element="input" />
                <button className="submit" type="submit" disabled={submitting}>Submit</button>
                <Link to="/"><button className="cancel">Cancel</button></Link>
            </form>
        )
    }
}

export default connect(null, { createPost })(reduxForm({
    form: 'NewPostForm',
    validate
})(NewPost))
