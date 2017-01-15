'use strict';

import * as actions from '../../actions'

describe('updateFriend', () => {
  let bob = {name: "Bob"};
  it('should have a friend', () => {
    expect(actions.updateFriend(bob).friend).toMatchObject(bob)
  })
  it('should return a type', () => {
    expect(actions.updateFriend(bob).type).toEqual(actions.UPDATE_FRIEND);
  })
})
