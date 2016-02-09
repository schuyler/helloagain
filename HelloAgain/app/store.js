'use strict';

import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/reactNativeAsyncStorage';

// Import redux and all your reducers as usual
import { createStore, applyMiddleware } from 'redux';
const AddressBook = require('react-native-contacts');

import * as actions from './actions';
import { mainReducer } from './reducers';

// Now it's time to decide which storage engine should be used
// Note: The arguments to `createEngine` are different for every engine!
let engine = createEngine('helloagain');

// Use this decorator to write only part of your state tree to disk.
engine = storage.decorators.filter(engine, ['activity', 'settings']);

// This decorator will delay the expensive save operation for the given ms.
// Every new change to the state tree will reset the timeout!
engine = storage.decorators.debounce(engine, 1500);

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state afer
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!
const middleware = storage.createMiddleware(engine, [actions.IMPORT_CONTACTS]);

// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
const reducer = storage.reducer(mainReducer);

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
export const store = createStoreWithMiddleware(reducer);

// To load the previous state we create a loader function with our prepared
// engine. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(engine);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
load(store)
    .then(() => {
      // trigger the contact load and dispatch the import
      AddressBook.getAll((err, contactList) => {
        if (err) {
          console.log("Reading addressbook failed:", err);
          return;
        }
        store.dispatch(actions.importContacts(contactList));
      }) })
    .catch(() => console.log('Failed to load previous state'));
