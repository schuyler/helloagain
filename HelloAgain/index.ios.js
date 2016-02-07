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
import { createStore } from 'redux';
import { updateState, initializeState } from './redux-models';

class HelloAgain extends Component {
  constructor(props) {
    super(props);
    this.store = {};
  }

  componentWillMount() {
    initializeState().then((initialState) => {
      this.store = createStore(updateState, initialState);
    });
  }

  render() {
    let initialRoute = {
      title: "Hello Again!",
      component: FriendList,
      passProps: {store: this.store}
    };

    let toContactPicker = () => {
      let nav = this.refs.nav;
      nav.push({
        title: "Add Friends", 
        component: ContactPicker, 
        rightButtonTitle: null,
        leftButtonTitle: "Back",
        onLeftButtonPress: () => { nav.pop() },
        passProps: {store: this.store}
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
