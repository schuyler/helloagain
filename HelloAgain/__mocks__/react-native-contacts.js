'use strict'

import {CONTACT_FIXTURE} from '../__tests__/fixtures/contacts'

export default {
  getAll: (fn) => fn(null, CONTACT_FIXTURE),
  updateContact: (contact, fn) => fn(null, contact)
}
