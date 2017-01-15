'use strict';

import { combineReducers } from 'redux'
import friends from './friends'

const mainReducer = combineReducers({
  friends
})

export default mainReducer
