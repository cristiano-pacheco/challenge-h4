import deepFreeze from 'deep-freeze'
import auth from '../index'
import { SET_AUTH } from '../actions'

describe('reducers/auth', () => {
  it('should set the auth attribute correctly with payload value false', () => {
    const before = deepFreeze({ isAuthenticated: false })
    const action = deepFreeze({
      type: SET_AUTH,
      payload: true
    })
    const after = { isAuthenticated: true }
    expect(auth(before, action)).toEqual(after)
  })

  it('should set the auth attribute correctly with payload value true', () => {
    const before = deepFreeze({ isAuthenticated: true })
    const action = deepFreeze({
      type: SET_AUTH,
      payload: false
    })
    const after = { isAuthenticated: false }
    expect(auth(before, action)).toEqual(after)
  })
})
