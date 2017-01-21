'use strict';

import configureMockStore from 'redux-mock-store'
import {CONTACT_FIXTURE} from '../fixtures/contacts'
import {CONTACTS_LOADED} from '../../actions/types'
import * as actions from '../../actions/contact-import'
import Contacts from 'react-native-contacts'
jest.mock('react-native-contacts')

const bob = {helloAgainID: "bob-dobbs-5555", givenName: "Bob", familyName: "Dobbs"}
const mockStore = configureMockStore()

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
  const store = mockStore({})
  it('should dispatch CONTACTS_LOADED', () => {
    Contacts.getAll = jest.fn(_ => Promise.resolve(CONTACT_FIXTURE))
    actions.loadNativeContacts(store).then(() => {
        let dispatched = store.getActions()
        expect(dispatched[0].type).toBe(CONTACTS_LOADED)
        expect(dispatched[0].contacts.length).toBeGreaterThan(0)
      })
      .catch(err => console.error(err))
  })
})

describe('writeIDtoNativeContact', () => {
  it('should not write a never-active contact', () => {
    Contacts.updateContact = jest.fn()
    actions.writeIDtoNativeContact(bob)
    expect(Contacts.updateContact).not.toHaveBeenCalled()
  })
  it('should not write a contact that already has a URL', () => {
    Contacts.updateContact = jest.fn()
    actions.writeIDtoNativeContact({
      ...bob, 
      urlAddresses: [
        {label: "HelloAgain", urlAddress: "helloagain://to/bob-dobbs-5555"}
      ],
      isActive: true
    })
    expect(Contacts.updateContact).not.toHaveBeenCalled()
  })
  it('should write a contact that doesn\'t have a deep link', () => {
    for (let isActive of [true, false]) {
      let updatedContact = null
      Contacts.updateContact = jest.fn(contact => {updatedContact = contact})
      actions.writeIDtoNativeContact({...bob, urlAddresses: [], isActive: isActive})
      expect(Contacts.updateContact).toHaveBeenCalled()
      let url = updatedContact.urlAddresses[0]
      expect(url.label).toBe("HelloAgain")
      expect(url.urlAddress).toBe("helloagain://to/" + bob.helloAgainID)
    }
  })
})
