import * as React from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import navigationService from 'services/navigationService';
import { noop } from 'lodash';

interface IProps {
  to?: any;
  onPress?: () => void;
}

class Link extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    onPress: noop
  };

  onPress = () => {
    const { to, onPress } = this.props;
    if (to) {
      navigationService.dispatch(NavigationActions.navigate(to));
    } else {
      if (onPress) {
        onPress();
      }
    }
  };

  render() {
    const { children } = this.props;
    return (
        <TouchableOpacity onPress={this.onPress}>
          {typeof children === 'string' ? <Text>{children}</Text> : children}
        </TouchableOpacity>
    );
  }
}

export default Link;
