import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from '../reducers'

const middleware = applyMiddleware(promise(), logger)
export default createStore(reducers, middleware)