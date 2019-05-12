import React, { Component } from 'react';
import EditInfo from './EditInfo';
import { currentProfileSelector, userStateSelector } from '../../selectors';
import { IUser } from '../../services/typings';
import { updateUserProfile } from '../../actions';
import { connect } from 'react-redux';

interface IProps {
  action: string;
  profile: IUser;
  dispatchUpdateUserProfile: (req: Partial<IUser>) => void;
}

class EditInfoContainer extends Component<IProps> {
  static navigationOptions = (EditInfo as any).navigationOptions;

  handleUpdateProfile = (req: Partial<IUser>) => {
    const { profile, dispatchUpdateUserProfile } = this.props;
    dispatchUpdateUserProfile({ ...profile, ...req });
  };

  isUpdating = () => updateUserProfile.is(this.props.action);

  render() {
    const { action,profile } = this.props;
    return (
      <EditInfo
        onUpdate={this.handleUpdateProfile}
        isLoading={this.isUpdating()}
        profile={profile}
        action={action}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const profile = currentProfileSelector(state);
  return {
    profile,
    action: userStateSelector(state).action
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
)(EditInfoContainer as any);
