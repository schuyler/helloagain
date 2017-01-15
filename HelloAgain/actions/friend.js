'use strict'

import {
  UPDATE_FRIEND
} from './types'

export const updateFriend = (friend) => {
  return { type: UPDATE_FRIEND, friend: friend }
}
