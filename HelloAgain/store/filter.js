'use strict'

import { createTransform } from 'redux-persist'

// onlyActivatedFriends allows us to scrub the friends state of contacts who
// have never been active friends, before we persist the redux store. This
// keeps us from pointlessly persisting the entire native contact database.

export const onlyActivatedFriends = createTransform((state, key) => {
  if (key !== 'friends') {
    return state
  }
  let filtered = {}
  Object.values(state)
    .filter(f => f.isActive !== undefined)
    .forEach((f) => {filtered[f.helloAgainID] = f})
  return filtered
})
