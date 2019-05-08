import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { themeVariables } from 'themes/themeVariables';
import NotificationItem from './components/NotificationItem';
import FlatList from 'components/base/FlatList';

class Notification extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerTitle: <HeaderSearchBar />
    };
  };

  renderItem = () => {
    return <NotificationItem />;
  };

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList data={[1, 2, 3]} renderItem={this.renderItem} keyExtractor={(item, index: number) => `${item}`}/>

      </View>
    );
  }
}

export default Notification;
