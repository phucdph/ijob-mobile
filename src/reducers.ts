import { reducers as authReducers } from './screens/Auth';
import feedReducers from './screens/NewFeed/reducers';
import userReducers from './screens/Profile/reducers';

export default {
  ...authReducers,
  ...feedReducers,
  ...userReducers,
};
