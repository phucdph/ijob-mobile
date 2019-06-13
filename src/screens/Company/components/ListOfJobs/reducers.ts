import { createReducers } from 'utils/redux';
import { stateContext, initialState, initialCompanyJobState, ICompaniesJobState } from './state';
import { getCompanyJobSuccess, getCompanyJobFail, getCompanyJob } from './actions';
import { Action } from 'services/typings';
import { IError } from 'services/models/Error';
import { IJob } from '../../../NewFeed/services/typings';

const reducers = [
  {
    on: getCompanyJob,
    reducer(state: ICompaniesJobState, action: Action<{ companyId: string }>) {
      const { companyId } = action.payload;
      if (!state[companyId]) {
        state[companyId] = initialCompanyJobState;
      }
      state[companyId].action = action.type;
    }
  },
  {
    on: getCompanyJobSuccess,
    reducer(state: ICompaniesJobState, action: Action<{ id: string, data: IJob[] }>) {
      const { id, data } = action.payload;
      if (!state[id]) {
        state[id] = initialCompanyJobState;
      }
      state[id].action = action.type;
      state[id].data = data.map((j: IJob) => j.id);
    }
  },
  {
    on: getCompanyJobFail,
    reducer(state: ICompaniesJobState, action: Action<{ id: string, error: IError }>) {
      const { id, error } = action.payload;
      if (!state[id]) {
        state[id] = initialCompanyJobState;
      }
      state[id].action = action.type;
      state[id].error = error;
    }
  }
];

export default createReducers(stateContext, reducers, initialState );
