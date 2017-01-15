'use strict'

import React from 'react';
import renderer from 'react-test-renderer';

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import ContactList from "../../components/contact-list"

it('renders a list of contacts', () => {
  expect(renderer.create(
    <ContactList items={CONTACT_FIXTURE} />
  )).toMatchSnapshot();
})
