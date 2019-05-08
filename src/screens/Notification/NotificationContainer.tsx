import Notification from './Notification';
import React, { Component } from 'react';

class NotificationContainer extends Component {
  static navigationOptions = Notification.navigationOptions;


  render() {
    return (
      <Notification/>
    );
  }
}

export default NotificationContainer;
