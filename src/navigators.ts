import AuthNavigator  from './screens/Auth/navigator';
import MainNavigator from './screens/Main/navigator';
import NewFeedNavigator  from './screens/NewFeed/navigator';
import SettingNavigator from './screens/Setting/navigator';
import SearchNavigator from './screens/Search/navigator';
import ProfileNavigator from './screens/Profile/navigator';
import NotificationNavigator from './screens/Notification/navigator';

export const AuthNavigators = {
  ...AuthNavigator
};

export const AppNavigators = {
  ...MainNavigator,
  ...NewFeedNavigator,
  ...SettingNavigator,
  ...SearchNavigator,
  ...ProfileNavigator,
  ...NotificationNavigator
};
