import store from '../store/store'
import { clearMessage } from '../actions/user-actions'

export default (message) => {
  if (message) {
    alert(message)
    store.dispatch(clearMessage())
  }
}