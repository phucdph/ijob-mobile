import * as React from 'react';
import { View, Text } from 'react-native';

interface IProps {
  title: string;
  size?: number;
}

class HeaderTitle extends React.Component<IProps> {
  static defaultProps = {
    size: 16
  };
  render() {
    const { title, size } = this.props;
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: size }}>{title}</Text>
      </View>
    );
  }
}

export default HeaderTitle;
