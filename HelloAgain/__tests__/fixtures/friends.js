"use strict";

import {CONTACT_FIXTURE} from "./contacts"

const FRIENDS_FIXTURE = {}
CONTACT_FIXTURE.forEach((item) => {FRIENDS_FIXTURE[item.recordID] = item})

export default FRIENDS_FIXTURE
