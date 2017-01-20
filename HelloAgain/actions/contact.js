'use strict'

import { TOGGLE_ACTIVE } from './types';
import { writeIDtoNativeContact } from './contact-import'

export const toggleActive = (friend) => {
  // The `toggleActive` action returns a thunk that:
  //   a) dispatches a TOGGLE_ACTIVE action to update the friend store
  //   b) ensures that the HelloAgain ID is persisted in the contacts store in
  //      the form of a deep link
  return dispatch => {
    dispatch({ type: TOGGLE_ACTIVE, friend: friend })
    writeIDtoNativeContact(friend)
  }
}
