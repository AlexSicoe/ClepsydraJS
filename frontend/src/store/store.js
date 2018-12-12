import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from '../reducers'
import messageMiddleware from '../middleware/messageMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = applyMiddleware(messageMiddleware, promiseMiddleware(), thunk, logger)
export default createStore(reducers, composeWithDevTools(middleware))