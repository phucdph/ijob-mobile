import React, { Component } from 'react';
import SearchHistory from './SearchHistory';
import { connect } from 'react-redux';
import { ISearchHistory } from '../../services/typings';
import { searchHistorySelector } from './selectors';
import { getSearchHistory, createSearchHistory } from './actions';
import { noop } from 'lodash';

interface IProps {
  action?: string;
  error?: any;
  data?: ISearchHistory[];
  dispatchGetSearchHistory?: () => void;
  dispatchCreateSearchHistory?: (req: ISearchHistory) => void;
}

class SearchHistoryContainer extends Component<IProps> {
  isLoading = () => getSearchHistory.is(this.props.action);

  render() {
    const { data = [], dispatchGetSearchHistory = noop } = this.props;
    return (
      <SearchHistory
        isLoading={this.isLoading()}
        data={data}
        onLoad={dispatchGetSearchHistory}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const searchHistoryState = searchHistorySelector(state);
  const { action, error, data } = searchHistoryState;
  return {
    action,
    error,
    data
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchCreateSearchHistory: (req: ISearchHistory) =>
      dispatch(createSearchHistory(req)),
    dispatchGetSearchHistory: () => dispatch(getSearchHistory())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHistoryContainer);
