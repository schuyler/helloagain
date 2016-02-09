export const IMPORT_CONTACTS = 'IMPORT_CONTACTS';

export const UPDATE_FRIEND = 'UPDATE_FRIEND';

export const FRIEND_CONTACTED = 'FRIEND_CONTACTED';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export function importContacts(contactList) {
  return { type: IMPORT_CONTACTS, contactList };
}

export function updateFriend(friend) {
  return { type: UPDATE_FRIEND, friend };
}
