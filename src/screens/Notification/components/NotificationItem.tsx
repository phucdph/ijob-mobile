import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import moment from 'moment';
import { INotification } from '../services/typings';
import Avatar from 'components/base/Avatar';
import navigationService from 'services/navigationService';

interface IProps {
  data: INotification;
}

class NotificationItem extends PureComponent<IProps> {
  handleNotificationPress = () => {
    const {
      job: { id }
    } = this.props.data || ({} as INotification);
    navigationService.push({
      routeName: 'FeedDetail',
      params: { id }
    })
  };

  render() {
    const { created_at, company, job } =
      this.props.data || ({} as INotification);
    return (
      <ListItem
        onPress={this.handleNotificationPress}
        title={
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>{company.name}</Text> has
            posted a job: {job.name}
          </Text>
        }
        subtitle={
          <>
            <Text style={{ color: themeVariables.secondary_text_color }}>
              {' '}
              {moment(created_at).toNow(true)}
            </Text>
          </>
        }
        leftElement={<Avatar source={{ uri: company.avatar }} />}
      />
    );
  }
}

export default NotificationItem;
