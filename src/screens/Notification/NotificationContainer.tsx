import Notification from './Notification';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userTypeSelector } from '../../selectors';
import Authorize from 'components/base/Authorize';
import { Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { Button, Icon } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import navigationService from 'services/navigationService';

interface IProps {

}

class NotificationContainer extends Component<IProps> {
  static navigationOptions = Notification.navigationOptions;

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
          name={'ios-flag'}
          type={'ionicon'}
          color={themeVariables.accent_color}
          size={100}
        />
        <WhiteSpace size={'lg'} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Don't miss an opportunity
        </Text>
        <WhiteSpace size={'lg'} />
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Get notified when job posters view your application, new jobs match your saved skill.
        </Text>
        <View style={{ height: '20%' }} />
        <View>
          <Button
            type={'outline'}
            title={'Join IJob'}
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
    return (
      <Authorize GuestViewComponent={this.renderGuestView}>
        <Notification/>
      </Authorize>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userType: userTypeSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
