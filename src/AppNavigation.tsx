import {
  createAppContainer,
  createSwitchNavigator,
  NavigationScreenConfigProps,
  NavigationActions
} from 'react-navigation';
import { connect } from 'react-redux';
import { AuthNavigators, AppNavigators } from './navigators';
import Ionicons from 'react-native-vector-icons/Ionicons';
import createAllScreenStackNavigator from './components/base/navigation/createStackNavigator';
import * as React from 'react';
import navigationService from 'services/navigationService';
import AppLoading from './screens/AppLoading/AppLoading';
// @ts-ignore
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { themeVariables } from 'themes/themeVariables';


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

const Tabs = createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Notifications: NotificationStack,
    Settings: SettingStack
  },
  {
    lazy: true,
    shifting: true,
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
        return (
          <IconComponent
            name={iconName}
            size={25}
            color={tintColor as string}
          />
        );
      }
    }),
    activeColor: themeVariables.primary_color,
    inactiveColor: 'gray',
    barStyle: { backgroundColor: 'white' }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading,
      App: Tabs,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AppLoading'
    }
  )
);

class App extends React.Component<any> {
  componentWillMount() {
    navigationService.dispatch(
      NavigationActions.navigate({
        routeName: 'App'
      })
    );
  }

  render() {
    return (
      <AppContainer
        ref={(nav: any) => navigationService.setTopLevelNavigator(nav)}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  state: state.nav
});
export default connect(mapStateToProps)(App);
