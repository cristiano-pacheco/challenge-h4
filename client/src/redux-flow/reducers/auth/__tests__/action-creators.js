import * as actions from '../actions'
import * as actionCreators from '../action-creators'

describe('reducers/auth/action-creators', () => {
  it('setAuth should dispatch a SET_AUTH action', () => {
    expect(actionCreators.setAuth(true))
      .toEqual({
        type: actions.SET_AUTH,
        payload: true
      })
  })

  it('setAuth should dispatch a SET_AUTH action', () => {
    expect(actionCreators.setAuth(false))
      .toEqual({
        type: actions.SET_AUTH,
        payload: false
      })
  })
})
