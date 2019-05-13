import * as React from 'react';
import { Button as RNEButton, ButtonProps } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';

interface IProps extends ButtonProps {}

class Button extends React.Component<IProps> {
  render() {
    return (
      <RNEButton
        buttonStyle={{ backgroundColor: themeVariables.primary_color }}
        titleStyle={{ color: 'white' }}
        {...this.props}
      />
    );
  }
}

export default Button;
