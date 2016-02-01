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
import { HAFriendListView, styles } from './friend-list';

export class HAContactPickerView extends HAFriendListView {
  constructor(props) {
    super(props);
    this.contacts = [];
  }

  loadData() {
    loadAllContacts().then((contacts) => {
      this.contacts = contacts;
      this.setDataSource(contacts);
    });
  }

  toggleContact(rowID) {
    let contact = this.contacts[rowID];
    contact.isSelected = !contact.isSelected;
    Friends.save(contact);
    this.contacts = this.contacts.slice();
    this.contacts[rowID] = Object.assign({}, contact);
    this.setDataSource(this.contacts);
  }

  renderContact(contact, _, rowID) {
    var imageSource = {};
    if (contact.thumbnailPath) {
      imageSource.uri = contact.thumbnailPath;
    }
    var toggleContact = this.toggleContact.bind(this, rowID);
    return (
      <TouchableHighlight onPress={toggleContact}>
        <View style={styles.contactRow}>
          <Image style={styles.contactPicture} source={imageSource} />
          <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
          <Text style={styles.contactSelected}>{contact.isSelected ? '✓' : ''}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

HAContactPickerView.propTypes = { state: PropTypes.object };
HAContactPickerView.defaultProps = { state: {} };
