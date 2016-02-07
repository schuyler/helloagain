'use strict';

import React, {
  Component,
  Text,
  View,
  ListView,
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';
import { FriendList, styles } from './friend-list';

export class ContactPicker extends Component {
  constructor(props) {
    super(props);
  }

  toggleContact(contact, rowID) {
    contact.isSelected = !contact.isSelected;
    this.props.store.dispatch({
      action: "updateModel",
      model: "friend",
      data: contact
    });
  }

  render() {
    return (
      <FriendList
        store={this.props.store}
        model={"contacts"}
        onPress={(contact) => {this.toggleContact(contact)}} />
    );
  }
}

ContactPicker.propTypes = { state: PropTypes.object };
ContactPicker.defaultProps = { state: {} };
