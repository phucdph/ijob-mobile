import * as React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { get } from 'lodash';

interface IProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: StyleProp<ViewStyle>;
}

class WhiteSpace extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: 'md'
  };

  render() {
    const { size, style } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          {
            height: get(
              themeVariables,
              `spacing_${size}`,
              themeVariables.spacing_md
            )
          },
          style
        ])}
      />
    );
  }
}

export default WhiteSpace;
