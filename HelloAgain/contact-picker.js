'use strict';

import React, {
  Component,
  Text,
  View,
  ListView,
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';
import { loadAllContacts } from './contacts';
import { Friends } from './models';
import { FriendList, styles } from './friend-list';

export class ContactPicker extends Component {
  constructor(props) {
    super(props);
    this.contacts = [];
  }

  loadData() {
    return loadAllContacts().then((contacts) => {
      this.contacts = contacts;
      return contacts;
    });
  }

  toggleContact(rowID) {
    let contact = this.contacts[rowID];
    contact.isSelected = !contact.isSelected;
    Friends.save(contact);
    this.contacts = this.contacts.slice();
    this.contacts[rowID] = Object.assign({}, contact);
    this.refs.friends.setDataSource(this.contacts);
  }

  render() {
    return (
      <FriendList
        ref="friends"
        dataSource={() => {return this.loadData()}}
        onPress={(_, rowID) => {this.toggleContact(rowID)}} />
    );
  }
}

ContactPicker.propTypes = { state: PropTypes.object };
ContactPicker.defaultProps = { state: {} };
