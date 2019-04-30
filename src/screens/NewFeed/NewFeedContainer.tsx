import React, { Component, Dispatch } from 'react';
import NewFeed from './NewFeed';
import { connect } from 'react-redux';
import { ErrorState } from 'services/models/Error';
import { IPageableData } from 'services/models';
import { IFeed, IFeedRequest } from './services/typings';
import { actionSelector, errorSelector, feedDataSelector } from './selectors';
import { getFeed, getNextFeed, refreshFeed } from './actions';
import { PAGE_SIZE } from './constants';
import { last } from 'lodash';

interface IProps {
  action: string;
  error: ErrorState;
  data: IPageableData<IFeed>;
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
    dispatchGetFeeds({ limit: PAGE_SIZE });
  };

  isLoading = () => getFeed.is(this.props.action);

  isLoadingNext = () => getNextFeed.is(this.props.action);

  isRefreshing = () => refreshFeed.is(this.props.action);

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
      offset: (last(data.data) || ({} as any)).id
    });
  };

  refreshFeed = () => {
    const { dispatchRefreshFeeds } = this.props;
    dispatchRefreshFeeds({ limit: PAGE_SIZE });
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
    data: feedDataSelector(state)
  };
};

const mapDispatchToProp = (dispatch: Dispatch<any>) => {
  return {
    dispatchGetFeeds: (req: IFeedRequest) => dispatch(getFeed(req)),
    dispatchGetNextFeeds: (req: IFeedRequest) => dispatch(getNextFeed(req)),
    dispatchRefreshFeeds: (req: IFeedRequest) => dispatch(refreshFeed(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(NewFeedContainer);
