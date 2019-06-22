import React, { Component, Dispatch } from 'react';
import NewFeed from './NewFeed';
import { connect } from 'react-redux';
import { ErrorState } from 'services/models/Error';
import { IPageableData } from 'services/models';
import { IFeedRequest } from './services/typings';
import { actionSelector, errorSelector, jobDataSelector } from './selectors';
import { getNextJobs, getJobs, refreshJobs } from './actions';
import { PAGE_SIZE } from './constants';
import { last } from 'lodash';
import { registerForPushNotificationsAsync } from 'utils/notification';

interface IProps {
  action: string;
  error: ErrorState;
  data: IPageableData<string>;
  dispatchGetFeeds: (req: IFeedRequest) => void;
  dispatchGetNextFeeds: (req: IFeedRequest) => void;
  dispatchRefreshFeeds: (req: IFeedRequest) => void;
}

class NewFeedContainer extends Component<IProps> {
  static navigationOptions = NewFeed.navigationOptions;

  componentDidMount(): void {
    this.loadData();
  }

  loadData = () => {
    const { dispatchGetFeeds } = this.props;
    dispatchGetFeeds({ limit: PAGE_SIZE, offset: 0 });
  };

  isLoading = () => getJobs.is(this.props.action);

  isLoadingNext = () => getNextJobs.is(this.props.action);

  isRefreshing = () => refreshJobs.is(this.props.action);

  loadMore = () => {
    const { data, dispatchGetNextFeeds } = this.props;
    if (
      this.isLoading() ||
      this.isLoadingNext() ||
      data.data.length >= data.total
    ) {
      return;
    }
    dispatchGetNextFeeds({
      limit: PAGE_SIZE,
      offset: data.data.length,
    });
  };

  refreshFeed = () => {
    const { dispatchRefreshFeeds } = this.props;
    dispatchRefreshFeeds({ limit: PAGE_SIZE, offset: 0 });
  };

  render() {
    const { data } = this.props;
    return (
      <NewFeed
        data={data}
        isLoading={this.isLoading()}
        isLoadingNext={this.isLoadingNext()}
        isRefreshing={this.isRefreshing()}
        onRefresh={this.refreshFeed}
        onLoadMore={this.loadMore}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    action: actionSelector(state),
    error: errorSelector(state),
    data: jobDataSelector(state)
  };
};

const mapDispatchToProp = (dispatch: Dispatch<any>) => {
  return {
    dispatchGetFeeds: (req: IFeedRequest) => dispatch(getJobs(req)),
    dispatchGetNextFeeds: (req: IFeedRequest) => dispatch(getNextJobs(req)),
    dispatchRefreshFeeds: (req: IFeedRequest) => dispatch(refreshJobs(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(NewFeedContainer);


