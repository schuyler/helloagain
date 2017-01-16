'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import { TOGGLE_ACTIVE } from "../../actions/types"
import ContactPicker from "../../containers/contact-picker"

const mockStore = configureStore([])
const store = mockStore({contacts: CONTACT_FIXTURE})

it('renders a list of contacts', () => {
  expect(renderer.create(
    <ContactPicker store={store} />
  )).toMatchSnapshot()
})

it('picks up a list of contacts from the store', () => {
  const wrapper = shallow(
    <ContactPicker store={store} />
  )
  const items = wrapper.prop("items")
  expect(items).toEqual(CONTACT_FIXTURE)
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
