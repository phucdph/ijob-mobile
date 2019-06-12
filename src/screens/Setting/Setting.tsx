import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { ListItem } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
import { Divider } from 'react-native-elements';
import { IUser } from '../Profile/services/typings';
import Authorize from 'components/base/Authorize';

interface IProps {
  profile: IUser;
  onSignOut: () => void;
}

class Setting extends Component<IProps> {
  static navigationOptions = () => {
    return {
      headerTitle: <HeaderSearchBar />
    };
  };

  getMenuItems = () => {
    return [
      {
        title: 'Setting',
        icon: 'ios-settings',
        onPress: this.handleSettingPress
      },
      {
        title: 'Logout',
        icon: 'ios-log-out',
        onPress: this.handleLogoutPress
      }
    ];
  };

  handleProfilePress = () => {
    const { profile = {} as IUser } = this.props;
    const { firstName = '', lastName = '' } = profile;
    navigationService.navigate({
      routeName: 'ProfileTab',
      params: {
        placeholder: `${firstName} ${lastName}`
      }
    });
  };

  handleLogoutPress = () => {
    this.props.onSignOut();
  };

  handleSettingPress = () => {
    console.log('setting');
  };

  renderProfileItem = () => {
    const { profile = {} as IUser } = this.props;
    const { firstName = '', lastName = '', avatar } = profile;
    return (
      <Authorize>
        <ListItem
          leftAvatar={{
            source: { uri: avatar ? avatar : undefined },
            title: firstName[0]
          }}
          title={`${firstName} ${lastName}`}
          titleStyle={{ fontWeight: 'bold' }}
          subtitle={'View Profile'}
          onPress={this.handleProfilePress}
        />
      </Authorize>
    );
  };

  renderMenuItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <ListItem
        title={item.title}
        key={index}
        leftIcon={{
          name: item.icon,
          type: 'ionicon',
          size: 30,
          color: themeVariables.primary_color,
          containerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 30
          }
        }}
        onPress={item.onPress}
      />
    );
  };

  renderMenuItems = () => {
    const menuItems = this.getMenuItems();
    return (
      <FlatList
        data={menuItems}
        renderItem={this.renderMenuItem}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item: any, index: number) => `${item.title}-${index}`}
        scrollEnabled={false}
      />
    );
  };

  render() {
    return (
      <ScrollView>
        {this.renderProfileItem()}
        <Divider />
        {this.renderMenuItems()}
      </ScrollView>
    );
  }
}

export default Setting;
