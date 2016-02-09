import * as type from './actions';

function getRecordID(contact) {
  return contact.recordID;
}

function importContactList(state, contactList) {
  let newContacts = {...state.contacts};
  for (let contact of contactList) {
    const id = getRecordID(contact);
    newContacts[id] = {...state.friends[id], ...state.contacts[id], ...contact};
  }
  return {...state, contacts: newContacts};
}

function mergeRecord(table, record) {
  const id = getRecordID(record);
  return {...table, [id]: {...table[id], ...record}};
}

export function contacts(state = {}, action) {
  switch (action.type) {
    case type.IMPORT_CONTACTS:
      return importContactList(state, action.contactList);
    case type.UPDATE_FRIEND:
      return mergeRecord(state, action.friend);
    default:
      return state;
  }
}

export function friends(state = {}, action) {
  switch (action.type) {
    case type.UPDATE_FRIEND:
      return mergeRecord(state, action.friend);
    default:
      return state;
  }
}
