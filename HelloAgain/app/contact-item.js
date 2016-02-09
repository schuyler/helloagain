'use strict';

import React, {
  TouchableHighlight,
  View,
  Image,
  Text,
  PropTypes
} from 'react';

export const ContactEntry = ({ onClick, styles, contact }) => (
  <TouchableHighlight onPress={() => {onClick(contact)}}}>
    <View style={styles.contactRow}>
      <Image style={styles.contactPicture} source={
        contact.thumbnailPath ? {uri: contact.thumbnailPath} : {}} />
      <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
      <Text style={styles.contactSelected}>{contact.activity.isActive ? '✓' : ''}</Text>
    </View>
  </TouchableHighlight>
);

ContactEntry.propTypes = {
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired
}
