import { createSelectorsA } from 'utils/redux';
import { ILocationState, stateContext } from './state';

export const skillStateSelector: (
  state: any
) => ILocationState = createSelectorsA(stateContext);
