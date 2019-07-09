import { stateContext, initialRatingState, IRatingState } from './state';
import { createSelectorsA } from 'utils/redux';
import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

const ratingsSelector = createSelectorsA(stateContext);

export const ratingStateSelector = (state: any, { id } : {id: string}) => {
  return get(ratingsSelector(state), id, initialRatingState);
};

export const ratingSelector = createSelector(ratingStateSelector, (state: IRatingState) => {
  const { data: { comments } } = state;
  if (isEmpty(comments)) { return 0; }
  return  comments.reduce( ( p, c ) => p + c.rating, 0 ) / comments.length;
});
