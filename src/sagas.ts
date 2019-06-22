import authSagas from 'screens/Auth/sagas';
import feedSagas from './screens/NewFeed/sagas';
import userSagas from './screens/Profile/sagas';
import locationsSagas from './components/Locations/sagas';
import skillSagas from './components/Search/SearchSkill/sagas';

export default [
  ...authSagas,
  ...feedSagas,
  ...userSagas,
  ...locationsSagas,
  ...skillSagas,
  ...require('./screens/Search/sagas').default,
  ...require('./components/Search/SearchCompany/sagas').default,
  ...require('./screens/Company/sagas').default,
  ...require('./screens/Notification/sagas').default,
];
