'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './reducers'

// Purely for testing new components. Will be removed later.
// import initialState from './store-scaffold'

const store = createStore(mainReducer, applyMiddleware(thunk))

export default store
