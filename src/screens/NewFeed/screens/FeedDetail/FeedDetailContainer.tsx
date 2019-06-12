import React, { Component } from 'react';
import FeedDetail from './FeedDetail';
import { connect } from 'react-redux';
import {
  jobDetailDataStateSelector,
  jobDetailStateSelector
} from './selectors';
import { NavigationInjectedProps } from 'react-navigation';
import { IJob, IJobDetail } from '../../services/typings';
import { getJobDetail, refreshJobDetail } from './actions';
import { saveJob, unsaveJob } from '../../actions';

interface IProps extends NavigationInjectedProps {
  id: string;
  data: IJobDetail | IJob;
  action: string;
  dispatchGetJobDetail: (id: string) => void;
  dispatchRefreshJobDetail: (id: string) => void;
  dispatchSaveJob: (id: string) => void;
  dispatchUnsaveJob: (id: string) => void;
}

class FeedDetailContainer extends Component<IProps> {
  static navigationOptions = FeedDetail.navigationOptions;

  isLoading = () => getJobDetail.is(this.props.action);

  isRefreshing = () => refreshJobDetail.is(this.props.action);

  handleLoad = () => {
    const { id, dispatchGetJobDetail } = this.props;
    dispatchGetJobDetail(id);
  };

  handleRefresh = () => {
    const { id, dispatchRefreshJobDetail } = this.props;
    dispatchRefreshJobDetail(id);
  };

  handleSaveJob = () => {
    const { id, dispatchSaveJob } = this.props;
    dispatchSaveJob(id);
  };

  handleUnsaveJob = () => {
    const { id, dispatchUnsaveJob } = this.props;
    dispatchUnsaveJob(id);
  };

  render() {
    const { data } = this.props;
    return (
      <FeedDetail
        data={data}
        onLoad={this.handleLoad}
        onRefresh={this.handleRefresh}
        onSave={this.handleSaveJob}
        onUnsave={this.handleUnsaveJob}
        isLoading={this.isLoading()}
        isRefresing={this.isRefreshing()}
      />
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const id = props.navigation.getParam('id', props.id);
  const jobDetailState = jobDetailStateSelector(state, { id });
  return {
    id,
    action: jobDetailState.action,
    error: jobDetailState.error,
    data: jobDetailDataStateSelector(state, { id })
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetJobDetail: (id: string) => dispatch(getJobDetail(id)),
    dispatchRefreshJobDetail: (id: string) => dispatch(refreshJobDetail(id)),
    dispatchSaveJob: (id: string) => dispatch(saveJob(id)),
    dispatchUnsaveJob: (id: string) => dispatch(unsaveJob(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedDetailContainer);
