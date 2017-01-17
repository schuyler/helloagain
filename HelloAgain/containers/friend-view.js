'use strict'

import { connect } from 'react-redux'
import { markAsContacted } from '../actions/friend'
import FriendDetail from '../components/friend-detail'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactedPress: item => dispatch(markAsContacted(item))
  }
}

const FriendView = connect(mapStateToProps, mapDispatchToProps)(FriendDetail)
export default FriendView
