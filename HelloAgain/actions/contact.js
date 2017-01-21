'use strict'

import { TOGGLE_ACTIVE } from './types';
import { writeIDtoNativeContact } from './contact-import'

export const toggleActive = (friend) => {
  writeIDtoNativeContact(friend)
  return { type: TOGGLE_ACTIVE, friend: friend }
}
