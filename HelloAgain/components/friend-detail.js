'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button
} from 'react-native'

export default class FriendDetail extends Component {
  render() {
    const item = this.props.item;
    var imageSource = {};
    if (item.thumbnailPath) {
      imageSource.uri = item.thumbnailPath
    }
    return (
        <View style={styles.friendDetail}>
          <Image style={styles.friendPicture} source={imageSource} />
          <Text style={styles.friendName}>{item.givenName} {item.familyName}</Text>
          <Text style={styles.friendContent}>Last contacted: {item.lastContactedAt || "unknown"}</Text>
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
    width: 200,
    margin: 64
  },
  friendPicture: {
    height: 128,
    width: 128,
    margin: 32,
    borderWidth: 1,
    borderColor: "grey",
    flex: 1
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
    flex: 1
  }
})
