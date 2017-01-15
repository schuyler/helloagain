'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import ContactList from "../../components/contact-list"

it('renders a list of contacts', () => {
  expect(renderer.create(
    <ContactList items={CONTACT_FIXTURE} />
  )).toMatchSnapshot();
})

it('accepts a renderRow prop', () => {
  const renderRow = () => {}
  const wrapper = shallow(
    <ContactList items={CONTACT_FIXTURE} renderRow={renderRow} />
  )
  expect(wrapper.find("ListView").prop("renderRow")).toBe(renderRow)
})
