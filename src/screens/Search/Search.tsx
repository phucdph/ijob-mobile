import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import { Constants } from 'expo';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { themeVariables } from 'themes/themeVariables';
import HeaderSearchBar from 'components/HeaderSearchBar';

interface IProps {}

class Search extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: <HeaderSearchBarInput />
    };
  };

  render() {
    return null;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Search</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Search;
