'use strict'

import { copyFriendsFixture } from "../fixtures/friends"
import { onlyActivatedFriends } from "../../store/filter"

it('returns a function that filters all but activated friends', () => {
  const fixture = copyFriendsFixture()
  Object.values(fixture)[0].isActive = true
  const filtered = onlyActivatedFriends.in(fixture, "friends")
  expect(Object.keys(filtered).length).toEqual(1)
})
