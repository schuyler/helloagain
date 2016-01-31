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
import { Friends } from './models';

export class HAFriendListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentWillMount() {
    this.loadData();
  }

  alphaSort(a, b) {
    if (a.givenName == b.givenName) {
      return (a.familyName < b.familyName) ? -1 : 1;
    } else {
      return (a.givenName < b.givenName) ? -1 : 1;
    }
  }

  loadData() {
    Friends.hasLoaded().then(() => {
      let friends = Friends.all().sort(this.alphaSort);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(friends)
      });
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
    return (
      <View style={styles.contactRow}>
        <Image style={styles.contactPicture} source={imageSource} />
        <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
        <Text style={styles.contactSelected}></Text>
      </View>
    );
  }
}

HAFriendListView.propTypes = { state: PropTypes.object };
HAFriendListView.defaultProps = { state: {} };

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
