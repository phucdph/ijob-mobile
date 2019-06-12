import * as React from 'react';
import { connect } from 'react-redux';
import {
  searchCompany,
  searchNextCompany,
  refreshSearchCompany,
  resetSearchCompany
} from './actions';
import { IError } from 'services/models/Error';
import {
  ISearchCompanyRequest,
} from './services/typings';
import { IPageableData } from 'services/models';
import { SKILL_PAGING_SIZE } from 'components/Search/SearchSkill/constants';
import { ISearchCompany } from '../../../screens/Search/screens/SearchResult/services/typings';
import { SEARCH_PAGE_SIZE } from 'components/Search/SearchCompany/constants';
import { searchCompanySelector } from 'components/Search/SearchCompany/selectors';

interface IProps {
  dispatchSearchCompany: (req: ISearchCompanyRequest) => void;
  dispatchSearchNextCompany: (req: ISearchCompanyRequest) => void;
  dispatchRefreshCompany: (req: ISearchCompanyRequest) => void;
  dispatchResetSearchCompany: () => void;
  companies: IPageableData<ISearchCompany>;
  action: string;
  error: IError;
}

export default function companySearchContainer(Component: any) {
  class SearchCompanyContainer extends React.Component<IProps> {
    static navigationOptions = Component.navigationOptions;

    req: ISearchCompanyRequest = {
      searchText: '',
      limit: SEARCH_PAGE_SIZE,
      offset: 0,
      excluded_ids: [],
    };

    isLoading = () => searchCompany.is(this.props.action);

    isLoadingNext = () => searchNextCompany.is(this.props.action);

    isRefreshing = () => refreshSearchCompany.is(this.props.action);

    handleSearch = (req: ISearchCompanyRequest) => {
      const { dispatchSearchCompany } = this.props;
      dispatchSearchCompany(req);
      this.req = req;
    };

    handleSearchNext = () => {
      const { dispatchSearchNextCompany, companies } = this.props;
      const { searchText, offset, excluded_ids } = this.req;
      if (
        companies.data.length >= companies.total ||
        this.isLoading() ||
        this.isLoadingNext()
      ) {
        return;
      }
      this.req = {
        searchText,
        limit: SEARCH_PAGE_SIZE,
        offset: offset + SKILL_PAGING_SIZE,
        excluded_ids,
      };
      dispatchSearchNextCompany(this.req);
    };

    handleRefresh = () => {
      const { dispatchRefreshCompany } = this.props;
      const { searchText, excluded_ids } = this.req;
      this.req = {
        searchText,
        excluded_ids,
        limit: SEARCH_PAGE_SIZE,
        offset: 0
      };
      dispatchRefreshCompany(this.req);
    };

    componentWillUnmount(): void {
      this.props.dispatchResetSearchCompany();
    }

    render() {
      const { action, error, companies, req, ...rest } = this.props;
      return (
        <Component
          req={this.req}
          isLoading={this.isLoading()}
          isRefreshing={this.isRefreshing()}
          isLoadingNext={this.isLoadingNext()}
          onSearch={this.handleSearch}
          onSearchNext={this.handleSearchNext}
          onRefresh={this.handleRefresh}
          action={action}
          error={error}
          companies={companies}
          {...rest}
        />
      );
    }
  }

  const mapStateToProps = (state: any) => {
    const searchCompanyState = searchCompanySelector(state);
    return {
      action: searchCompanyState.action,
      error: searchCompanyState.error,
      companies: searchCompanyState.data
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      dispatchSearchCompany: (req: ISearchCompanyRequest) =>
        dispatch(searchCompany(req)),
      dispatchSearchNextCompany: (req: ISearchCompanyRequest) =>
        dispatch(searchNextCompany(req)),
      dispatchRefreshCompany: (req: ISearchCompanyRequest) =>
        dispatch(refreshSearchCompany(req)),
      dispatchResetSearchCompany: () => dispatch(resetSearchCompany())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchCompanyContainer as any);
}
