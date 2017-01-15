'use strict';

import friends from '../../reducers/friends'
import * as actions from '../../actions/friend'

describe('friends reducer', () => {
  it('should return an initial state', () => {
    expect(
      friends(undefined, {})
    ).toEqual({})
  })

  let bob = {name: "Bob", recordID: 50};
  let initialState = friends(undefined, actions.updateFriend(bob))
  it('should add a friend', () => {
    expect(initialState).toEqual({50: bob})
  })

  it('should not duplicate an existing friend', () => {
    expect(
      friends(initialState, actions.updateFriend(bob))
    ).toEqual(initialState)
  })

  it("should merge a friend's existing record", () => {
    let newFact = {recordID: 50, hobby: "fishing"}
    let newState = friends(initialState, actions.updateFriend(newFact))
    expect(newState).toMatchObject({50: {...bob, ...newFact}})
  })

  let jim = {name: "Jim", recordID: 42};
  it('should add a new friend at the front', () => {
    expect(
      friends(initialState, actions.updateFriend(jim))
    ).toEqual({50: bob, 42: jim})
  })
})
