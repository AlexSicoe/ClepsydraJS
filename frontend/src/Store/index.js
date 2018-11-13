import { combineReducers, createStore } from 'redux'
import { user } from './Reducers/user'

const reducers = combineReducers({
	user, //user: user
	//
})

const store = createStore(reducers)

store.subscribe(() => { 
	console.log('store changed', store.getState())
})

const setUsernameAction = { type: 'SET_USERNAME', username: 'John Doe' }

store.dispatch(setUsernameAction)

