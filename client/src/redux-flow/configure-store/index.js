import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default ({ initialState } = {}) => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  )
}
