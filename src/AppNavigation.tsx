import {
  createAppContainer,
  createSwitchNavigator,
  NavigationScreenConfigProps,
  NavigationActions,
  createBottomTabNavigator, StackViewTransitionConfigs, createStackNavigator, NavigationTransitionProps
} from 'react-navigation';
import { connect } from 'react-redux';
import { AuthNavigators, AppNavigators } from './navigators';
import Ionicons from 'react-native-vector-icons/Ionicons';
import createAllScreenStackNavigator from './components/base/navigation/createStackNavigator';
import * as React from 'react';
import navigationService from 'services/navigationService';
import AppLoading from './screens/AppLoading/AppLoading';
// @ts-ignore
import { themeVariables } from 'themes/themeVariables';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { isIOS } from 'utils/platform';
import { Notifications } from 'expo';
import { noop } from 'lodash';
import MessageBarManager from 'components/MessageBarManager';
import { INotification } from 'services/typings';
import { handleNotification } from 'utils/notification';

const MessageBarAlert = require('react-native-message-bar').MessageBar;


const AuthStack = createAllScreenStackNavigator(AuthNavigators, {
  initialRouteName: 'SignIn'
});

const NotificationStack = createAllScreenStackNavigator(AppNavigators, {
  initialRouteName: 'Notification',
});


const SettingStack = createAllScreenStackNavigator(AppNavigators, {
  initialRouteName: 'Setting'
});

const HomeStack = createAllScreenStackNavigator(AppNavigators, {
  initialRouteName: 'NewFeed'
});

const ProfileStack = createAllScreenStackNavigator(AppNavigators, {
  initialRouteName: 'Profile'
});

const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    ProfileTab: ProfileStack,
    Notifications: NotificationStack,
    Settings: SettingStack
  },
  {
    lazy: true,
    defaultNavigationOptions: ({
      navigation
    }: NavigationScreenConfigProps) => ({
      tabBarIcon: ({ tintColor }: any) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName = '';
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings`;
        } else if (routeName === 'Notifications') {
          iconName = 'ios-notifications';
        }
        else if (routeName === 'ProfileTab') {
          iconName = 'ios-contact';
        }
        return (
          <IconComponent
            name={iconName}
            size={30}
            color={tintColor as string}
          />
        );
      }
    }),
    // tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: themeVariables.primary_color,
      inactiveTintColor: 'gray',
      showLabel: false,
    },
   }
);

const ModalNavigators = Object.keys(AppNavigators).reduce((accumulator: any, currentValue: string) => {
  accumulator[`${currentValue}Modal`] = AppNavigators[currentValue];
  return accumulator;
}, {});

const createSwitchNavigatorFunc = isIOS ? createAnimatedSwitchNavigator : createSwitchNavigator;

const AppContainer = createAppContainer(
  createSwitchNavigatorFunc(
    {
      AppLoading,
      App: createAllScreenStackNavigator({
        Main: {
          screen: Tabs,
          navigationOptions: () => ({ header: null })
        },
        ...ModalNavigators,
      },{
        mode: 'modal',
        headerMode: 'screen',
        transitionConfig: () => StackViewTransitionConfigs.ModalSlideFromBottomIOS,
      }),
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AppLoading',
      transition: (
        <Transition.Together>
          <Transition.Out
            type="fade"
            durationMs={300}
          />
          <Transition.In type="fade" durationMs={300} />
        </Transition.Together>
      ),
    } as any
  )
);

class App extends React.Component<any> {
  // tslint:disable-next-line:variable-name
  private notificationSubscription: any = noop;

  componentDidMount(): void {
    this.notificationSubscription = Notifications.addListener(handleNotification) as any;
    MessageBarManager.register(this.refs.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregister();
    this.notificationSubscription();
  }

  render() {
    return (
      <>
        <AppContainer
          ref={(nav: any) => navigationService.setTopLevelNavigator(nav)}
        />
        {/* tslint:disable-next-line:jsx-no-string-ref */}
        <MessageBarAlert ref={'alert'}/>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  state: state.nav
});
export default connect(mapStateToProps)(App);
