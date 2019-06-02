import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentProfileSelector } from '../../selectors';
import FollowingCompanies from './FollowingCompanies';

interface IProps {
  companies: string[];
}

class FollowingCompaniesContainer extends Component<IProps> {
  static navigationOptions = FollowingCompanies.navigationOptions;

  render() {
    const { companies = [] } = this.props;
    console.log(companies);
    return (
      <FollowingCompanies data={companies}/>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    companies: currentProfileSelector(state).followCompany
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingCompaniesContainer as any);
