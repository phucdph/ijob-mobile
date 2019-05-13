import React, { Component } from 'react';
import { Avatar as RNEAvatar, AvatarProps } from 'react-native-elements';
import { isEqual } from 'lodash';
interface IProps extends AvatarProps {}

class Avatar extends Component<IProps> {
  shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    return !isEqual(nextProps.source, this.props.source) || this.props.title !== nextProps.title;
  }

  render() {
    return (
      <RNEAvatar
        containerStyle={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3
        }}
        {...this.props}
      />
    );
  }
}

export default Avatar;
