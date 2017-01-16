import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NavigatorIOS } from 'react-native';

import store from '../store'
import ContactPicker from './contact-picker'

export default class HelloAgain extends Component {
  constructor(props) {
    super(props)
  }

  /*
   * stashing this here for future use:
   *
   pickContacts() {
      const nav = this.refs.nav;
      nav.push({
        title: "Add Friends",
        component: ContactPicker,
        rightButtonTitle: null,
        leftButtonTitle: "Back",
        onLeftButtonPress: () => { nav.pop() }
      })
    }
  */

  render() {
    const initialRoute = {
      title: "Hello Again!",
      component: ContactPicker
    }
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref="nav"
          style={{flex: 1}}
          initialRoute={initialRoute}
          rightButtonTitle="👥"
          leftButtonTitle="⚙"
          /* onRightButtonPress={this.pickContacts} */
        />
      </Provider>
    );
  }
}
