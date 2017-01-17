'use strict'

import React from 'react';
import renderer from 'react-test-renderer';

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import FriendList from "../../components/friend-list"

it('renders a list of friends', () => {
  expect(renderer.create(
    <FriendList items={CONTACT_FIXTURE} />
  )).toMatchSnapshot();
})
