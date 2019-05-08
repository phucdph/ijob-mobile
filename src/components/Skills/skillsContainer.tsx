import * as React from 'react';
import { connect } from 'react-redux';
import { searchNextSkills, searchSkills, refreshSearchSkills } from './actions';
import {
  locationDataStateSelector,
  locationStateSelector
} from 'components/Locations/selectors';
import { IError } from 'services/models/Error';
import { ISearchSKillRequest, ISkill } from 'components/Skills/services/typings';
import { IPageableData } from 'services/models';

interface IProps {
  dispatchSearchSkill: (req: ISearchSKillRequest) => void;
  dispatchSearchNextSkill: (req: ISearchSKillRequest) => void;
  dispatchRefreshSkill: (req: ISearchSKillRequest) => void
  skills: IPageableData<ISkill>;
  action: string;
  error: IError;
}

export default function locationContainer(Component: any) {
  class SearchSkillContainer extends React.Component<IProps> {
    req: ISearchSKillRequest = {
      searchText: '',
      limit: 30,
      offset: 0,
    };

    isLoading = () => searchSkills.is(this.props.action);

    isLoadingNext = () => searchNextSkills.is(this.props.action);

    isRefreshing = () => refreshSearchSkills.is(this.props.action);

    handleSearch = (req: ISearchSKillRequest) => {
      const { dispatchSearchSkill } = this.props;
      dispatchSearchSkill(req);
      this.req = req;
    };

    handleSearchNext = () => {
      const { dispatchSearchSkill } = this.props;
      const { searchText, offset } = this.req;
      this.req = {
        searchText,
        limit: 30,
        offset: offset + 30,
      };
      dispatchSearchSkill(this.req);
    };

    handleRefresh = () => {
      const { dispatchRefreshSkill } = this.props;
      const { searchText } = this.req;
      this.req = {
        searchText,
        limit: 30,
        offset: 0,
      };
      dispatchRefreshSkill(this.req);
    };

    render() {
      const {
        action,
        error,
        skills,
        ...rest
      } = this.props;
      return (
        <Component
          isLoading={this.isLoading()}
          isRefreshing={this.isRefreshing()}
          isLoadingNext={this.isLoadingNext()}
          onSearch={this.handleSearch}
          onSearchNext={this.handleSearchNext}
          onRefresh={this.handleRefresh}
          action={action}
          error={error}
          skills={skills}
          {...rest}
        />
      );
    }
  }

  const mapStateToProps = (state: any) => {
    const locationState = locationStateSelector(state);
    return {
      action: locationState.action,
      error: locationState.error,
      locations: locationDataStateSelector(state)
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      dispatchSearchSkill: (req: ISearchSKillRequest) => dispatch(searchSkills(req)),
        dispatchSearchNextSkill: (req: ISearchSKillRequest) => dispatch(searchNextSkills(req)),
        dispatchRefreshSkill: (req: ISearchSKillRequest) => dispatch(refreshSearchSkills(req))
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchSkillContainer as any);
}
