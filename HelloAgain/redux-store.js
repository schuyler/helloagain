'use strict';

import { createStore } from 'redux';
let ReactStore = require('react-native-simple-store');
let AddressBook = require('react-native-contacts');

export function updateState(state, action) {
  switch(action.type) {
    case 'updateModel':
      return updateModel(state, action);
  }
}

function updateModel(oldState, action) {
  let state = Object.assign({}, oldState);
  let newData = action.data;
  let id = newData.recordID;
  let existingData = state[action.model][id] || {};
  state[action.model][id] = Object.assign({}, existingData, newData);
  return state;
}

export function initializeState() {
  let friendLoad = ReactStore.get("friends");
  let contactLoad = new Promise((resolve, reject) => {
    AddressBook.getAll((err, contacts) => {
      if (err) {
        console.log("Reading addressbook failed:", err);
        reject(err);
        return;
      }
      let contactMap = {};
      for (let contact of contacts) {
        contactMap[contact.recordID] = contact;
      }
      resolve(contactMap);
    });
  });
  return Promise.all([friendLoad, contactLoad]).then((friends, contacts) => {
    return {friends: friends, contacts: contacts};
  });
}
