'use strict';

import { ADD_FRIEND } from '../actions';

const RECORD_ID = "recordID";

const friends = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIEND:
      let id = action.friend.recordID;
      let newFriend = { ...state[id], ...action.friend };
      return { ...state, [id]: newFriend };
    default:
      return state;
  }
}

export default friends
