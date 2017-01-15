'use strict';

import { 
  UPDATE_FRIEND
} from '../actions/types';

const _id = (friend) => {
  return friend.recordID
}

const updateFriend = (state, update) => {
  let id = _id(update)
  let newFriend = {...state[id], ...update}
  return {...state, [id]: newFriend}
}

const friends = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FRIEND:
      return updateFriend(state, action.friend)
    default:
      return state
  }
}

export default friends
