'use strict';

import * as actions from '../../actions/contact-import'

let bob = {name: "Bob"};

describe('contactsLoaded', () => {
  it('should return an action', () => {
    expect(
      actions.contactsLoaded([bob])
    ).toMatchSnapshot()
  })
})

describe('contactLoadFailed', () => {
  it('should return an action', () => {
    expect(
      actions.contactLoadFailed("no idea why not")
    ).toMatchSnapshot()
  })
})

describe('loadNativeContacts', () => {
  it('should return a thunk', () => {
    expect(
      actions.loadNativeContacts()
    ).toMatchSnapshot()
  })
})
