import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';

interface IProps {
  loading?: boolean;
}

class ListItemSpinner extends Component<IProps> {
  render() {
    const { loading } = this.props;
    if (!loading) {
      return null;
    }
    return (
      <View
        style={{
          height: 60,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themeVariables.fill_base_color
        }}
      >
        <ActivityIndicator size={'large'}/>
      </View>
    );
  }
}

export default ListItemSpinner;
