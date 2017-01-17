'use strict'

import contactImport from '../../reducers/contact-import'
import * as actions from '../../actions/contact-import'
import { CONTACT_FIXTURE } from '../fixtures/contacts'

describe('contactImport reducer', () => {
  let initialState = contactImport(undefined, {})

  it('should return an initial state', () => {
    expect(initialState).toEqual({})
  })

  it('should record successful import', () => {
    expect(
      contactImport(initialState, actions.contactsLoaded(CONTACT_FIXTURE))
    ).toMatchSnapshot()
  })

  it('should record failed import', () => {
    expect(
      contactImport(initialState, actions.contactLoadFailed("no idea why not"))
    ).toMatchSnapshot()
  })
})
