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
  // Create a Promise that gets all native contacts and resolves on success.
  const loadContacts = new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      err ? reject(err) : resolve(contacts)
    })
  })
  // Return an action thunk that:
  //   1. Loads all contacts
  //   2. On success, dispatches the `contactsLoaded` action
  //   3. Then, dispatches the `writeIDsForAllFriends` to write back any new
  //      IDs to the native contact store
  //   4. On failure, dispatch the `contactLoadFailed` action
  return dispatch => {
    return loadContacts
      .then(contacts => {
        let result = dispatch(contactsLoaded(contacts))
        console.log("contactsLoaded:", Object.values(result).length)
      })
      .then(_ => { return dispatch(writeIDsForAllFriends()) })
      .catch(error => dispatch(contactLoadFailed(error)))
  }
}

const generateURL = (item) => {
  return "helloagain://to/" + item.helloAgainID
}

// Check a single contact record to see if it needs the HelloAgain URL
// written to it, and if it does, write it.
export const writeIDtoNativeContact = (item) => {
  // Never been active? Don't touch the native contact.
  if (item.isActive === undefined) {
    return
  }
  // Are any of the contact's urlAddresses a HelloAgain address? Great. Skip
  // this one.
  let matchingURLs = (item.urlAddresses || []).filter(url => url.label == "HelloAgain")
  if (matchingURLs.length > 0) {
    return
  }
  // Otherwise, generate the URL, push it onto the urlAddresses list with the
  // right label, and then update the native contact store, with a log message
  // either way.
  let url = generateURL(item)
  item.urlAddresses.push({label: "HelloAgain", urlAddress: url})
  Contacts.updateContact(item, (err, contact) => {
    if (err) {
      console.log(`Error updating ${item.givenName} ${item.familyName} ` +
                  `with URL ${url}:`, err, contact)
    } else {
      console.log(`Wrote URL to Contacts: ${url}`)
    }
  })
}

const writeIDsForAllFriends = () => {
  // Return an action thunk that is pure side-effects -- just iterate
  // over the entire set of contacts and make sure that any once-active friends
  // that don't have HelloAgain URLs associated with them get one. This
  // shouldn't really ever happen, because the `toggleActive` action takes care
  // of the records one-by-one, but I guess it can't hurt to be certain.
  return (_, getState) => {
    const state = getState()
    const friends = Object.values(state.friends).filter(f => f.isActive !== undefined)
    friends.forEach(item => writeIDtoNativeContact(item))
  }
}
