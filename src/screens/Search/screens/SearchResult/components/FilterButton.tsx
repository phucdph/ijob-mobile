import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { noop } from 'lodash';

interface IProps {
  title: string;
  onPress?: () => void;
}

class FilterButton extends Component<IProps> {
  static defaultProps = {
    onPress: noop,
  };
  render() {
    const { title, onPress } = this.props;
    return (
      <Button
        type={'clear'}
        title={title}
        titleStyle={{ color: themeVariables.primary_color, fontSize: 15 }}
        buttonStyle={{
          paddingVertical: 6,
          paddingHorizontal: 0,
        }}
        icon={{
          name: 'ios-arrow-down',
          type: 'ionicon',
          size: 14,
        }}
        iconRight={true}
        iconContainerStyle={{
          marginTop: 4,
        }}
        onPress={onPress}
      />
    );
  }
}

export default FilterButton;
