'use strict'

import { connect } from 'react-redux'
import ContactList from '../components/contact-list'
import { toggleActive } from '../actions/contact'

const mapStateToProps = (state) => {
  const contacts = Object.values(state.friends)
  contacts.sort((a, b) => {
    if (a.givenName == b.givenName) {
      return (a.familyName < b.familyName) ? -1 : 1;
    } else {
      return (a.givenName < b.givenName) ? -1 : 1;
    }
  })
  return {
    items: contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactPress: (item) => { dispatch(toggleActive(item)) }
  }
}

const ContactPicker = connect(mapStateToProps, mapDispatchToProps)(ContactList)
export default ContactPicker 
