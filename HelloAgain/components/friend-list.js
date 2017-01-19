'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import ContactList from './contact-list'
import Friend from './friend'

export default class FriendList extends ContactList {
  renderContact(rowData) {
    return (
      <Friend item={rowData} onPress={this.props.onContactPress}/>
    )
  }

  render() {
    if (this.props.items && this.props.items.length > 0) {
      // See note about paddingTop below... I have _no_ idea why this is
      // necessary here but not in ContactPicker -> ContactList.
      return (
        <View style={{paddingTop: 64, flex: 1}}>
          {super.render()}
        </View>
      )
    }
    return (
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeHeader}>
          Welcome!
        </Text>
        <Text style={styles.welcomeContent}>
          Tap the icon in the upper right to start adding friends from your contacts.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcomeView: {
    // Extensive discussion here: https://github.com/facebook/react-native/issues/759
    // ... about how paddingTop: 64 is basically magic.
    paddingTop: 64,
    flexDirection: "column",
    flex: 1,
    alignSelf: 'center',
    width: 200,
    margin: 64
  },
  welcomeHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  welcomeContent: {
    fontSize: 14,
    textAlign: "justify",
    flex: 5
  }
})
