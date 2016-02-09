'use strict';

// Enumerate the dispatchable actions.
//
// Called once, when importing contacts from the address book at load time.
export const IMPORT_CONTACTS = 'IMPORT_CONTACTS';

// Called whenever a user modifies a contact activity state.
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

// Special action to register a contact event and re-queue the contact object.
export const FRIEND_CONTACTED = 'FRIEND_CONTACTED';

// Called whenever the user modifies a global app setting.
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

// Helpers for dispatching actions.

export function importContacts(contactList) {
  return { type: IMPORT_CONTACTS, contactList };
}

export function updateActivity(activity) {
  return { type: UPDATE_ACTIVITY, activity };
}
