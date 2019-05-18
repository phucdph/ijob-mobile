import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationInjectedProps, NavigationScreenConfigProps } from 'react-navigation';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { noop, throttle } from 'lodash';
import SearchAll from './components/SeachAll/SearchAll';
import { themeVariables } from 'themes/themeVariables';
import { ISearchCompany, ISearchJob, ISearchRequest, SearchType } from './services/typings';
import { IPageableData } from 'services/models';
import { Button } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import FilterButton from './components/FilterButton';
import SearchCompanies from './components/SearchCompanies/SearchCompanies';
import SearchJobs from './components/SearchJobs/SearchJobs';
import navigationService from 'services/navigationService';
import LocationMultiSelect from 'components/Locations/LocationMultiSelect';
import { ILocation } from 'components/Locations/services/typings';

interface IProps extends NavigationInjectedProps {
  isRefreshing: boolean;
  isLoading: boolean;
  isLoadingNext: boolean;
  onRefresh: () => void;
  onSearch: (req: ISearchRequest) => void;
  onSearchNext: () => void;
  req: ISearchRequest;
  companies: IPageableData<ISearchCompany>;
  jobs: IPageableData<ISearchJob>;
  searchType: SearchType;
}

interface IState {
  searchType: SearchType;
}

class SearchResult extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const handleSearchTextChange = navigation.getParam(
      'onSearchTextChange',
      noop
    );
    const searchText = navigation.getParam('searchText', '');
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: (
        <HeaderSearchBarInput
          autoFocus={false}
          onChangeText={handleSearchTextChange}
          defaultValue={searchText}
        />
      )
    };
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchType: props.searchType,
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onSearchTextChange: throttle(this.handleSearch, 500, {
        leading: false,
        trailing: true
      })
    });
  }

  handleSearchTypePress = (searchType: SearchType) => {
    this.setState({ searchType });
  };

  handleCompanyPress = () => this.setState({ searchType: SearchType.COMPANY });

  handleJobPress = () => this.setState({ searchType: SearchType.JOB });

  handleSearch = (searchText: string) => {
    const { req, onSearch } = this.props;
    const { searchType } = this.state;
    onSearch({
      ...req,
      searchText,
      searchType
    });
  };

  renderAllFilterBar = () => {
    return (
      <ScrollView
        horizontal={true}
        shouldRasterizeIOS={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height: 50,
          flexShrink: undefined,
          flexGrow: undefined,
          backgroundColor: 'white'
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <WhiteSpace horizontal={true} />
        <Button
          type={'outline'}
          title={'Company'}
          buttonStyle={{
            borderColor: themeVariables.primary_color,
            borderWidth: 1,
            paddingVertical: 6
          }}
          titleStyle={{ color: themeVariables.primary_color, fontSize: 15 }}
          onPress={() => this.handleSearchTypePress(SearchType.COMPANY)}
        />
        <WhiteSpace horizontal={true} />
        <Button
          type={'outline'}
          title={'Job'}
          buttonStyle={{
            borderColor: themeVariables.primary_color,
            borderWidth: 1,
            paddingVertical: 6
          }}
          titleStyle={{ color: themeVariables.primary_color, fontSize: 15 }}
          onPress={() => this.handleSearchTypePress(SearchType.JOB)}
        />
      </ScrollView>
    );
  };

  renderCompanyFilterBar = () => {
    return (
      <ScrollView
        horizontal={true}
        shouldRasterizeIOS={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height: 50,
          flexShrink: undefined,
          flexGrow: undefined,
          backgroundColor: 'white'
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <WhiteSpace horizontal={true} />
        <Button
          type={'clear'}
          title={'Clear'}
          titleStyle={{ color: themeVariables.primary_color, fontSize: 15 }}
          buttonStyle={{
            paddingVertical: 6,
            paddingHorizontal: 0,
          }}
          onPress={() => this.handleSearchTypePress(SearchType.ALL)}
        />
        <WhiteSpace horizontal={true} />
        <Button
          type={'solid'}
          title={'Company'}
          buttonStyle={{
            backgroundColor: themeVariables.primary_color,
            paddingVertical: 6

          }}
          titleStyle={{ color: 'white', fontSize: 15 }}
          onPress={() => this.handleSearchTypePress(SearchType.JOB)}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton title={'Location'}/>
        <WhiteSpace horizontal={true} />
        <FilterButton title={'Skill'}/>
        <WhiteSpace horizontal={true} />
      </ScrollView>
    );
  };

  handleLocationSelect = (locations: ILocation) => {
    console.log(locations);
  };

  renderJobFilterBar = () => {
    return (
      <ScrollView
        horizontal={true}
        shouldRasterizeIOS={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height: 50,
          flexShrink: undefined,
          flexGrow: undefined,
          backgroundColor: 'white'
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <WhiteSpace horizontal={true} />
        <Button
          type={'clear'}
          title={'Clear'}
          titleStyle={{ color: themeVariables.primary_color, fontSize: 15 }}
          buttonStyle={{
            paddingVertical: 6,
            paddingHorizontal: 0,
          }}
          onPress={() => this.handleSearchTypePress(SearchType.ALL)}
        />
        <WhiteSpace horizontal={true} />
        <Button
          type={'solid'}
          title={'Job'}
          buttonStyle={{
            backgroundColor: themeVariables.primary_color,
            paddingVertical: 6

          }}
          titleStyle={{ color: 'white', fontSize: 15 }}
          onPress={() => this.handleSearchTypePress(SearchType.JOB)}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton title={'Company'}/>
        <WhiteSpace horizontal={true} />
        <FilterButton title={'Location'} onPress={() => navigationService.navigate({
          routeName: 'LocationMultiSelectModal',
          params: {
            value: [],
            onChange: this.handleLocationSelect
          }
        })}/>
        <WhiteSpace horizontal={true} />
        <FilterButton title={'Skill'}/>
        <WhiteSpace horizontal={true} />
      </ScrollView>
    );
  };

  renderFilterBar = () => {
    const { searchType } = this.state;
    switch (searchType) {
      case SearchType.ALL: {
        return this.renderAllFilterBar();
      }
      case SearchType.COMPANY: {
        return this.renderCompanyFilterBar();
      }
      case SearchType.JOB: {
        return this.renderJobFilterBar();
      }
      default: {
        return this.renderAllFilterBar();

      }
    }
  };

  renderContent = () => {
    const { searchType } = this.state;
    switch (searchType) {
      case SearchType.ALL: {
        return this.renderSearchAll();
      }
      case SearchType.COMPANY: {
        return this.renderSearchCompanies();
      }
      case SearchType.JOB: {
        return this.renderSearchJobs();
      }
      default: {
        return this.renderAllFilterBar();

      }
    }
  };

  renderSearchAll = () => {
    const { companies, jobs, isLoading, isRefreshing, onRefresh } = this.props;
    return (
      <SearchAll
        companies={companies}
        jobs={jobs}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onCompanySeeAll={this.handleCompanyPress}
        onJobSeeAll={this.handleJobPress}
      />
    );
  };

  renderSearchCompanies = () => {
    const { companies, isLoading, isRefreshing, onRefresh, isLoadingNext, onSearchNext } = this.props;
    return (
      <SearchCompanies
        companies={companies}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingNext={isLoadingNext}
        onRefresh={onRefresh}
        onSearchNext={onSearchNext}
      />
    );
  };

  renderSearchJobs = () => {
    const { jobs, isLoading, isRefreshing, onRefresh, isLoadingNext, onSearchNext } = this.props;
    return (
      <SearchJobs
        jobs={jobs as any}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingNext={isLoadingNext}
        onRefresh={onRefresh}
        onSearchNext={onSearchNext}
      />
    );
  };

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        {this.renderFilterBar()}
        {/*<WhiteSpace style={{ backgroundColor: themeVariables.fill_base_color }}/>*/}
        {this.renderContent()}
      </View>
    );
  }
}

export default SearchResult;
