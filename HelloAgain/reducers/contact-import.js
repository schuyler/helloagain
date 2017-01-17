'use strict'

import {
  CONTACTS_LOADED, CONTACT_LOAD_FAILED
} from '../actions/types';

const contactImport = (state = {}, action) => {
  switch (action.type) {
    case CONTACTS_LOADED:
      return {...state, count: action.contacts.length, loaded: true}
    case CONTACT_LOAD_FAILED:
      return {...state, error: action.error, loaded: false}
    default:
      return state
  }
}

export default contactImport
