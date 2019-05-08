import React, { Component } from 'react';
import Profile from './Profile';
import { currentProfileSelector, userStateSelector } from './selectors';
import { connect } from 'react-redux';
import { IUser } from './services/typings';
import { getUserProfile, refreshUserProfile } from './actions';

interface IProps {
  profile: IUser;
  dispatchGetProfile: () => void;
  dispatchRefreshProfile: () => void;
  action: string;
}

class ProfileContainer extends Component<IProps> {
  static navigationOptions = (Profile as any).navigationOptions;

  isLoading = () => getUserProfile.is(this.props.action);

  isRefreshing = () => refreshUserProfile.is(this.props.action);

  render() {
    const { profile, dispatchGetProfile, dispatchRefreshProfile } = this.props;
    return (
      <Profile
        profile={profile}
        loadProfile={dispatchGetProfile}
        refreshProfile={dispatchRefreshProfile}
        isLoading={this.isLoading()}
        isRefreshing={this.isRefreshing()}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const userState = userStateSelector(state);
  return {
    profile: currentProfileSelector(state),
    action: userState.action
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetProfile: () => dispatch(getUserProfile()),
    dispatchRefreshProfile: () => dispatch(refreshUserProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
