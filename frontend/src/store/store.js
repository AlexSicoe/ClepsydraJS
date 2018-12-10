import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from '../reducers'
import errorMiddleware from '../middleware/errorMiddleware';

const middleware = applyMiddleware(errorMiddleware, promiseMiddleware(), logger)
export default createStore(reducers, middleware)