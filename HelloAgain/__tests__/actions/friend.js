'use strict';

import * as actions from '../../actions/friend'

describe('updateFriend', () => {
  it('should return an action', () => {
    let bob = {name: "Bob"};
    expect(
      actions.updateFriend(bob)
    ).toMatchSnapshot()
  })
})
