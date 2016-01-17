'use strict';

import { CONTACT_FIXTURE } from './contact-fixture';
import React, {
  Component,
  Text,
  View,
  ListView,
  PropTypes,
  StyleSheet
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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(CONTACT_FIXTURE)
    });
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
    return (
      <View style={styles.contactRow}>
        <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
      </View>
    );
  }
}

HAContactPickerView.propTypes = { state: PropTypes.object };
HAContactPickerView.defaultProps = { state: {} };

const styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contactName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});


