import React, { Component } from 'react';
import ListOfJobs from './ListOfJobs';
import { connect } from 'react-redux';
import { companyJobStateSelector } from './selectors';
import { getCompanyJob } from './actions';

interface IProps {
  id: string;
  data: string[];
  action: string;
  dispatchGetCompanyJob: (req: any) => void;
}

class ListOfJobsContainer extends Component<IProps> {
  render() {
    const { data, id, dispatchGetCompanyJob } = this.props;
    return (
      <ListOfJobs data={data} id={id} onLoad={dispatchGetCompanyJob}/>
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const { id } = props;
  const companyJobState = companyJobStateSelector(state, { id });
  return {
    data: companyJobState.data,
    action: companyJobState.action,
    error: companyJobState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetCompanyJob: (req: any) => dispatch(getCompanyJob(req))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListOfJobsContainer);
