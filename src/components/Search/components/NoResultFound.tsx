import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NoResultFound extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Result Found</Text>
      </View>
    );
  }
}

export default NoResultFound;
