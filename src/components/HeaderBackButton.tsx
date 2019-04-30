import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
import { TouchableOpacity } from 'react-native';

class HeaderBackButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={navigationService.goBack}>
        <Icon
          containerStyle={{ paddingHorizontal: themeVariables.spacing_md }}
          name="ios-arrow-back"
          type="ionicon"
          color="white"
          size={30}
        />
      </TouchableOpacity>
    );
  }
}

export default HeaderBackButton;
