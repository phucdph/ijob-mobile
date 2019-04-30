import React, { Component } from 'react';
import Setting from './Setting';
import { currentProfileSelector } from '../Profile/selectors';
import { connect } from 'react-redux';
import { IUser } from '../Profile/services/typings';
import { signOut } from '../Auth/actions';

interface IProps {
  profile: IUser,
  dispatchSignOut: () => void;
}

class SettingContainer extends Component<IProps> {
  static navigationOptions = Setting.navigationOptions;

  render() {
    const { profile, dispatchSignOut } = this.props;
    return <Setting profile={profile} onSignOut={dispatchSignOut}/>;
  }
}

const mapStateToProps = (state: any) => {
  return { profile: currentProfileSelector(state) };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchSignOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
