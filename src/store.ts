import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  compose
} from 'redux';
import reducers from './reducers';
import sagas from './sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createCompressor from 'redux-persist-transform-compress';

const compressor = createCompressor();

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['Feed', 'MyProfile', 'Locations'],
  transforms: [compressor]
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const sagaMiddleware = createSagaMiddleware();
export function configureStore() {
  const middlewares = [sagaMiddleware];
  const enhancers = applyMiddleware(...middlewares);
  if (__DEV__) {
    const Reactotron = require('./config/Reactotron').default;
    return createStore(
      persistedReducer,
      compose(
        enhancers,
        Reactotron.createEnhancer()
      )
    );
  }
  return createStore(combineReducers(reducers), compose(enhancers));
}

export const store = configureStore();

export const persistor = persistStore(store);

sagas.forEach((saga: any) => {
  sagaMiddleware.run(saga);
});

class StoreHolder {
  private Store: any;
  private Persistor: any;
  // tslint:disable-next-line:no-shadowed-variable
  public setStore = (store: Store) => (this.Store = store);
  public getStore = () => this.Store;
  public setPersistor = (p: any) => (this.Persistor = p);
  public getPersistor = () => this.Persistor;
}

export const storeHolder = new StoreHolder();

storeHolder.setStore(store);
storeHolder.setPersistor(persistor);
