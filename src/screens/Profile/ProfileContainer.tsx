import React, { Component } from 'react';
import Profile from './Profile';
import { currentProfileSelector, userStateSelector } from './selectors';
import { connect } from 'react-redux';
import { IUser } from './services/typings';
import {
  getUserProfile,
  refreshUserProfile,
  updateUserAvatar
} from './actions';
import { userTypeSelector } from '../../selectors';
import { UserType } from '../../state';
import Authorize from 'components/base/Authorize';
import { View, Text } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import { Button, Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';

interface IProps {
  profile: IUser;
  dispatchGetProfile: () => void;
  dispatchRefreshProfile: () => void;
  action: string;
  dispatchUpdateUserAvatar: (req: string) => void;
  userType: UserType;
}

class ProfileContainer extends Component<IProps> {
  static navigationOptions = (Profile as any).navigationOptions;

  isLoading = () => getUserProfile.is(this.props.action);

  isRefreshing = () => refreshUserProfile.is(this.props.action);

  isUpdatingAvatar = () => updateUserAvatar.is(this.props.action);

  handleUpdateAvatar = (req: string) => {
    const { dispatchUpdateUserAvatar } = this.props;
    dispatchUpdateUserAvatar(req);
  };

  renderGuestView = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          // justifyContent: 'center',
          paddingHorizontal: themeVariables.spacing_xl,
          flexDirection: 'column'
        }}
      >
        <View style={{ height: '25%' }} />
        <Icon
          name={'ios-rocket'}
          type={'ionicon'}
          color={themeVariables.accent_color}
          size={100}
        />
        <WhiteSpace size={'lg'} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          What are you wating for?
        </Text>
        <WhiteSpace size={'lg'} />
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          By customize your profile, you can receive job recommendations base on
          your skill.
        </Text>
        <View style={{ height: '20%' }} />
        <View>
          <Button
            type={'outline'}
            title={'Join Kosmos'}
            titleStyle={{ color: themeVariables.primary_color }}
            buttonStyle={{
              borderColor: themeVariables.primary_color,
              borderWidth: 1
            }}
            onPress={() => navigationService.push({ routeName: 'SignIn'})}
          />
          <WhiteSpace size={'md'} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
            <Button
              title={'Signin'}
              type={'clear'}
              titleStyle={{ color: themeVariables.primary_color }}
              onPress={() => navigationService.push({ routeName: 'SignUp'})}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      profile,
      dispatchGetProfile,
      dispatchRefreshProfile,
      userType
    } = this.props;
    return (
      <Authorize GuestViewComponent={this.renderGuestView}>
        <Profile
          profile={profile}
          loadProfile={dispatchGetProfile}
          refreshProfile={dispatchRefreshProfile}
          isLoading={this.isLoading()}
          isRefreshing={this.isRefreshing()}
          isUpdatingAvatar={this.isUpdatingAvatar()}
          onUpdateAvatar={this.handleUpdateAvatar}
          userType={userType}
        />
      </Authorize>
    );
  }
}

const mapStateToProps = (state: any) => {
  const userState = userStateSelector(state);
  return {
    profile: currentProfileSelector(state),
    action: userState.action,
    userType: userTypeSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetProfile: () => dispatch(getUserProfile()),
    dispatchRefreshProfile: () => dispatch(refreshUserProfile()),
    dispatchUpdateUserAvatar: (req: string) => dispatch(updateUserAvatar(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
