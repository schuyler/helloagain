'use strict'

import React from 'react';
import renderer from 'react-test-renderer';

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

