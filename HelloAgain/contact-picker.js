'use strict';

import { CONTACT_FIXTURE } from './contact-fixture';
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

export class HAContactPickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      contacts: []
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    var Contacts = require('react-native-contacts');
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log("permissionDenied on Contacts.getAll");
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(contacts),
          contacts: contacts
        });
      }
    })
  }

  toggleContact(rowID) {
    var contact = this.state.contacts[rowID];
    this.state.contacts = this.state.contacts.slice();
    this.state.contacts[rowID] = { givenName: contact.givenName, familyName: contact.familyName, isSelected: !contact.isSelected };
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.contacts)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderContact.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderContact(contact, _, rowID) {
    var imageSource = {};
    if (contact.thumbnailPath) {
      imageSource.uri = contact.thumbnailPath;
    }
    var toggleContact = this.toggleContact.bind(this, rowID);
    return (
      <TouchableHighlight onPress={toggleContact}>
        <View style={styles.contactRow}>
          <Image style={styles.contactPicture} source={imageSource} />
          <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
          <Text style={styles.contactSelected}>{contact.isSelected ? '✓' : ''}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

HAContactPickerView.propTypes = { state: PropTypes.object };
HAContactPickerView.defaultProps = { state: {} };

const styles = StyleSheet.create({
  contactPicture: {
    height: 48,
    width: 48,
    backgroundColor: '#F5FCFF',
    marginRight: 5,
  },
  listView: {
    paddingTop: 20,
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
  },
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
  contactSelected: {
    marginRight: 15,
    textAlign: 'right',
    fontSize: 25
  }  
});


