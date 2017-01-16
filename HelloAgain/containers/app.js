import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NavigatorIOS } from 'react-native';

import store from '../store'
import ContactPicker from './contact-picker'
import FriendQueue from './friend-queue'

export default class HelloAgain extends Component {
  constructor(props) {
    super(props)
  }

  pickContacts() {
    const nav = this.refs.nav;
    nav.push({
      title: "Add Friends",
      component: ContactPicker,
      rightButtonTitle: null,
      leftButtonTitle: "⬅️",
      onLeftButtonPress: () => { nav.pop() }
    })
  }

  render() {
    const initialRoute = {
      title: "Hello Again!",
      component: FriendQueue
    }
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref="nav"
          style={{flex: 1}}
          initialRoute={initialRoute}
          rightButtonTitle="👥"
          leftButtonTitle="⚙"
          onRightButtonPress={this.pickContacts.bind(this)}
        />
      </Provider>
    );
  }
}
