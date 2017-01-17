'use strict'

import Contacts from 'react-native-contacts'

import {
  CONTACTS_LOADED, CONTACT_LOAD_FAILED
} from './types';

export const contactsLoaded = (contacts) => {
  return {type: CONTACTS_LOADED, contacts: contacts}
}

export const contactLoadFailed = (error) => {
  return {type: CONTACT_LOAD_FAILED, error: error}
}

export const loadNativeContacts = () => {
  const loadContacts = new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      err ? reject(err) : resolve(contacts)
    })
  })
  return dispatch => {
    loadContacts.then(
      contacts => { dispatch(contactsLoaded(contacts)) },
      error => { dispatch(contactLoadFailed(error)) }
    )
  }
}
