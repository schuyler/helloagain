'use strict';

import * as type from './actions';

const RECORD_ID = "recordID";

// Helper for finding the contact / activity record ID. TODO: change this
// eventually, because recordIDs are documented not to be persistent when
// moving an addressbook to another device.
function getRecordID(contact) {
  return contact[RECORD_ID];
}

// Handler for importing a list of contacts from the addressbook, merging them
// into the existing contacts state. Also creates a reference to the contact's
// activity object. An empty object is used as a default that looking up
// activity properties on a contact that doesn't have any returns undefined,
// rather than raising an error.
function importContactList(state, contactList) {
  let newContacts = {...state.contacts};
  for (let contact of contactList) {
    const id = getRecordID(contact);
    const activity = state.activity[id] || {};
    newContacts[id] = {...state.contacts[id], ...contact, activity};
  }
  return {...state, contacts: newContacts};
}

// Helper for merging a contact or activity into an existing map.
function mergeRecord(table, record) {
  const id = getRecordID(record);
  return {...table, [id]: {...table[id], ...record}};
}

// Handler for any state changes to activity. Updates the activity table and
// stashes a reference to the activity with the corresponding contact object.
//
// The contact and activity states are kept separate so that we can persist
// activity without having to keep a copy of the entire addressbook in our
// persistent store.
function updateActivity(state, record) {
  const id = getRecordID(record);
  const activity = mergeRecord(state.activity, record);
  const contacts = mergeRecord(state.contacts, {[RECORD_ID]: id, activity: activity[id]});
  return {...state, contacts, activity};
}

// The main reducer. We're not using Redux's built-in reducer composition
// because the handlers need visibility into both the contact and activity
// state tables.
const defaultState = {
  contacts: {},
  activity: {},
  settings: {}
};
export function mainReducer(state = defaultState, action) {
  switch (action.type) {
    case type.IMPORT_CONTACTS:
      return importContactList(state, action.contactList);
    case type.UPDATE_ACTIVITY:
      return updateActivity(state, action.activity);
    default:
      return state;
  }
}
