'use strict';

import { Model } from './store';

function modelEventHandler (model, eventName, item) {
  console.log(model, eventName, item);
}

// @FIXME: "Apple does not guarantee the recordID will not change,
// e.g. it may be reassigned during a phone migration." according to
// the rn-contacts README... we need an actually permanent ID
export let Friends = new Model('friends', 'recordID', modelEventHandler);
