import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { themeVariables } from 'themes/themeVariables';
import { Icon } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import SearchHistoryItem from './components/SearchHistoryItem';
import { ISearchHistory } from './services/typings';

const data = [
  { id: '1', name: 'react js', type: 'text' },
  { id: '1', name: 'react native', type: 'text' },
  { id: '1', name: 'golang', type: 'text' },
  { id: '1', name: 'kms technology', type: 'text' },
  ];

interface IProps {}

class Search extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: <HeaderSearchBarInput />
    };
  };

  renderSearchForSection = () => {
    return (
      <View style={{ padding: themeVariables.spacing_md }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: themeVariables.title_font_size
          }}
        >
          Search For
        </Text>
        <WhiteSpace />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 70 }}>
              <Icon
                name={'briefcase-outline'}
                type={'material-community'}
                size={55}
                color={themeVariables.accent_color}
              />
            </View>
            <Text style={{ fontSize: themeVariables.title_font_size }}>
              Job
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 70 }}>
              <Icon
                name={'building-o'}
                type={'font-awesome'}
                size={55}
                color={themeVariables.accent_color}
              />
            </View>
            <Text style={{ fontSize: themeVariables.title_font_size }}>
              Company
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderSearchHistoryItem = ({ item }: { item: ISearchHistory }) => {
    return <SearchHistoryItem data={item} />;
  };

  renderHistorySection = () => {
    return (
      <View style={{ padding: themeVariables.spacing_md }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: themeVariables.title_font_size
          }}
        >
          Recent Searches
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item: ISearchHistory, index: number) =>
            `${item.id}-${index}`
          }
          renderItem={this.renderSearchHistoryItem}
        />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderSearchForSection()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderHistorySection()}
      </ScrollView>
    );
  }
}

export default Search;
