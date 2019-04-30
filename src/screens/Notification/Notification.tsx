import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';

class Notification extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerTitle: (
        <HeaderSearchBar />
      )
    };
  };



  render() {
    return (
      <View>
        <Text>Notification</Text>
      </View>
    );
  }
}

export default Notification;
