import authSagas from 'screens/Auth/sagas';
import feedSagas from './screens/NewFeed/sagas';
import userSagas from './screens/Profile/sagas';
import locationsSagas from './components/Locations/sagas';
import skillSagas from './components/Skills/sagas';

export default [
  ...authSagas,
  ...feedSagas,
  ...userSagas,
  ...locationsSagas,
  ...skillSagas
];
