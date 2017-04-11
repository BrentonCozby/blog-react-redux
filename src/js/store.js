import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware()(createStore)

export default function configStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

  return store
}
