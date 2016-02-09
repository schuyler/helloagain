'use strict';

import { connect } from 'react-redux';
import { updateActivity } from './actions';
import { ContactList } from './contact-list';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({contacts}) => {
  return {
    dataSource: dataSource.cloneWithRows(contacts),
    contacts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContactClick: (contact) => {
      dispatch(updateActivity({isActive: !contact.activity.isActive}));
    }
  }
}

export const ContactPicker = connect(mapStateToProps, mapDispatchToProps)(ContactList);
