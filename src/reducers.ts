import authReducers from './screens/Auth/reducers';
import feedReducers from './screens/NewFeed/reducers';
import userReducers from './screens/Profile/reducers';
import locationReducers from './components/Locations/reducers';
import skillReducers from './components/Skills/reducers';
import { setUserType } from './actions';
import { UserType, initialState, stateContext, IAppState } from './state';
import { createReducers } from 'utils/redux';
import { Action } from 'services/typings';

const appReducers = [
  {
    on: setUserType,
    reducer: (state: IAppState, action: Action<UserType>) => {
      state.action = action.type;
      state.type = action.payload;
    }
  }
];

export default {
  ...authReducers,
  ...feedReducers,
  ...userReducers,
  ...locationReducers,
  ...skillReducers,
  ...createReducers(stateContext, appReducers, initialState),
};
