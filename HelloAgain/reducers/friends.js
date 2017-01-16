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

const queueTail = (state) => {
  const ranks = Object.values(state).map((f) => {
    return f.rank || 0
  })
  return Math.max(0, ...ranks)
}

const defaultValues = (state) => {
  return {
    rank: queueTail(state) + 1,
    isActive: false
  }
}

const updateFriend = (state, update, useDefaults) => {
  let id = _id(update)
  let defaults = useDefaults ? defaultValues(state) : undefined
  let newFriend = {...defaults, ...state[id], ...update}
  return {...state, [id]: newFriend}
}

const friends = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      let existingFriend = findFriend(state, action.friend)
      let isActive = (existingFriend ? existingFriend.isActive : false)
      let update = {...action.friend, isActive: !isActive}
      // Set default values (if needed) when toggling a friend
      return updateFriend(state, update, true)
    case UPDATE_FRIEND:
      return updateFriend(state, action.friend)
    default:
      return state
  }
}

export default friends
