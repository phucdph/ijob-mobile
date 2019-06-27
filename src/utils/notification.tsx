import { Constants, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { INotification } from 'services/typings';
import MessageBarManager from 'components/MessageBarManager';
import { themeVariables } from 'themes/themeVariables';
import React from 'react';
import { Text } from 'react-native';
import navigationService from 'services/navigationService';
import { get } from 'lodash';

export async function registerForPushNotificationsAsync(): Promise<string> {
  try {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return '';
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    return token;
  } catch (e) {
    return '';
  }
}

const handleNotificationPress = (id: string) => {
  navigationService.push({
    routeName: 'FeedDetail',
    params: { id }
  });
};

export const handleNotification = (notification: INotification) => {
  const { origin } = notification;
  const jobId = get(notification, 'data.job.id');
  const jobName = get(notification, 'data.job.name', '');
  const company = get(notification, 'data.job.company', {}) || ({} as any);
  const { avatar, name: companyName } = company;
  switch (origin) {
    case 'received': {
      MessageBarManager.alert({
        message: (
          <Text>
            <Text style={{ fontWeight: 'bold' }}>{companyName}</Text> has posted
            a new job: {jobName}
          </Text>
        ),
        avatar,
        alertType: 'info',
        stylesheetInfo: {
          backgroundColor: 'white',
          strokeColor: themeVariables.fill_base_color
        } as any,
        messageStyle: {
          color: themeVariables.primary_text_color,
          fontSize: 16
        },
        titleStyle: {
          color: themeVariables.primary_text_color,
          fontSize: 16,
          fontWeight: 'bold'
        },
        viewTopInset: Constants.statusBarHeight,
        onTapped: () => handleNotificationPress(jobId)
      });
      break;
    }
    case 'selected': {
      navigationService.push({
        routeName: 'FeedDetail',
        params:{
          id: jobId
        }
      });
      break;
    }
    default: {
      break;
    }
  }
};
