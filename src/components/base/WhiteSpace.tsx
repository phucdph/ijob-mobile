import * as React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { get } from 'lodash';

interface IProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
}

class WhiteSpace extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: 'md',
    horizontal: false
  };

  render() {
    const { size, style, horizontal } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          {
            height: !horizontal
              ? get(
                  themeVariables,
                  `spacing_${size}`,
                  themeVariables.spacing_md
                )
              : undefined,
            width: horizontal
              ? get(
                  themeVariables,
                  `spacing_${size}`,
                  themeVariables.spacing_md
                )
              : undefined
          },
          style
        ])}
      />
    );
  }
}

export default WhiteSpace;
