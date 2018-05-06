import createReducer from '../create-reducer'
import { SET_AUTH } from './actions'

const initialState = {
  isAuthenticated: false
}

const auth = createReducer(initialState, {
  [SET_AUTH]: (state, action) => ({
    isAuthenticated: action.payload
  })
})

export default auth
