'use strict';

import friends from '../../reducers/friends'
import * as actions from '../../actions/friend'
import * as contactActions from '../../actions/contact'

describe('friends reducer', () => {
  let bob = {name: "Bob", recordID: 50}

  it('should return an initial state', () => {
    expect(
      friends(undefined, {})
    ).toEqual({})
  })

  describe('updateFriend action', () => {
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

  describe('toggleActive action', () => {
    it('should toggle a new friend active', () => {
      let state = friends(undefined, contactActions.toggleActive(bob))
      expect(state).toMatchSnapshot()
    })

    it('should toggle an existing friend (in)active', () => {
      let state = friends(undefined, actions.updateFriend({...bob, isActive: true}))

      // Now Bob is inactive
      state = friends(state, contactActions.toggleActive(bob))
      expect(state).toMatchSnapshot()

      // Now Bob is active
      state = friends(state, contactActions.toggleActive(bob))
      expect(state).toMatchSnapshot()
    })
  })
})
