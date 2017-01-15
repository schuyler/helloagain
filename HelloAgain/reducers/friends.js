'use strict';

import { 
  UPDATE_FRIEND,
  TOGGLE_ACTIVE
} from '../actions/types';

const _id = (friend) => {
  return friend.recordID
}

const findFriend = (state, friend) => {
  return state[_id(friend)] 
}

const updateFriend = (state, update) => {
  let id = _id(update)
  let newFriend = {...state[id], ...update}
  return {...state, [id]: newFriend}
}

const friends = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      let existingFriend = findFriend(state, action.friend)
      let isActive = (existingFriend ? existingFriend.isActive : false)
      return updateFriend(state, {...action.friend, isActive: !isActive})
    case UPDATE_FRIEND:
      return updateFriend(state, action.friend)
    default:
      return state
  }
}

export default friends
