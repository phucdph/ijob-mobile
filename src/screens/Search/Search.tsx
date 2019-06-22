import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps
} from 'react-navigation';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { themeVariables } from 'themes/themeVariables';
import { Icon } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import { noop } from 'lodash';
import navigationService from 'services/navigationService';
import { SearchType } from './screens/SearchResult/services/typings';
import SearchHistory from './components/SearchHistory/SearchHistoryContainer';
import Authorize from 'components/base/Authorize';
import { ISearchHistory, SearchHistoryType } from './services/typings';

interface IProps extends NavigationInjectedProps {
  onCreateHistory: (req: ISearchHistory) => void;
}

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
        <HeaderSearchBarInput
          placeholder={'Search'}
          onChangeText={handleSearchTextChange}
        />
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
      <View style={{ backgroundColor: 'white' }}>
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
            <TouchableOpacity onPress={this.handleSearchJobPress}>
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
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSearchCompanyPress}>
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
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderHistorySection = () => {
    return (
      <Authorize>
        <SearchHistory />
      </Authorize>
    );
  };

  handleSeeResultPress = () => {
    const { searchText } = this.state;
    const { onCreateHistory } = this.props;
    navigationService.navigate({
      routeName: 'SearchResult',
      params: { searchText, searchType: SearchType.ALL }
    });
    onCreateHistory({
      type: SearchHistoryType.TEXT,
      name: searchText,
      content: ''
    });
  };

  handleSearchJobPress = () => {
    const { searchText } = this.state;
    navigationService.navigate({
      routeName: 'SearchResult',
      params: { searchText, searchType: SearchType.JOB }
    });
  };

  handleSearchCompanyPress = () => {
    const { searchText } = this.state;
    navigationService.navigate({
      routeName: 'SearchResult',
      params: { searchText, searchType: SearchType.COMPANY }
    });
  };

  render() {
    const { searchText } = this.state;
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
        keyboardShouldPersistTaps={'handled'}
      >
        {this.renderSearchForSection()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderHistorySection()}
        {!!searchText && (
          <TouchableOpacity onPress={this.handleSeeResultPress}>
            <View
              style={{
                paddingHorizontal: themeVariables.spacing_md,
                paddingVertical: themeVariables.spacing_md
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
