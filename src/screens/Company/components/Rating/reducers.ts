import { createReducers } from 'utils/redux';
import {
  stateContext,
  initialState,
  IRatingsState,
  initialRatingState
} from './state';
import { comment } from './actions';
import { Action } from 'services/typings';
import { IComment } from './services/typings';

const reducers = [
  {
    on: comment,
    reducer(
      state: IRatingsState,
      action: Action<{ id: string; comment: IComment }>
    ) {
      const { id, comment: userComment, } = action.payload;
      if (!state[id]) {
        state[id] = initialRatingState;
      }
      state[id] = {
        action: action.type,
        error: null,
        data: { comments: [...state[id].data.comments, userComment] }
      };
    }
  }
];

export default createReducers(stateContext, reducers, initialState);
