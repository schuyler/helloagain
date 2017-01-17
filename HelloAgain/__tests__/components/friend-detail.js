'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon'
import { shallow } from 'enzyme'


import { CONTACT_FIXTURE } from "../fixtures/contacts"
import FriendDetail from "../../components/friend-detail"

it('frienders', () => {
  let fixture = CONTACT_FIXTURE[0]
  expect(renderer.create(
    <FriendDetail item={fixture} />
  )).toMatchSnapshot();
})

it('responds when marked contacted', () => {
  const fixture = CONTACT_FIXTURE[0]
  const onPress = sinon.spy()
  const closeDetail = sinon.spy()
  const wrapper = shallow(
    <FriendDetail item={fixture} onContactedPress={onPress} closeDetail={closeDetail} />
  )
  wrapper.find("Button").simulate("press")
  expect(onPress.calledOnce).toBe(true)
  expect(onPress.args[0][0]).toMatchObject(fixture)
  expect(closeDetail.calledOnce).toBe(true)
})
