'use strict';

import friends from '../../reducers/friends'
import * as actions from '../../actions'

describe('friends reducer', () => {
  it('should return an initial state', () => {
    expect(
      friends(undefined, {})
    ).toEqual({});
  })

  let bob = {name: "Bob", recordID: 50};
  let initialState = friends(undefined, actions.addFriend(bob))
  it('should add a friend', () => {
    expect(initialState).toEqual({50: bob})
  })

  it('should not duplicate an existing friend', () => {
    expect(
      friends(initialState, actions.addFriend(bob))
    ).toEqual(initialState)
  })

  it("should merge a friend's existing record", () => {
    let newFact = {recordID: 50, hobby: "fishing"};
    let newState = friends(initialState, actions.addFriend(newFact))
    expect(newState[50]).toMatchObject({...bob, ...newFact})
  })
})
