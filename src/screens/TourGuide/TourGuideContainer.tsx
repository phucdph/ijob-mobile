import React, { Component } from 'react';
import TourGuide from './TourGuide';
import { NavigationInjectedProps } from 'react-navigation';
import { currentProfileSelector, userStateSelector } from '../Profile/selectors';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { IUser } from '../Profile/services/typings';
import { updateUserProfile } from '../Profile/actions';
import { ISkill } from '../NewFeed/services/typings';

interface IProps extends NavigationInjectedProps{
  dispatchUpdateUserProfile: (req: Partial<IUser>) => void;
  profile: IUser;
  skills: ISkill[];
}

class TourGuideContainer extends Component<IProps> {
  static navigationOptions = TourGuide.navigationOptions;

  onUpdate = (req: Partial<IUser>) => {
    const { dispatchUpdateUserProfile, profile } = this.props;
    dispatchUpdateUserProfile({
      ...profile,
      ...req,
    })
  };

  render() {
    const { navigation, skills } = this.props;
    return (
      <TourGuide navigation={navigation} skills={skills} onUpdate={this.onUpdate}/>
    );
  }
}

const mapStateToProps = (state: any) => {
  const profile = currentProfileSelector(state);
  return {
    profile,
    action: userStateSelector(state).action,
    skills: get(profile, 'skills', [])
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchUpdateUserProfile: (req: Partial<IUser>) =>
      dispatch(updateUserProfile(req))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourGuideContainer);
