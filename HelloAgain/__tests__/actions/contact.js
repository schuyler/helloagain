'use strict';

import * as actions from '../../actions/contact'

const bob = {helloAgainID: "bob-dobbs-5555", givenName: "Bob", familyName: "Dobbs"}

describe('toggleActive', () => {
  it('should dispatch a TOGGLE_ACTIVE action', () => {
    expect(actions.toggleActive(bob)).toMatchSnapshot()
  })
})
