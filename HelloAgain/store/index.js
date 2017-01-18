'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'
import { onlyActivatedFriends } from './filter'
import mainReducer from '../reducers'

const enhancers = compose(
  applyMiddleware(thunk),
  autoRehydrate()
)
const store = createStore(mainReducer, enhancers)

const config = {
  storage: AsyncStorage,
  transforms: [onlyActivatedFriends]
}
persistStore(store, config, () => {
  const state = store.getState()
  const friendCount = Object.values(state.friends).length
  console.log(`Loaded ${friendCount} friends from AsyncStorage`)
})

export default store
