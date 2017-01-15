'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native'

export default class Contact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var imageSource = {};
    if (this.props.thumbnailPath) {
      imageSource.uri = this.props.thumbnailPath
    }
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props)}>
        <View style={styles.contactRow}>
          <Image style={styles.contactPicture} source={imageSource} />
          <Text style={styles.contactName}>{this.props.givenName} {this.props.familyName}</Text>
          <Text style={styles.contactActive}>{this.props.isActive ? '✓' : ''}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  contactRow: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  contactName: {
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 20,
    flex: 5
  },
  contactActive: {
    marginRight: 15,
    textAlign: 'right',
    fontSize: 25
  }  
})
