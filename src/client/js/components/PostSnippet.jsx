import React from 'react'
import { rootUrl } from '../../../../config.js'
import { Link } from 'react-router-dom'

const PostSnippet = ({
    post,
    getOnePost
}) => {
    const style = {
        backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, .7) 90%),
            linear-gradient(rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 30%),
            url(${post.image})
        `
    }
    const setActivePost = () => {
        getOnePost(post.id)
    }
    return (
        <Link
            to={`${rootUrl}/posts/${post.id}`}
            className="PostSnippet"
            key={post.id}
            style={style}
            onClick={setActivePost}
        >
            <span className="PostSnippet-date">{post.date}</span>
            <h3 className="PostSnippet-title">{post.title}</h3>
        </Link>
    )
}

export default PostSnippet
