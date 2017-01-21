'use strict';

import friends from '../../reducers/friends'
import * as actions from '../../actions/friend'
import * as contactActions from '../../actions/contact'
import * as importActions from '../../actions/contact-import'
import { copyFriendsFixture } from "../fixtures/friends"

describe('friends reducer', () => {
  let bob = {name: "Bob", helloAgainID: "bob-5555"}
  let jim = {name: "Jim", helloAgainID: "jim-4242"}

  it('should return an initial state', () => {
    expect(
      friends(undefined, {})
    ).toEqual({})
  })

  describe('contactsLoaded action', () => {
    let initialState = copyFriendsFixture()
    let randomPerson = Object.values(initialState)[0]
    it('should import contacts and overwrite existing values', () => {
      let contactImport = [
        {
          urlAddresses: [{
            label: "HelloAgain",
            urlAddress: randomPerson.helloAgainID
          }],
          phoneNumber: "800-555-1212"
        },
        {
          recordID: 99,
          givenName: "Carl",
          familyName: "Sagan"
        }
      ]
      expect(
        friends(initialState, importActions.contactsLoaded(contactImport))
      ).toMatchSnapshot()
    })
  })

  describe('updateFriend action', () => {
    let initialState = friends(undefined, actions.updateFriend(bob))
    it('should add a friend', () => {
      expect(initialState).toEqual({[bob.helloAgainID]: bob})
    })

    it('should not duplicate an existing friend', () => {
      expect(
        friends(initialState, actions.updateFriend(bob))
      ).toEqual(initialState)
    })

    it("should merge a friend's existing record", () => {
      let newFact = {helloAgainID: bob.helloAgainID, hobby: "fishing"}
      let newState = friends(initialState, actions.updateFriend(newFact))
      expect(newState).toMatchObject({[bob.helloAgainID]: {...bob, ...newFact}})
    })

    it('should add a new friend', () => {
      expect(
        friends(initialState, actions.updateFriend(jim))
      ).toEqual({[bob.helloAgainID]: bob, [jim.helloAgainID]: jim})
    })
  })

  describe('markAsContacted action', () => {
    let initialState = friends(
      undefined,
      actions.updateFriend({...bob, rank: 12})
    )
    it('should update rank and contactedAt', () => {
      let newState = friends(initialState, actions.markAsContacted(bob))
      expect(newState[bob.helloAgainID].contactedAt).toBeTruthy()
      expect(newState[bob.helloAgainID].rank).toEqual(13)
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
