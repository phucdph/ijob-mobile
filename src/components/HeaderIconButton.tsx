import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';
import { noop } from 'lodash';

interface IProps {
  color?: string;
  name: string;
  type?: string;
  onPress?: () => void;
}

class HeaderIconButton extends Component<IProps> {
  static defaultProps = {
    color: 'white',
    type: 'ionicon',
    onPress: noop,
  };
  render() {
    const { color, type, name, onPress } = this.props;
    return (
      <Icon
        containerStyle={{ paddingHorizontal: themeVariables.spacing_md + 2 }}
        name={name}
        type={type}
        color={color}
        size={35}
        Component={Touchable}
        onPress={onPress}
      />
    );
  }
}

export default HeaderIconButton;
