'use strict';

import { combineReducers } from 'redux'
import friends from './friends'
import contactImport from './contact-import'

const mainReducer = combineReducers({
  friends,
  contactImport
})

export default mainReducer
