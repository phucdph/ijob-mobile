import React, { Component } from 'react';
import { noop } from 'lodash';
import { TouchableOpacity, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';

interface IProps {
  name: string;
  onPress?: () => void;
  disabled?: boolean;
}

class HeaderButton extends Component<IProps> {
  static defaultProps = {
    color: 'white',
    onPress: noop,
    disabled: false,
  };
  render() {
    const { name, onPress, disabled } = this.props;
    if (disabled) {
      return (
          <View style={{ paddingHorizontal: themeVariables.spacing_md }}>
            <Text style={{ color: themeVariables.secondary_text_color, fontSize: 17}}>{name}</Text>
          </View>
      );
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ paddingHorizontal: themeVariables.spacing_md }}>
          <Text style={{ color: 'white', fontSize: 17}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderButton;
