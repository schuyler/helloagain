'use strict';

// Enumerate the dispatchable actions.
export const UPDATE_FRIEND = 'UPDATE_FRIEND'

// Helpers for dispatching actions.
export const updateFriend = (friend) => {
  return { type: UPDATE_FRIEND, friend: friend }
}
