'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Portrait from './portrait'
import shared from './shared'

export default class Contact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <View style={styles.contactRow}>
          <Portrait uri={item.thumbnailPath} style={styles.contactPicture} />
          <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
          <Text style={item.isActive ? styles.contactActive : styles.contactInactive}>★</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  contactRow: shared.row,
  contactPicture: shared.rowPicture,
  contactName: shared.rowName,
  contactInactive: {
    ...shared.rowProps,
    color: 'lightgrey'
  },
  contactActive: {
    ...shared.rowProps,
    color: 'dodgerblue'
  }
})

