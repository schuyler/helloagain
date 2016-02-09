'use strict';

import { ListView } from 'react';
import { connect } from 'react-redux';
import { updateActivity } from './actions';
import { ContactList } from './contact-list';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({contacts}) => {
  const contactList = Object.values(contacts).sort((a, b) => {
    if (a.givenName == b.givenName) {
      return (a.familyName < b.familyName) ? -1 : 1;
    } else {
      return (a.givenName < b.givenName) ? -1 : 1;
    }
  });
  return {
    dataSource: dataSource.cloneWithRows(contactList),
    contacts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactClick: (contact) => {
      const newActivity = {...contact.activity, isActive: !contact.activity.isActive};
      dispatch(updateActivity(newActivity));
    }
  }
}

export const ContactPicker = connect(mapStateToProps, mapDispatchToProps)(ContactList);
