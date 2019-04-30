import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
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
      <TouchableOpacity onPress={navigationService.goBack}>
        <Icon
          containerStyle={{ paddingHorizontal: themeVariables.spacing_md }}
          name="ios-arrow-back"
          type="ionicon"
          color={color}
          size={30}
        />
      </TouchableOpacity>
    );
  }
}

export default HeaderBackButton;
