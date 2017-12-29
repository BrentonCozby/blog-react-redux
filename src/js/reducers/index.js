import { combineReducers } from 'redux'

import postsReducer from './posts.js'
import LeftPageReducer from './leftPage.js'
import authReducer from './auth.js'

const rootReducer = combineReducers({
    leftPage: LeftPageReducer,
    posts: postsReducer,
    user: authReducer
})

export default rootReducer
