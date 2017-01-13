'use strict';

// Enumerate the dispatchable actions.
export const ADD_FRIEND = 'ADD_FRIEND';

// Helpers for dispatching actions.
export const addFriend = (friend) => {
  return { type: ADD_FRIEND, friend: friend };
}
