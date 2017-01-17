'use strict'

import {
  UPDATE_FRIEND,
  MARK_AS_CONTACTED
} from './types'

export const updateFriend = (friend) => {
  return { type: UPDATE_FRIEND, friend: friend }
}

export const markAsContacted = (friend) => {
  return { type: MARK_AS_CONTACTED, friend: friend }
}
