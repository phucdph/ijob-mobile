import React, { Component } from 'react';
import ListOfSkill from './ListOfSkill';
import { connect } from 'react-redux';
import { currentProfileSelector, userStateSelector } from '../../selectors';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { get } from 'lodash';
import { IUser } from '../../services/typings';
import { updateUserProfile } from '../../actions';

interface IProps {
  skills: ISkill[];
  dispatchUpdateUserProfile: (req: Partial<IUser>) => void;
  profile: IUser;
  action: string;
}

class ListOfSkillContainer extends Component<IProps> {
  static navigationOptions = (ListOfSkill as any).navigationOptions;

  handleUpdateProfile = (req: Partial<IUser>) => {
    const { profile, dispatchUpdateUserProfile } = this.props;
    dispatchUpdateUserProfile({ ...profile, ...req });
  };

  isUpdating = () => updateUserProfile.is(this.props.action);

  render() {
    const { skills, action } = this.props;
    return (
      <ListOfSkill
        skills={skills}
        onUpdate={this.handleUpdateProfile}
        isLoading={this.isUpdating()}
        action={action}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfSkillContainer as any);
