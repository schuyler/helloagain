'use strict';

import * as actions from '../../actions/friend'

let bob = {name: "Bob"};

describe('updateFriend', () => {
  it('should return an action', () => {
    expect(
      actions.updateFriend(bob)
    ).toMatchSnapshot()
  })
})

describe('markAsContacted', () => {
  it('should return an action', () => {
    expect(
      actions.markAsContacted(bob)
    ).toMatchSnapshot()
  })
})
