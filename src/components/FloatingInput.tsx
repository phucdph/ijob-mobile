import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import { Sae } from 'react-native-textinput-effects';
import { themeVariables } from 'themes/themeVariables';
import { TextInputProps, View, Text } from 'react-native';
import WhiteSpace from 'components/base/WhiteSpace';

interface IProps extends TextInputProps {
  label: string;
  iconName: string;
  iconColor?: string;
  iconClass?: JSX.Element;
  error?: string;
}

class FloatingInput extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    iconColor: themeVariables.accent_color,
    iconClass: Ionicons as any,
    error: ''
  };

  render() {
    const {
      label,
      iconName,
      iconColor,
      iconClass,
      error,
      ...rest
    } = this.props;
    return (
      <View style={{ padding: 0 }}>
        <Sae
          label={label}
          iconClass={iconClass}
          iconName={iconName}
          iconColor={iconColor}
          labelHeight={24}
          borderHeight={2}
          labelStyle={{
            color: themeVariables.secondary_text_color,
            fontWeight: 'normal'
          }}
          inputStyle={{
            color: themeVariables.primary_text_color
          }}
          {...rest}
        />
        {!!error && (
          <>
            <WhiteSpace size={'sm'} />
            <Text style={{ color: '#FF190C', fontSize: 14 }}>{error}</Text>
          </>
        )}
      </View>
    );
  }
}

export default FloatingInput;
