'use strict';

import { Friends } from './models';
let AddressBook = require('react-native-contacts');

export function loadAllContacts() {
    // Load all the contacts from the system addressbook, and within that list,
    // substitute any contacts we already have in our database (and merging any
    // changes from the addressbook). We have to wait until the Contacts model
    // has loaded fully. Returns a Promise that is resolved when everything is
    // loaded.
    return new Promise((resolve, reject) => {
      Friends.hasLoaded.then(() => {
        AddressBook.getAll((err, contacts) => {
          if (err) {
            console.log("Reading addressbook failed:", err);
            reject(err);
            return;
          }
          // Update contacts from the addressbook with whatever we have stored in
          // our database.
          for (var i = 0; i < contacts.length; i++) {
            var storedContact = Friends.load(contacts[i].recordID);
            if (storedContact) {
              Object.assign(storedContact, contacts[i]);
              if (storedContact.isSelected) { // only write back changes to selected contacts
                Friends.save(storedContact);
              }
              contacts[i] = storedContact;
            }
          }
          resolve(contacts);
        });
      });
    });
};
