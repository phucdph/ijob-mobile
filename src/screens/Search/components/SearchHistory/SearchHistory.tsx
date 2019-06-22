import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { ISearchHistory } from '../../services/typings';
import SearchHistoryItem from './components/SearchHistoryItem';
import WhiteSpace from 'components/base/WhiteSpace';

// const data = [
//   { id: '1', name: 'react js', type: 'text' },
//   { id: '1', name: 'react native', type: 'text' },
//   { id: '1', name: 'golang', type: 'text' },
//   { id: '1', name: 'kms technology', type: 'text' }
// ];

interface IProps {
  data: ISearchHistory[];
  isLoading: boolean;
  onLoad: () => void;
}

class SearchHistory extends Component<IProps> {
  componentDidMount() {
    this.props.onLoad();
  }


  renderSearchHistoryItem = ({ item }: { item: ISearchHistory }) => {
    return <SearchHistoryItem data={item} />;
  };

  render() {
    const { data = []} = this.props;
    if (data.length <=0) return null;
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
          <WhiteSpace size={'sm'}/>
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
