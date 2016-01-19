'use strict';

import { CONTACT_FIXTURE } from './contact-fixture';
import React, {
  Component,
  Text,
  View,
  ListView,
  PropTypes,
  StyleSheet,
  Image
} from 'react-native';

export class HAContactPickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.recordID != row2.recordID,
      })
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    var Contacts = require('react-native-contacts');
    console.log("MODULE=", Contacts);
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log("permissionDenied on Contacts.getAll");
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(contacts)
        });
      }
    })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderContact}
        style={styles.listView}
      />
    );
  }

  renderContact(contact) {
    var imageSource = {};
    if (contact.thumbnailPath) {
      imageSource.uri = contact.thumbnailPath;
    }
    return (
      <View style={styles.contactRow}>
        <Image style={styles.contactPicture} source={imageSource} />
        <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
      </View>
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
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  contactName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});


