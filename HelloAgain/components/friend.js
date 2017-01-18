'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import Portrait from './portrait'
import shared from './shared'

export default class Friend extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const item = this.props.item;
    // FIXME: showing the item rank is a placeholder -- replace later
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <View style={styles.contactRow}>
          <Portrait uri={item.thumbnailPath} style={styles.contactPicture} />
          <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
          <Text style={styles.contactRank}>{item.rank || "???"}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

// This really wants to be refactored somehow with the contact styles
const styles = StyleSheet.create({
  contactRow: shared.row,
  contactPicture: shared.rowPicture,
  contactName: shared.rowName,
  contactRank: {
    ...shared.rowProps,
    fontSize: shared.rowProps.fontSize - 10,
    color: "grey"
  }  
})
