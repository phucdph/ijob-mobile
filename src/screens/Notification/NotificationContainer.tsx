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
import { getNextNotification, getNotification, refreshNotification } from './actions';
import { INotification, INotificationRequest } from './services/typings';
import { notificationSelector } from './selectors';
import { IPageableData } from 'services/models';

interface IProps {
  dispatchGetNotification: (req: INotificationRequest) => void;
  dispatchGetNextNotification: (req: INotificationRequest) => void;
  dispatchRefreshNotification: (req: INotificationRequest) => void;
  action: string;
  data: IPageableData<INotification>;
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
          Get notified when job posters view your application, new jobs match
          your saved skill.
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
            onPress={() => navigationService.push({ routeName: 'SignIn' })}
          />
          <WhiteSpace size={'md'} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
            <Button
              title={'Signin'}
              type={'clear'}
              titleStyle={{ color: themeVariables.primary_color }}
              onPress={() => navigationService.push({ routeName: 'SignUp' })}
            />
          </View>
        </View>
      </View>
    );
  };

  handleLoad = () => {
    const { dispatchGetNotification } = this.props;
    dispatchGetNotification({
      limit: 20,
      offset: 0
    });
  };

  handleRefresh = () => {
    const { dispatchRefreshNotification } = this.props;
    dispatchRefreshNotification({
      limit: 20,
      offset: 0
    });
  };

  handleLoadNext = () => {
    const {
      dispatchGetNextNotification,
      data: { data, total }
    } = this.props;
    if (this.isLoading() || this.isLoadingNext() || data.length >= total) {
      return;
    }
    dispatchGetNextNotification({
      limit: 20,
      offset: data.length
    });
  };

  isLoading = () => getNotification.is(this.props.action);

  isLoadingNext = () => getNextNotification.is(this.props.action);

  isRefreshing = () => refreshNotification.is(this.props.action);

  render() {
    const { data } = this.props;
    return (
      <Authorize GuestViewComponent={this.renderGuestView}>
        <Notification
          onLoad={this.handleLoad}
          onLoadNext={this.handleLoadNext}
          onRefresh={this.handleRefresh}
          data={data.data}
          isLoading={this.isLoading()}
          isLoadingNext={this.isLoadingNext()}
          isRefreshing={this.isRefreshing()}
        />
      </Authorize>
    );
  }
}

const mapStateToProps = (state: any) => {
  const notificationState = notificationSelector(state);
  return {
    userType: userTypeSelector(state),
    action: notificationState.action,
    data: notificationState.data,
    error: notificationState.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchGetNotification: (req: INotificationRequest) =>
      dispatch(getNotification(req)),
    dispatchGetNextNotification: (req: INotificationRequest) =>
      dispatch(getNextNotification(req)),
    dispatchRefreshNotification: (req: INotificationRequest) =>
      dispatch(refreshNotification(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
