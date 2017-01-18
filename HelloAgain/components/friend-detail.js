'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native'
import Portrait from './portrait'
import moment from 'moment'

export default class FriendDetail extends Component {
  render() {
    const item = this.props.item;
    let contactedAt = item.contactedAt ? moment(item.contactedAt).format("LL") : "never"
    return (
        <View style={styles.friendDetail}>
          <Portrait uri={item.thumbnailPath} style={styles.friendPicture} />
          <Text style={styles.friendName}>{item.givenName} {item.familyName}</Text>
          <Text style={styles.friendContent}>Last contacted: {contactedAt}</Text>
          <Button 
            style={styles.contactedButton}
            onPress={_ => {
              this.props.onContactedPress(item)
              this.props.closeDetail()
            }}
            title="Contacted" />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  friendDetail: {
    // Extensive discussion here: https://github.com/facebook/react-native/issues/759
    // ... about how paddingTop: 64 is basically magic.
    paddingTop: 64,
    flexDirection: "column",
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    margin: 64
  },
  friendPicture: {
    height: 128,
    width: 128,
    padding: 32
  },
  friendName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  friendContent: {
    fontSize: 14,
    textAlign: "justify",
    flex: 1
  },
  contactedButton: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    color: 'white',
    fontWeight: 'bold'
  }
})
