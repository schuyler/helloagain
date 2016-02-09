export const IMPORT_CONTACTS = 'IMPORT_CONTACTS';

export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const FRIEND_CONTACTED = 'FRIEND_CONTACTED';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export function importContacts(contactList) {
  return { type: IMPORT_CONTACTS, contactList };
}

export function updateActivity(activity) {
  return { type: UPDATE_ACTIVITY, activity };
}
