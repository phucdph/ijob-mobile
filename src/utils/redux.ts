import { reduce, isEmpty, flatten, get, set, isArray } from 'lodash';
import { createSelector } from 'reselect';
import { takeLatest } from 'redux-saga/effects';
import {
  createAction as ReduxCreateAction,
  handleActions as handleReduxActions,
} from 'redux-actions';
import produce from 'immer';
import { resetAppState } from '../actions';

export const handleActions = (actions: any, state: any) =>
  handleReduxActions(
    Object.keys(actions).reduce((acc: any, key) => {
      acc[key] = produce(actions[key]);
      return acc;
    }, {}),
    state
  );

function createAction(type: string) {
  const action = ReduxCreateAction(type) as any;
  action.is = (aType: string) => action.toString() === aType;
  return action;
}

function createAsyncAction(action: string, type: string) {
  return {
    [action]: createAction(type),
    [`${action}Success`]: createAction(`${type}_SUCCESS`),
    [`${action}Fail`]: createAction(`${type}_FAIL`)
  };
}

function createReducers(
  stateContext: string,
  reducers: any[],
  initialState: any,
  reset = true
) {
  const mapReducers = reduce(
    flatten(reducers),
    (reducer: any, action: any) => {
      if (isArray(action.on)) {
        action.on.forEach((elm: any) => {
          reducer[elm] = action.reducer;
        })
      } else { reducer[action.on] = action.reducer; }
      return reducer;
    },
    {}
  );
  if (reset) { set(mapReducers, resetAppState.toString(), () => ({...initialState})); }
  return {
    [stateContext]: handleActions(
      mapReducers,
      { ...initialState }
    )
  };
}

export function createSagas(sagas: any[]) {
  return flatten(sagas).map((saga: any) => {
    return function*() {
      yield takeLatest(saga.on, saga.worker);
    };
  });
}

function createSelectorsA(context: string, keys?: string[]): any {
  const stateSelector = (state: any) => state[context];
  if (isEmpty(keys)) {
    return stateSelector;
  }
  // @ts-ignore
  return keys.map((key: string) => {
    return (stateValue: any) => get(stateSelector(stateValue), key);
  });
}

function createSelectors(context: string, keys: string[]) {
  const stateSelector = (state: any) => state[context];
  return reduce(
    keys,
    (selectors: any, key) => {
      selectors[`${key}Selector`] = createSelector(
        stateSelector,
        (state: any) => state[key]
      );
      return selectors;
    },
    {}
  );
}

export {
  createAction,
  createAsyncAction,
  createSelectorsA,
  createReducers,
  createSelectors,
  createSelector
};
