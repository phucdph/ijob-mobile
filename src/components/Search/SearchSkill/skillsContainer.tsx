import * as React from 'react';
import { connect } from 'react-redux';
import { searchNextSkills, searchSkills, refreshSearchSkills, resetSearchSkills } from './actions';
import { IError } from 'services/models/Error';
import { ISearchSKillRequest, ISkill } from 'components/Search/SearchSkill/services/typings';
import { IPageableData } from 'services/models';
import { skillStateSelector } from 'components/Search/SearchSkill/selectors';
import { SKILL_PAGING_SIZE } from 'components/Search/SearchSkill/constants';

interface IProps {
  dispatchSearchSkill: (req: ISearchSKillRequest) => void;
  dispatchSearchNextSkill: (req: ISearchSKillRequest) => void;
  dispatchRefreshSkill: (req: ISearchSKillRequest) => void
  dispatchResetSearchSkill: () => void;
  skills: IPageableData<ISkill>;
  action: string;
  error: IError;
}

export default function skillContainer(Component: any) {
  class SearchSkillContainer extends React.Component<IProps> {
    static navigationOptions = Component.navigationOptions;

    req: ISearchSKillRequest = {
      searchText: '',
      limit: SKILL_PAGING_SIZE,
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
      const { dispatchSearchNextSkill, skills } = this.props;
      const { searchText, offset } = this.req;
      if (skills.data.length >= skills.total || this.isLoading() || this.isLoadingNext() ) { return; }
      this.req = {
        searchText,
        limit: SKILL_PAGING_SIZE,
        offset: offset + SKILL_PAGING_SIZE,
      };
      dispatchSearchNextSkill(this.req);
    };

    handleRefresh = () => {
      const { dispatchRefreshSkill } = this.props;
      const { searchText } = this.req;
      this.req = {
        searchText,
        limit: SKILL_PAGING_SIZE,
        offset: 0,
      };
      dispatchRefreshSkill(this.req);
    };

    componentWillUnmount(): void {
      this.props.dispatchResetSearchSkill();
    }

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
    const skillState = skillStateSelector(state);
    return {
      action: skillState.action,
      error: skillState.error,
      skills: skillState.data
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      dispatchSearchSkill: (req: ISearchSKillRequest) => dispatch(searchSkills(req)),
        dispatchSearchNextSkill: (req: ISearchSKillRequest) => dispatch(searchNextSkills(req)),
        dispatchRefreshSkill: (req: ISearchSKillRequest) => dispatch(refreshSearchSkills(req)),
      dispatchResetSearchSkill: () => dispatch(resetSearchSkills())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchSkillContainer as any);
}
