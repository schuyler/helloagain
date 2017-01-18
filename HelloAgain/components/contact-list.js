'use strict';

import React, { Component } from 'react'
import {
  ListView,
  View,
  StyleSheet
} from 'react-native'

import Contact from './contact'

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderContact(rowData) {
    return (
      <Contact item={rowData} onPress={this.props.onContactPress} />
    )
  }

  render() {
    const separator = (sectionID, rowID) => {
      return <View key={sectionID + rowID} style={styles.contactSeparator} />
    }
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.items)}
        renderRow={
          this.props.renderRow ||
          this.renderContact.bind(this) }
        style={styles.contactList}
        enableEmptySections={true}
        renderSeparator={separator}
      />
    )
  }
}

const styles = StyleSheet.create({
  contactList: {
    flex: 1
  },
  contactSeparator: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    flex: 1
  }
})
