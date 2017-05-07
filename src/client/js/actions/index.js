import { db, postsRef } from '../firebase.js'

export function getPosts() {
    return dispatch => {
        postsRef.on('value', snapshot => {
            dispatch({
                type: 'GET_POSTS',
                payload: snapshot.val()
            })
        })
    }
}

export function createPost(post) {
    return dispatch => postsRef.push(post)
}

export function getOnePost(id) {
    return dispatch => {
        db.ref(`posts/${id}`).on('value', snapshot => {
            dispatch({
                type: 'GET_ONE_POST',
                payload: {...snapshot.val(), id}
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
