'use strict'

import React from 'react';
import renderer from 'react-test-renderer';

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import Friend from "../../components/friend"

it('frienders', () => {
  let fixture = CONTACT_FIXTURE[0]
  expect(renderer.create(
    <Friend item={fixture} />
  )).toMatchSnapshot();
})
