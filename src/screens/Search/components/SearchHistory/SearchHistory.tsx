import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { ISearchHistory } from '../../services/typings';
import SearchHistoryItem from './components/SearchHistoryItem';

const data = [
  { id: '1', name: 'react js', type: 'text' },
  { id: '1', name: 'react native', type: 'text' },
  { id: '1', name: 'golang', type: 'text' },
  { id: '1', name: 'kms technology', type: 'text' }
];

class SearchHistory extends Component {
  renderSearchHistoryItem = ({ item }: { item: ISearchHistory }) => {
    return <SearchHistoryItem data={item} />;
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ padding: themeVariables.spacing_md }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: themeVariables.title_font_size,
              backgroundColor: 'white'
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
      </View>
    );
  }
}

export default SearchHistory;
