import store from '../store/store'
import { clearMessage } from '../actions/user-actions'
import { BroswerRouter as Router, Route, NavLink as Link } from 'react-router-dom'

export default (message) => {
  if (message) {
    alert(message)
    store.dispatch(clearMessage())
  }
}