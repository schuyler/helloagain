'use strict';

import * as type from './actions';

function getRecordID(contact) {
  return contact.recordID;
}

function importContactList(state, contactList) {
  let newContacts = {...state.contacts};
  for (let contact of contactList) {
    const id = getRecordID(contact);
    const activity = state.activity[id];
    newContacts[id] = {...state.contacts[id], ...contact, activity};
  }
  return {...state, contacts: newContacts};
}

function mergeRecord(table, record) {
  const id = getRecordID(record);
  return {...table, [id]: {...table[id], ...record}};
}

function updateActivity(state, activity) {
  return {...state,
    contacts: mergeRecord(state.contacts, {activity}),
    activity: mergeRecord(state.activity, activity)
  };
}

export function mainReducer(state = {}, action) {
  switch (action.type) {
    case type.IMPORT_CONTACTS:
      return importContactList(state, action.contactList);
    case type.UPDATE_ACTIVITY:
      return updateActivity(state, action.activity);
    default:
      return state;
  }
}
