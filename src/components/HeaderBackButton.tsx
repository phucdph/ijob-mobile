import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';

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
        <Icon
          containerStyle={{ paddingHorizontal: themeVariables.spacing_md + 2 }}
          name="ios-arrow-back"
          type="ionicon"
          color={color}
          size={30}
          Component={Touchable}
          onPress={navigationService.goBack}
        />
    );
  }
}

export default HeaderBackButton;
