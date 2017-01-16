'use strict';

import { createStore } from 'redux'
import mainReducer from './reducers'

// Purely for testing new components. Will be removed later.
import initialState from './store-scaffold'

const store = createStore(mainReducer, initialState)

export default store
