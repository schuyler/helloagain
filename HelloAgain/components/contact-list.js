'use strict';

import React, { Component } from 'react'
import {
  ListView,
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
      <Contact {...rowData} onPress={this.props.onContactPress} />
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.items)}
        renderRow={
          this.props.renderRow ||
          this.renderContact.bind(this) }
        style={styles.contactList}
      />
    )
  }
}

const styles = StyleSheet.create({
  contactList: {
    paddingTop: 20,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  }
})
