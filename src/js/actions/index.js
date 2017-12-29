import { loadAllPosts, loadOnePost } from '../firebase.js'

export function getPosts() {
    return dispatch => {
        loadAllPosts().then(posts => {
            dispatch({
                type: 'GET_POSTS',
                payload: posts
            })
        })
    }
}

export function createPost(post) {
    return dispatch => postsRef.push(post)
}

export function getOnePost(id) {
    return dispatch => {
        loadOnePost(id).then(post => {
            dispatch({
                type: 'GET_ONE_POST',
                payload: (post)
                    ? {...post, id}
                    : null
            })
        })
    }
}

export function updatePost(postData) {
    let { postId, title, image, date, content } = postData
    return dispatch => {
        db.ref(`posts/${postId}`).set({
            title, image, date, content
        })
    }
}

export function deletePost(id) {
    return dispatch => postsRef.child(id).remove()
}

export function setLeftPage(postData) {
    return {
        type: 'SET_LEFT_PAGE',
        payload: postData
    }
}

export function toggleReadingMode() {
    return {
        type: 'TOGGLE_READING_MODE'
    }
}

export function clearActivePost() {
    return {
        type: 'CLEAR_ACTIVE_POST'
    }
}

export function login(user) {
    return {
        type: 'LOGIN',
        payload: user
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}
