import { postsRef } from '../firebase.js'

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
    return Promise.resolve({
        type: 'GET_ONE_POST',
        payload: id
    })
}

export function deletePost(id) {
    return dispatch => postsRef.child(id).remove()
}

export function setHeadingText(text) {
    return {
        type: 'SET_HEADING_TEXT',
        payload: text
    }
}

export function setPhotoUrl(url) {
    return {
        type: 'SET_PHOTO_URL',
        payload: url
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
