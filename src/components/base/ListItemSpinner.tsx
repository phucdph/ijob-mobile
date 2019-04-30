import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IProps {
  loading?: boolean;
}

class ListItemSpinner extends Component<IProps> {
  render() {
    const { loading } = this.props;
    if (!loading) { return null; }
    return (
      <View style={{ height: 80, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'}/>
      </View>
    );
  }
}

export default ListItemSpinner;
