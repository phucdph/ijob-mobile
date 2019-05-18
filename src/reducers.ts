import authReducers from './screens/Auth/reducers';
import feedReducers from './screens/NewFeed/reducers';
import userReducers from './screens/Profile/reducers';
import locationReducers from './components/Locations/reducers';
import skillReducers from './components/Skills/reducers';
import { setUserType } from './actions';
import { IAppState, initialState, stateContext, UserType } from './state';
import { createReducers } from 'utils/redux';
import { Action } from 'services/typings';
import { signInSuccess } from './screens/Auth/screens/SignIn/actions';
import { signUpSuccess } from './screens/Auth/screens/SignUp/actions';


const appReducers = [
  {
    on: setUserType,
    reducer: (state: IAppState, action: Action<UserType>) => {
      state.action = action.type;
      state.type = action.payload;
    }
  },
  {
    on: [signInSuccess, signUpSuccess],
    reducer: (state: IAppState) => {
      state.type = UserType.USER;
    }
  }
];

export default {
  ...authReducers,
  ...feedReducers,
  ...userReducers,
  ...locationReducers,
  ...skillReducers,
  ...require('./screens/Search/reducers').default,
  ...createReducers(stateContext, appReducers, initialState),
};
