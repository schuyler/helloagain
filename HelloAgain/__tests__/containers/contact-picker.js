'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { TOGGLE_ACTIVE } from "../../actions/types"
import ContactPicker from "../../containers/contact-picker"
import FRIENDS_FIXTURE from "../fixtures/friends"

const mockStore = configureStore([])
const store = mockStore({friends: FRIENDS_FIXTURE})

it('renders a list of contacts', () => {
  expect(renderer.create(
    <ContactPicker store={store} />
  )).toMatchSnapshot()
})

it('picks up a sorted list of contacts from the store', () => {
  const wrapper = shallow(
    <ContactPicker store={store} />
  )
  const items = wrapper.prop("items")
  expect(items).toMatchSnapshot()
})

it('can toggle a contact', () => {
  const wrapper = shallow(
    <ContactPicker store={store} />
  )
  const items = wrapper.prop("items")
  const contact = items[0]
  wrapper.props().onContactPress(contact)
  const actions = store.getActions()
  expect(actions[0]).toMatchObject({ type: TOGGLE_ACTIVE, friend: contact })
})
