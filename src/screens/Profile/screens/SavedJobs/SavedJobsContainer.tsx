import React, { Component } from 'react';
import SavedJobs from './SavedJobs';
import { connect } from 'react-redux';
import { currentProfileSelector } from '../../selectors';

interface IProps {
  jobs: string[];
}

class SavedJobsContainer extends Component<IProps> {
  static navigationOptions = SavedJobs.navigationOptions;

  render() {
    const { jobs = [] } = this.props;
    return (
      <SavedJobs data={jobs}/>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    jobs: currentProfileSelector(state).saveJob
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobsContainer as any);
