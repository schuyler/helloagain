import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { ContactPicker } from './contact-picker';

export class HelloAgain extends Component {
  render() {
    return (
      <Provider store={store}>
        <ContactPicker />
      </Provider>
    );
  }
}
