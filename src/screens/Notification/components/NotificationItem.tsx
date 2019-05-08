import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';

class NotificationItem extends PureComponent {
  render() {
    return (
      <ListItem
        title={'KMS Technology posted 3 new jobs'}
        subtitle={<>
          <Text style={{ color: themeVariables.secondary_text_color }}>2 hours ago</Text>
        </>}
        leftAvatar={{
          title: 'A'
        }}
      />
    );
  }
}

export default NotificationItem;
