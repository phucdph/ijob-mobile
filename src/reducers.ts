import authReducers from './screens/Auth/reducers';
import feedReducers from './screens/NewFeed/reducers';
import userReducers from './screens/Profile/reducers';
import locationReducers from './components/Locations/reducers';
import skillReducers from './components/Skills/reducers';

export default {
  ...authReducers,
  ...feedReducers,
  ...userReducers,
  ...locationReducers,
  ...skillReducers,
};
