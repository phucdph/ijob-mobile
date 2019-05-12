import * as React from 'react';
import { View, Text } from 'react-native';

interface IProps {
  title: string;
  size?: number;
}

class HeaderTitle extends React.Component<IProps> {
  static defaultProps = {
    size: 18
  };
  render() {
    const { title, size } = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontWeight: 'bold', fontSize: size, color: 'white' }}>{title}</Text>
      </View>
    );
  }
}

export default HeaderTitle;
