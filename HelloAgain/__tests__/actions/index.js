'use strict';

import * as actions from '../../actions'

describe('addFriend', () => {
  let bob = {name: "Bob"};
  it('should have a friend', () => {
    expect(actions.addFriend(bob).friend).toMatchObject(bob)
  })
  it('should return a type', () => {
    expect(actions.addFriend(bob).type).toEqual(actions.ADD_FRIEND);
  })
})
