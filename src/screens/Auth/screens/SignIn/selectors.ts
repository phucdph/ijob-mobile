import { createSelectorsA } from 'utils/redux';
import { stateContext } from './state';

export const [actionSelector, errorSelector] = createSelectorsA(stateContext, [
  'action',
  'error'
]);
