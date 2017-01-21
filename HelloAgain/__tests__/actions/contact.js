'use strict';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/contact'
import * as importActions from '../../actions/contact-import'

const mockStore = configureMockStore([thunk])
describe('toggleActive', () => {
  const bob = {helloAgainID: "bob-5555", givenName: "Bob"}
  const store = mockStore({friends: {[bob.helloAgainID]: bob}})

  it('should dispatch a TOGGLE_ACTIVE action', () => {
    // Mock the native contacts write function
    importActions.writeIDtoNativeContact = jest.fn()
    // Dispatch the thunk action and make sure
    store.dispatch(actions.toggleActive(bob))
    // 1. the TOGGLE_ACTIVE action got dispatched
    expect(store.getActions()).toMatchSnapshot()
    // 2. writeIDtoNativeContact gets called
    expect(importActions.writeIDtoNativeContact).toHaveBeenCalledWith(bob)
  })
})
