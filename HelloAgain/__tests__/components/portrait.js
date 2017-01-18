'use strict'

import React from 'react';
import renderer from 'react-test-renderer';

import { CONTACT_FIXTURE } from "../fixtures/contacts"
import Portrait from "../../components/portrait"

it('renders a default', () => {
  expect(renderer.create(
    <Portrait />
  )).toMatchSnapshot();
})


it('renders a uri', () => {
  let fixture = CONTACT_FIXTURE[0]
  expect(renderer.create(
    <Portrait uri="file://../../assets/epic.png" />
  )).toMatchSnapshot();
})
