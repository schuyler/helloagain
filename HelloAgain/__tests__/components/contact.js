'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon'
import { shallow } from 'enzyme'


import { CONTACT_FIXTURE } from "../fixtures/contacts"
import Contact from "../../components/contact"

it('renders a contact', () => {
  let fixture = CONTACT_FIXTURE[0]
  expect(renderer.create(
    <Contact {...fixture} />
  )).toMatchSnapshot();
})

it('renders an active contact', () => {
  let fixture = {...CONTACT_FIXTURE[0], isActive: true}
  expect(renderer.create(
    <Contact {...fixture} />
  )).toMatchSnapshot();
})

it('provides its props when pressed', () => {
  const fixture = CONTACT_FIXTURE[0]
  const onPress = sinon.spy()
  const wrapper = shallow(
    <Contact {...fixture} onPress={onPress} />
  )
  wrapper.simulate("press")
  expect(onPress.calledOnce).toBe(true)
  expect(onPress.args[0][0]).toMatchObject(fixture)
})
