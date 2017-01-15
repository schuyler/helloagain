'use strict';

import { UPDATE_FRIEND } from '../actions';

const RECORD_ID = "recordID";

const findFriendIndex = (state, friend) => {
  return state.findIndex((f) => {
    return f[RECORD_ID] == friend[RECORD_ID]
  })
}

const friends = (state = [], action) => {
  switch (action.type) {
    case UPDATE_FRIEND:
      let newFriend = {}
      // If the friend is already in the store, then copy the existing record.
      let existing = findFriendIndex(state, action.friend)
      if (existing > -1) {
        Object.assign(newFriend, state[existing])
      }
      // Merge in the new record.
      Object.assign(newFriend, action.friend)
      // Copy the existing state and replace or add the updated friend.
      let newState = [...state]
      if (existing > -1) {
        newState[existing] = newFriend
      } else {
        newState.unshift(newFriend)
      }
      return newState
    default:
      return state
  }
}

export default friends
