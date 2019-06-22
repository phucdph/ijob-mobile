import React, { Component } from 'react';
import SearchResult from './SearchResult';
import { connect } from 'react-redux';
import { searchStateSelector } from './selectors';
import {
  ISearchCompany,
  ISearchJob,
  ISearchRequest,
  SearchType
} from './services/typings';
import { IPageableData } from 'services/models';
import { cleanUpSearch, refreshSearch, search, searchNext } from './actions';
import { PAGE_SIZE } from '../../../NewFeed/constants';
import { NavigationInjectedProps } from 'react-navigation';
import { ISearchHistory } from '../../services/typings';
import { createSearchHistory } from '../../components/SearchHistory/actions';

interface IProps extends NavigationInjectedProps {
  req: ISearchRequest;
  action: string;
  companies: IPageableData<ISearchCompany>;
  jobs: IPageableData<ISearchJob>;
  dispatchSearch: (req: ISearchRequest) => void;
  dispatchSearchNext: (req: ISearchRequest) => void;
  dispatchRefreshSearch: (req: ISearchRequest) => void;
  dispatchCleanUpSearch: () => void;
  searchText: string;
  searchType: SearchType;
  dispatchCreateSearchHistory: (req: ISearchHistory) => void;
}

class SearchResultContainer extends Component<IProps> {
  static navigationOptions = SearchResult.navigationOptions;

  componentDidMount() {
    const { req, searchText, searchType } = this.props;
    this.handleSearch({
      ...req,
      searchText,
      searchType
    });
  }

  componentWillUnmount(): void {
    this.props.dispatchCleanUpSearch();
  }

  isLoading = () => search.is(this.props.action);

  isLoadingNext = () => searchNext.is(this.props.action);

  isRefreshing = () => refreshSearch.is(this.props.action);

  handleSearch = (req: ISearchRequest) => {
    this.props.dispatchSearch({
      ...req,
      limit: PAGE_SIZE,
      offset: 0
    });
  };

  handleSearchNext = () => {
    const { req, dispatchSearchNext, companies, jobs } = this.props;
    if (this.isRefreshing() || this.isLoadingNext() || this.isLoading()) {
      return;
    }
    const { searchType } = req;
    if (searchType === SearchType.COMPANY) {
      if (companies.total < PAGE_SIZE || companies.total <= companies.data.length ) {
        return;
      }
    } else if (searchType === SearchType.JOB) {
      if (jobs.total < PAGE_SIZE  || jobs.total <= jobs.data.length) {
        return;
      }
    }
    dispatchSearchNext({
      ...req,
      offset: req.offset + PAGE_SIZE
    });
  };

  handleRefreshSearch = () => {
    const { req, dispatchRefreshSearch } = this.props;
    dispatchRefreshSearch({
      ...req,
      limit: PAGE_SIZE,
      offset: 0
    });
  };

  render() {
    const { req, companies, jobs, navigation, searchType, dispatchCreateSearchHistory } = this.props;
    return (
      <SearchResult
        req={req}
        companies={companies}
        jobs={jobs}
        isLoading={this.isLoading()}
        isLoadingNext={this.isLoadingNext()}
        isRefreshing={this.isRefreshing()}
        onSearch={this.handleSearch}
        onSearchNext={this.handleSearchNext}
        onRefresh={this.handleRefreshSearch}
        navigation={navigation}
        searchType={searchType}
        onCreateHistory={dispatchCreateSearchHistory}
      />
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const searchState = searchStateSelector(state);
  const searchText = props.navigation.getParam('searchText', '');
  const searchType = props.navigation.getParam('searchType', SearchType.ALL);
  const { req, action, companies, jobs } = searchState;
  return {
    searchText,
    searchType,
    req,
    action,
    companies,
    jobs
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchSearch: (req: ISearchRequest) => dispatch(search(req)),
    dispatchSearchNext: (req: ISearchRequest) => dispatch(searchNext(req)),
    dispatchRefreshSearch: (req: ISearchRequest) =>
      dispatch(refreshSearch(req)),
    dispatchCleanUpSearch: () => dispatch(cleanUpSearch()),
    dispatchCreateSearchHistory: (req: ISearchHistory) =>
      dispatch(createSearchHistory(req)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultContainer);
