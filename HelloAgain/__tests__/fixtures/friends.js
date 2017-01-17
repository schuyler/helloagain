"use strict";

import {CONTACT_FIXTURE} from "./contacts"

export const copyFriendsFixture = () => {
  const fixture = {}
  CONTACT_FIXTURE.forEach((item) => {fixture[item.recordID] = {...item}})
  return fixture
}

export const FRIENDS_FIXTURE = copyFriendsFixture()
