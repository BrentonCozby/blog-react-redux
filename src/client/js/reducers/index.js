import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import postsReducer from './posts.js'
import LeftPageReducer from './leftPage.js'

const rootReducer = combineReducers({
    leftPage: LeftPageReducer,
    posts: postsReducer,
    form: formReducer
})

export default rootReducer
