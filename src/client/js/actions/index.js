import axios from 'axios'

const rootUrl = `http://reduxblog.herokuapp.com/api`
const API_KEY = `?key=asluighalsdfk`

export function getPosts() {

    const request = axios.get(`${rootUrl}/posts${API_KEY}`)

    return {
        type: 'GET_POSTS',
        payload: request
    }
}

export function createPost(props) {
    const request = axios.post(`${rootUrl}/posts${API_KEY}`, props)

    return {
        type: 'CREATE_POST',
        payload: request
    }
}

export function getOnePost(id) {
    const request = axios.get(`${rootUrl}/posts/${id}${API_KEY}`)

    return {
        type: 'GET_ONE_POST',
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.delete(`${rootUrl}/posts/${id}${API_KEY}`)

    return {
        type: 'DELETE_POST',
        payload: request
    }
}

export function setHeadingText(text) {
    return {
        type: 'SET_HEADING_TEXT',
        payload: text
    }
}

export function toggleReadingMode() {
    return {
        type: 'TOGGLE_READING_MODE'
    }
}
