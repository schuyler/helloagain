"use strict";

import {CONTACT_FIXTURE} from "./contacts"
import {generateHelloAgainID} from "../../reducers/friends"

export const copyFriendsFixture = () => {
  const fixture = {}
  CONTACT_FIXTURE.forEach((item) => {
    let id = generateHelloAgainID(item)
    fixture[id] = {helloAgainID: id, ...item}
  })
  return fixture
}

export const FRIENDS_FIXTURE = copyFriendsFixture()
