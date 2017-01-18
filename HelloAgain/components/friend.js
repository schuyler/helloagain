'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import Duration from 'durationjs'
import Portrait from './portrait'
import shared from './shared'

export default class Friend extends Component {
  constructor(props) {
    super(props)
  }

  formatDurationSince(then) {
    if (!then) {
      return "never"
    }
    let ago = true ? " ago" : ""
    let delta = Date.now() - then
    let age = new Duration(delta / 1000)
    if (age.inMonths() >= 1) {
      return Math.floor(age.inMonths()) + "m" + ago
    } else if (age.inWeeks() >= 1) {
      return Math.floor(age.inWeeks()) + "w" + ago
    } else if (age.inDays() >= 1) {
      return Math.floor(age.inDays()) + "d" + ago
    } else if (age.inHours() >= 1) {
      return Math.floor(age.inHours()) + "h" + ago
    } else if (age.inMinutes() >= 1) {
      return Math.floor(age.inMinutes()) + "m" + ago
    } else {
      return "just now"
    }
  }

  render() {
    const item = this.props.item;
    let sinceLastContact = this.formatDurationSince(item.contactedAt)
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <View style={styles.contactRow}>
          <Portrait uri={item.thumbnailPath} style={styles.contactPicture} />
          <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
          <Text style={styles.contactLatency}>{sinceLastContact}</Text>
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
  contactLatency: {
    ...shared.rowProps,
    fontSize: shared.rowProps.fontSize - 10,
    color: "grey"
  }  
})
