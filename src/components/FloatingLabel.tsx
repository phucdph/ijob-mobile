import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { noop } from 'lodash';

interface IProps {
  label: string;
  value: string;
  onPress: () => void;
}

class FloatingLabel extends Component<IProps> {
  render() {
    const { label, value, onPress = noop } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ width: '100%', height: 64 }}>
          <View style={{ height: 16 }} />
          <View style={{ height: 48, justifyContent: 'center' }}>
            {!!value && (
              <Text
                style={{
                  fontSize: 12,
                  color: themeVariables.secondary_text_color,
                  alignSelf: 'flex-start'
                }}
              >
                {label}
              </Text>
            )}

            {!!value && (
              <>
                <View style={{ height: 8 }} />
                <Text style={{ fontSize: 18 }}>{value}</Text>
                <View style={{ height: 6 }} />
              </>
            )}
            {!value && (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    color: themeVariables.secondary_text_color
                  }}
                >
                  {label}
                </Text>
              </>
            )}
          </View>
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: themeVariables.accent_color
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FloatingLabel;
