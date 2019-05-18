import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps
} from 'react-navigation';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { themeVariables } from 'themes/themeVariables';
import { Icon } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import SearchHistoryItem from './components/SearchHistoryItem';
import { ISearchHistory } from './services/typings';
import { noop } from 'lodash';
import navigationService from 'services/navigationService';
import { SearchType } from './screens/SearchResult/services/typings';

const data = [
  { id: '1', name: 'react js', type: 'text' },
  { id: '1', name: 'react native', type: 'text' },
  { id: '1', name: 'golang', type: 'text' },
  { id: '1', name: 'kms technology', type: 'text' }
];

interface IProps extends NavigationInjectedProps {}

interface IState {
  searchText: string;
}

class Search extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const handleSearchTextChange = navigation.getParam(
      'onSearchTextChange',
      noop
    );
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: (
        <HeaderSearchBarInput onChangeText={handleSearchTextChange} />
      )
    };
  };

  state = {
    searchText: ''
  };

  handleSearchTextChange = (searchText: string) =>
    this.setState({ searchText });

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onSearchTextChange: this.handleSearchTextChange
    });
  }

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

  handleSeeResultPress = () => {
    const { searchText} = this.state;
    navigationService.navigate({ routeName: 'SearchResult', params: { searchText, searchType: SearchType.ALL }});
  };

  render() {
    const { searchText } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderSearchForSection()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderHistorySection()}
        {!!searchText && (
          <TouchableOpacity onPress={this.handleSeeResultPress}>
            <View
              style={{
                paddingHorizontal: themeVariables.spacing_lg
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: themeVariables.primary_color
                }}
              >
                See all result for "{searchText}"
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}

export default Search;
