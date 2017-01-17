'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { toggleActive } from "../../actions/contact"
import FriendQueue from "../../containers/friend-queue"
import { copyFriendsFixture } from "../fixtures/friends"

const mockStore = configureStore([])

it('renders a list of friends', () => {
  const fixture = copyFriendsFixture()
  Object.values(fixture).forEach((f) => {f.isActive = true})
  const store = mockStore({friends: fixture})
  expect(renderer.create(
    <FriendQueue store={store} />
  )).toMatchSnapshot()
})

it('sorts and filters a list of friends from the store', () => {
  // Sort friends by descending length of name, because why not
  const rankedFriends = Object.values(copyFriendsFixture())
  rankedFriends.sort((a, b) => {
    return (b.givenName + b.familyName).length - (a.givenName + a.familyName).length
  })
  // Pick six friends and rank them
  const initialFriends = {}
  let rank = 1
  rankedFriends.slice(0, 6).forEach((f) => {
    initialFriends[f.recordID] = {...f, rank: rank++, isActive: true}
  })
  // Copy the others but don't set them active
  rankedFriends.slice(6).forEach((f) => {
    initialFriends[f.recordID] = f
  })
  const store = mockStore({friends: initialFriends})
  // Now render and make sure they're sorted and filtered accordingly
  const wrapper = shallow(
    <FriendQueue store={store} />
  )
  const items = wrapper.prop("items")
  expect(items).toMatchSnapshot()
})
