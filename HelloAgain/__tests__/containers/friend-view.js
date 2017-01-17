'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { copyFriendsFixture } from "../fixtures/friends"
import FriendView from "../../containers/friend-view"

const mockStore = configureStore([])

it('frienders', () => {
  const fixture = copyFriendsFixture()
  Object.values(fixture).forEach((f) => {f.isActive = true})
  const store = mockStore({friends: fixture})
  expect(renderer.create(
    <FriendView store={store} item={fixture["1"]} />
  )).toMatchSnapshot();
})

it('marks a friend contacted', () => {
  const fixture = copyFriendsFixture()
  const store = mockStore({friends: fixture})
  const friend = fixture["1"]
  const wrapper = shallow(
    <FriendView store={store} item={friend} />
  )
  wrapper.props().onContactedPress(friend)
  const actions = store.getActions()
  expect(actions).toMatchSnapshot()
})
