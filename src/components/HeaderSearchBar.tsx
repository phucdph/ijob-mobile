import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationService from 'services/navigationService';
import { NavigationActions } from 'react-navigation';
import HeaderBackButton from 'components/HeaderBackButton';

interface IProps {
  placeholder?: string;
  backButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

class HeaderSearchBar extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    placeholder: 'Search',
    backButton: false
  };

  handleSearchBarPress = () => {
    navigationService.dispatch(
      NavigationActions.navigate({
        routeName: 'Search'
      })
    );
  };

  render() {
    const { placeholder, containerStyle, backButton } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'transparent'
        }}
      >
        {backButton && <HeaderBackButton/>}
        <TouchableWithoutFeedback onPress={this.handleSearchBarPress}>
          <View
            style={StyleSheet.flatten([
              {
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 9,
                minHeight: 30,
                // justifyContent: 'center',
                marginRight: 8,
                marginLeft: backButton ? 2 : 8,
                flexDirection: 'row',
                alignItems: 'center', overflow: 'hidden'
              },
              containerStyle
            ])}
          >
            <Ionicons
              name={'ios-search'}
              style={{ fontSize: 20, marginHorizontal: 8, color: '#7d7d7d' }}
            />
            <Text style={{ color: 'grey' }} numberOfLines={1}>{placeholder}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default HeaderSearchBar;
