'use strict'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContactList from '../components/contact-list'
import { toggleActive } from '../actions/contact'

const mapStateToProps = (state) => {
  return {
    items: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactPress: (item) => { dispatch(toggleActive(item)) }
  }
  // return bindActionCreators(ContactActions, dispatch)
}

const ContactPicker = connect(mapStateToProps, mapDispatchToProps)(ContactList)
export default ContactPicker 
