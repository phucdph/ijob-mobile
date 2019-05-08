import { createAction, createAsyncAction } from 'utils/redux';

export const { getLocations, getLocationsSuccess, getLocationsFail } = createAsyncAction(
  'getLocations',
  'GET_LOCATIONS'
);

export const refreshLocations = createAction('REFRESH_LOCATIONS');
