import React, { Component } from 'react';
import { StyleProp, Text, View, ViewStyle, StyleSheet } from 'react-native';
import { themeVariables } from 'themes/themeVariables';

interface IProps {
  name: string;
  style?: StyleProp<ViewStyle>;
}

class Tag extends Component<IProps> {
  render() {
    const { name, style } = this.props;
    return (
      <View
        style={StyleSheet.flatten([{
          borderRadius: 20,
          borderWidth: 0,
          paddingHorizontal: themeVariables.spacing_md + 2,
          paddingVertical: themeVariables.spacing_sm,
          backgroundColor: themeVariables.light_primary_color,
        }, style])}
      >
        <Text>{name}</Text>
      </View>
    );
  }
}

export default Tag;
