'use strict'

import React from 'react';
import { connect } from 'react-redux'
import FriendList from '../components/friend-list'
import Friend from '../components/friend'

const mapStateToProps = (state) => {
  // Collect active friends
  const friends = Object.values(state.friends).filter((f) => f.isActive)
  // Sort by queue rank
  friends.sort((a, b) => a.rank - b.rank)
  return {
    items: friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const FriendQueue = connect(mapStateToProps, mapDispatchToProps)(FriendList)
export default FriendQueue 
