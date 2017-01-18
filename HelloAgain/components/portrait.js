'use strict'

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

export default class Portrait extends Component {
  render() {
    if (this.props.uri) {
      let imageSource = {uri: this.props.uri}
      return (
        <View style={{flex:1}}>
          <Image {...this.props} source={imageSource} />
        </View>
      )
    } else {
      let imageSource = require('../assets/epic.png')
      return (
        <View style={{flex:1}}>
          <Image {...this.props} source={imageSource} />
        </View>
      )
      /* This is probably more sensible:
      return (
        <View {...this.props}>
          <Text style={{fontSize: 32}}>👤</Text>
        </View>
      )
      */
    }
  }
}
