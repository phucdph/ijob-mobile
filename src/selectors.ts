import { stateContext } from './state';

export const userTypeSelector = (state: any) => state[stateContext].type;
