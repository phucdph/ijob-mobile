import React, { Component } from 'react';
import Profile from './Profile';
import { currentProfileSelector } from './selectors';
import { connect } from 'react-redux';
import { IUser } from './services/typings';

interface IProps {
  profile: IUser;
}

class ProfileContainer extends Component<IProps> {
  static navigationOptions = Profile.navigationOptions;

  render() {
    const { profile } = this.props;
    return (
      <Profile profile={profile}/>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    profile: currentProfileSelector(state),
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
