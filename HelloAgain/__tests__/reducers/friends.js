'use strict';

import friends from '../../reducers/friends'
import * as actions from '../../actions/friend'
import * as contactActions from '../../actions/contact'
import * as importActions from '../../actions/contact-import'
import { copyFriendsFixture } from "../fixtures/friends"

describe('friends reducer', () => {
  let bob = {name: "Bob", recordID: 50}
  let jim = {name: "Jim", recordID: 42}

  it('should return an initial state', () => {
    expect(
      friends(undefined, {})
    ).toEqual({})
  })

  describe('contactsLoaded action', () => {
    let initialState = copyFriendsFixture()
    it('should import contacts and overwrite existing values', () => {
      let contactImport = [
        {recordID: 1, phoneNumber: "800-555-1212"},
        {recordID: 99, givenName: "Carl", familyName: "Sagan"}
      ]
      expect(
        friends(initialState, importActions.contactsLoaded(contactImport))
      ).toMatchSnapshot()
    })
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

    it('should add a new friend', () => {
      expect(
        friends(initialState, actions.updateFriend(jim))
      ).toEqual({50: bob, 42: jim})
    })
  })

  describe('markAsContacted action', () => {
    let initialState = friends(
      undefined,
      actions.updateFriend({...bob, rank: 12})
    )
    it('should update rank and contactedAt', () => {
      let newState = friends(initialState, actions.markAsContacted(bob))
      expect(newState[bob.recordID].contactedAt).toBeTruthy()
      expect(newState[bob.recordID].rank).toEqual(13)
    })
  })

  describe('toggleActive action', () => {
    it('should toggle a new friend active and set default', () => {
      let state = friends(undefined, contactActions.toggleActive(bob))
      state = friends(state, contactActions.toggleActive(jim))
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
