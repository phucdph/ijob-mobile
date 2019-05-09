import AuthNavigator  from './screens/Auth/navigator';
import NewFeedNavigator  from './screens/NewFeed/navigator';
import SettingNavigator from './screens/Setting/navigator';
import SearchNavigator from './screens/Search/navigator';
import ProfileNavigator from './screens/Profile/navigator';
import NotificationNavigator from './screens/Notification/navigator';

export const AuthNavigators = {
  ...AuthNavigator
};

export const AppNavigators = {
  ...NewFeedNavigator,
  ...SettingNavigator,
  ...SearchNavigator,
  ...ProfileNavigator,
  ...NotificationNavigator
};
