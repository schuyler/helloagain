'use strict';

import { connect } from 'react-redux';
import { updateActivity } from './actions';
import { ContactList } from './contact-list';

const mapStateToProps = ({contacts}) => ({contacts});

const mapDispatchToProps = (dispatch) => {
  return {
    onContactClick: (contact) => {
      dispatch(updateActivity({isActive: !contact.activity.isActive}));
    }
  }
}

export const ContactPicker = connect(mapStateToProps, mapDispatchToProps)(ContactList);
