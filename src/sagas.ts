import { sagas as authSagas } from 'screens/Auth';
import feedSagas from './screens/NewFeed/sagas';
import userSagas from './screens/Profile/sagas';

export default [...authSagas, ...feedSagas, ...userSagas];
