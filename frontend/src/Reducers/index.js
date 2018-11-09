import { combineReducers, createStore } from 'redux'
import { userReducer } from './userReducer'

const reducers = combineReducers({
	user: userReducer,
	//
})

const store = createStore(reducers)

store.subscribe(() => {
	console.log('store changed', store.getState())
})

store.dispatch({ type: 'SET_NAME', payload: 'John Doe' })

