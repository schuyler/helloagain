/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  NavigatorIOS,
  AlertIOS
} from 'react-native';
import { ContactPicker } from './contact-picker';
import { FriendList } from './friend-list';

class HelloAgain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let initialRoute = {
      title: "Hello Again!",
      component: FriendList
    };

    let toContactPicker = () => {
      let nav = this.refs.nav;
      nav.push({
        title: "Add Friends", 
        component: ContactPicker, 
        rightButtonTitle: null,
        leftButtonTitle: "Back",
        onLeftButtonPress: () => { nav.pop() }
      })
    };

    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={initialRoute}
        rightButtonTitle="Contacts"
        leftButtonTitle="Settings"
        onRightButtonPress={toContactPicker}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

AppRegistry.registerComponent('HelloAgain', () => HelloAgain);
