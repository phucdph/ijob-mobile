import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps
} from 'react-navigation';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import { noop, throttle } from 'lodash';
import SearchAll from './components/SeachAll/SearchAll';
import { themeVariables } from 'themes/themeVariables';
import {
  ISearchCompany,
  ISearchJob,
  ISearchRequest,
  SearchType
} from './services/typings';
import { IPageableData } from 'services/models';
import { Button } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import FilterButton from './components/FilterButton';
import SearchCompanies from './components/SearchCompanies/SearchCompanies';
import SearchJobs from './components/SearchJobs/SearchJobs';
import navigationService from 'services/navigationService';
import { ILocation } from 'components/Locations/services/typings';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ISearchHistory } from '../../services/typings';

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
  onCreateHistory: (req: ISearchHistory) => void;
}

interface IState {
  searchType: SearchType;
  companies: ISearchCompany[];
  skills: ISkill[];
  locations: ILocation[];
  salary: {
    max?: number,
    min?: number
  }
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

  searchText: string = this.props.navigation.getParam('searchText', '');

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchType: props.searchType,
      locations: [],
      companies: [],
      skills: [],
      salary: {},
    };
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
    this.setState({ searchType, skills: [], locations: [], companies: [], salary: {} });
    const { req, onSearch } = this.props;
    onSearch({
      ...req,
      searchType,
      skill_ids: [],
      location_ids: [],
      company_ids: [],
      max_salary: undefined,
      min_salary: undefined
    })
  };

  handleCompanyPress = () => this.setState({ searchType: SearchType.COMPANY });

  handleJobPress = () => this.setState({ searchType: SearchType.JOB });

  handleSearch = (searchText: string) => {
    this.searchText = searchText;
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
    const { locations, skills, searchType } = this.state;
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
            paddingHorizontal: 0
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
        <FilterButton
          defaultTitle={'Location'}
          data={searchType === SearchType.COMPANY ? locations : []}
          onPress={this.handleFilterLocationPress}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton
          defaultTitle={'Skill'}
          data={searchType === SearchType.COMPANY ? skills : []}
          onPress={this.handleFilterSkillPress}
        />
        <WhiteSpace horizontal={true} />
      </ScrollView>
    );
  };

  handleLocationSelect = (locations: ILocation[]) => {
    const { onSearch, req } = this.props;
    this.setState({ locations });
    onSearch({
      ...req,
      location_ids: locations.map(this.toId),
    })
  };

  renderJobFilterBar = () => {
    const { locations, companies, skills, searchType, salary } = this.state;
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
            paddingHorizontal: 0
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
        <FilterButton
          defaultTitle={'Company'}
          data={searchType === SearchType.JOB ? companies : []}
          onPress={this.handleFilterCompanyPress}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton
          data={searchType === SearchType.JOB ? locations : []}
          defaultTitle={'Location'}
          onPress={this.handleFilterLocationPress}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton
          defaultTitle={'Skill'}
          data={searchType === SearchType.JOB ? skills : []}
          onPress={this.handleFilterSkillPress}
        />
        <WhiteSpace horizontal={true} />
        <FilterButton
          defaultTitle={'Salary'}
          data={searchType === SearchType.JOB ? salary : {}}
          onPress={this.handleFilterSalaryPress}
        />
        <WhiteSpace horizontal={true} />
      </ScrollView>
    );
  };

  handleFilterLocationPress = () => {
    const { locations } = this.state;
    navigationService.navigate({
      routeName: 'LocationMultiSelectModal',
      params: {
        value: locations,
        onChange: this.handleLocationSelect
      }
    });
  };

  handleFilterCompanyPress = () => {
    const { companies } = this.state;
    navigationService.navigate({
      routeName: 'SearchCompanyMultiSelectModal',
      params: {
        value: companies,
        onChange: this.handleCompaniesSelect
      }
    });
  };

  handleFilterSkillPress = () => {
    const { skills } = this.state;
    navigationService.navigate({
      routeName: 'SearchSkillMultiSelectModal',
      params: {
        value: skills,
        onChange: this.handleSkillSelect
      }
    });
  };

  handleFilterSalaryPress = () => {
    const { salary } = this.state;
    navigationService.navigate({
      routeName: 'SalaryRangeModal',
      params: {
        value: salary,
        onChange: this.handleSalarySelect
      }
    });
  };

  handleSalarySelect = (salary: any) => {
    this.setState({ salary });
    const { req, onSearch } = this.props;
    onSearch({
      ...req,
      max_salary: salary.max,
      min_salary: salary.min
    })
  };

  toId = (obj: any) => obj.id;

  handleCompaniesSelect = (companies: ISearchCompany[]) => {
    this.setState({
      companies
    });
    const { req, onSearch } = this.props;
    onSearch({
      ...req,
      company_ids: companies.map(this.toId)
    })
  };

  handleSkillSelect = (skills: ISkill[]) => {
    const { onSearch, req } = this.props;
    this.setState({
      skills
    });
    onSearch({
      ...req,
      skill_ids: skills.map(this.toId),
    })
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
    const { companies, jobs, isLoading, isRefreshing, onRefresh, onCreateHistory } = this.props;
    return (
      <SearchAll
        companies={companies}
        jobs={jobs}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onCompanySeeAll={this.handleCompanyPress}
        onJobSeeAll={this.handleJobPress}
        onCreateHistory={onCreateHistory}
      />
    );
  };

  renderSearchCompanies = () => {
    const {
      companies,
      isLoading,
      isRefreshing,
      onRefresh,
      isLoadingNext,
      onSearchNext,
      onCreateHistory
    } = this.props;
    return (
      <SearchCompanies
        companies={companies}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingNext={isLoadingNext}
        onRefresh={onRefresh}
        onSearchNext={onSearchNext}
        onCreateHistory={onCreateHistory}

      />
    );
  };

  renderSearchJobs = () => {
    const {
      jobs,
      isLoading,
      isRefreshing,
      onRefresh,
      isLoadingNext,
      onSearchNext,
      onCreateHistory
    } = this.props;
    return (
      <SearchJobs
        jobs={jobs as any}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingNext={isLoadingNext}
        onRefresh={onRefresh}
        onSearchNext={onSearchNext}
        onCreateHistory={onCreateHistory}
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
