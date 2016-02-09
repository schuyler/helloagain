'use strict';

import React, { ListView, PropTypes } from 'react-native';
import { ContactEntry } from './contact-entry';

export const ContactList = ({ onContactClick, styles, contacts }) => (
  <ListView
    style={styles.listView}
    renderRow={(contact) => (
      <ContactItem key={contact.recordID} onClick={onContactClick} styles={styles} contact={contact} />
    )}
  />
);

ContactList.propTypes = {
  onEntryClick: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired
};
