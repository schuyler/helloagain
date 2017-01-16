import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import ContactPicker from './contact-picker'

export default class HelloAgain extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <ContactPicker />
      </Provider>
    )
  }
}
