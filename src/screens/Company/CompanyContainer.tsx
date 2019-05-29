import React, { Component } from 'react';
import Company from './Company';
import { getCompany, refreshCompany, followCompany, unFollowCompany } from './actions';
import { connect } from 'react-redux';
import { companyStateSelector } from './selectors';
import { NavigationInjectedProps } from 'react-navigation';
import { userTypeSelector } from '../../selectors';
import { UserType } from '../../state';
import { ICompany } from './services/typings';

interface IProps extends NavigationInjectedProps {
  action: string;
  id: string;
  dispatchGetCompany: (id: string) => void;
  dispatchRefreshCompany: (id: string) => void;
  dispatchFollowCompany: (id: string) => void,
  dispatchUnFollowCompany: (id: string) => void,
  userType: UserType;
  data: ICompany;
}

class CompanyContainer extends Component<IProps> {
  static navigationOptions = (Company as any).navigationOptions;

  isLoading = () => getCompany.is(this.props.action);

  isRefreshing = () => refreshCompany.is(this.props.action);

  handleLoad = () => {
    const { id, dispatchGetCompany } = this.props;
    dispatchGetCompany(id);
  };

  handleRefresh = () => {
    const { id, dispatchRefreshCompany } = this.props;
    dispatchRefreshCompany(id);
  };

  handleFollow = () => {
    const { id, dispatchFollowCompany } = this.props;
    dispatchFollowCompany(id);
  };

  handleUnFollow = () => {
    const { id, dispatchUnFollowCompany } = this.props;
    dispatchUnFollowCompany(id);
  };

  render() {
    const { data, userType, id } = this.props;
    return (
     <Company
        id={id}
        isLoading={this.isLoading()}
        isRefreshing={this.isRefreshing()}
        onLoad={this.handleLoad}
        onRefresh={this.handleRefresh}
        onFollow={this.handleFollow}
        onUnFollow={this.handleUnFollow}
        data={data}
        userType={userType}
     />
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const id = props.navigation.getParam('id', props.id);
  const companyState = companyStateSelector(state, { id });
  return {
    id,
    action: companyState.action,
    data: companyState.data,
    error: companyState.error,
    userType: userTypeSelector(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetCompany: (id: string) => dispatch(getCompany(id)),
    dispatchRefreshCompany: (id: string) => dispatch(refreshCompany(id)),
    dispatchFollowCompany: (id: string) => dispatch(followCompany(id)),
    dispatchUnFollowCompany: (id: string) => dispatch(unFollowCompany(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer as any);
