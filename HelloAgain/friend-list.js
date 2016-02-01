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
    this._mounted = true;
    if (this.props.navigator) {
      this.props.navigator.navigationContext.addListener('willfocus', () => { this._willFocus() });
    }
    this.loadData();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _willFocus() {
    // loadData() calls setState(), which throws a warning if we're not mounted.
    if (this._mounted) this.loadData();
  }

  _alphaSort(a, b) {
    if (a.givenName == b.givenName) {
      return (a.familyName < b.familyName) ? -1 : 1;
    } else {
      return (a.givenName < b.givenName) ? -1 : 1;
    }
  }

  loadData() {
    return Friends.hasLoaded().then(() => {
      let friends = Friends.find({isSelected: true}).sort(this._alphaSort);
      this.setDataSource(friends);
    });
  }

  setDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
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

export const styles = StyleSheet.create({
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
