'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native'

export default class Friend extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const item = this.props.item;
    var imageSource = {};
    if (item.thumbnailPath) {
      imageSource.uri = item.thumbnailPath
    }
    // FIXME: showing the item rank is a placeholder -- replace later
    return (
      <TouchableHighlight>
        <View style={styles.contactRow}>
          <Image style={styles.contactPicture} source={imageSource} />
          <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
          <Text style={styles.contactRank}>{item.rank || "???"}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

// This really wants to be refactored somehow with the contact styles
const styles = StyleSheet.create({
  contactRow: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  contactName: {
    textAlign: 'left',
    fontSize: 20,
    flex: 15,
    marginBottom: 5
  },
  contactRank: {
    textAlign: 'right',
    marginRight: 5,
    fontSize: 15,
    flex: 1,
    marginBottom: 5
  }  
})
