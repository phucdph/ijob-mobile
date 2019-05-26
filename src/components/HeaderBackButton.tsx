import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';
import { TouchableOpacity } from 'react-native';

interface IProps {
  color?: string;
}

class HeaderBackButton extends Component<IProps> {
  static defaultProps = {
    color: 'white'
  };
  render() {
    const { color } = this.props;
    return (
      <TouchableOpacity
        onPress={navigationService.goBack}
        style={{
          paddingHorizontal: themeVariables.spacing_md + 4
        }}
        hitSlop={{ left: 5, right: 5, bottom: 5, top: 5 }}
      >
        <Icon name="ios-arrow-back" type="ionicon" color={color} size={30} />
      </TouchableOpacity>
    );
  }
}

export default HeaderBackButton;
